<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <!--@click.middle.native="!_isFixed(route) ? _closeSelectedTag(route) : ''"   -->
      <!-- -->
	  <router-link v-for="route in _pageStack" 
	  ref="tag" :key="route.path" :class="isActive(route) ? 'active' : ''" 
	  tag="span" class="tags-view-item" :to="{ path: route.path, query: route.query }"
	  @contextmenu.prevent.native="openMenu(route, $event)">
        <span class="titleText"> {{ route.meta.title }} </span>
        <!-- 关闭 的 X -->
        <span v-if="!_isFixed(route)" class="el-icon-close" @click.prevent.stop="_closeSelectedTag(route)" />
      </router-link>
    </scroll-pane>
    <!-- 右键菜单 -->
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <!-- <li @click="reload" v-if="$route.fullPath == selectedTag.fullPath"> 刷新</li> -->
      <li @click="_reload" v-if="$route.path == _selectedTag.path"> 刷新</li>
      <!-- <li  @click="_closeSelectedTag(route)">关闭</li> -->
      <li @click="_closeOtherLeft">关闭左边页面</li>
      <li @click="_closeOtherRight">关闭右边页面</li>
      <li @click="_closeOthersTags">关闭其他</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import keepAlive from "@/native/Mixins/keepAlive.js";
export default {
  components: { ScrollPane },
  props: ["keepAliveComponentInstance", "blankRouteName"],
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      affixTags: [],
    };
  },
  mixins:[keepAlive],
  watch: {
    $route: {//监听路由
      handler(newVal, oldVal) {
		if (newVal.name == "blank") {//如果当前路由对象 是 blank 中断
		  return;
		}
		// console.log(this._pageStack,'新的页面')
		this._selectedTag  = this.$fn.deepClone(newVal)//当前路由
		this.addTags(); //每次路由改变 增加页面栈
		this.moveToCurrentTag(); //将active 移动到当前路由
      },
      immediate: true
    },
    visible(value) {
      if (value) {
        //右键菜单显示的时候  添加关闭菜单事件
        document.body.addEventListener("click", this.closeMenu);
      } else {
        //右键菜单隐藏的时候  移除关闭菜单事件
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {},
  methods: {
    //tags中 哪一个是当前路由
    isActive(route) {
        return route.path === this.$route.path;
    },
    // 增加页面栈
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.commit("router/add_pageStack", this.$route);
      }
      return false;
    },
    //
    moveToCurrentTag() {
      this.$nextTick(() => {
        //在下一次dom更新后
        const tags = this.$refs.tag; //获取所有的标签页dom对象
        for (const tag of tags) {
          //循环 标签页dom对象数组
          if (tag.to.path === this.$route.path) {
            //如果当前标签页的path等于this.$route.path
            this.$refs.scrollPane.moveToTarget(tag);
            if (tag.to.fullPath !== this.$route.fullPath) {
              //如果当前标签页的fullPath不等于this.$route.fullPath
              //this.$store.dispatch('tagsView/updateVisitedView', this.$route)//跳转到this.$route.fullPath
            }
            break;
          }
          /*
          if (tag.dataset.path === this.$route.path){//if (tag.to.path === this.$route.path) {//如果当前标签页的path等于this.$route.path
            this.$refs.scrollPane.moveToTarget(tag);
            if (tag.dataset.fullPath !== this.$route.fullPath) {//if (tag.to.fullPath !== this.$route.fullPath) {//如果当前标签页的fullPath不等于this.$route.fullPath
              //this.$store.dispatch('tagsView/updateVisitedView', this.$route)//跳转到this.$route.fullPath
            }
            break;
          }
          
          */
        }
      });
    },
    //右键菜单 显示
    openMenu(tag, e) {
      this.left = e.screenX; //鼠标X坐标
      this.top = e.screenY - 50; //鼠标y坐标
      this.visible = true; //菜单dom显示
      this._selectedTag = tag; //右键所指向的菜单路由
    },
    //关闭右键菜单
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
//                                                                      el-scroll
// tags-view-container
// scroll-container(在ScrollPane)
// .tags-view-wrapper.el-scrollbar  .el-scrollbar__warp .el-scrollbar__view
.tags-view-container {
  //改item高度 就修改这个
  //height: auto;//改item高度 就修改这个 1
  
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  // padding-bottom: 6px;
  overflow: hidden;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: $tags-view-item; //改item高度 就修改这个 3
      line-height: $tags-view-item; //改item高度 就修改这个 4
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      border-radius: 2.5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      //    &.active{
      //      &::before {
      //        content: "";
      //        background: #1890ff;
      //        display: inline-block;
      //        width: 8px;
      //        height: 8px;
      //        border-radius: 50%;
      //        position: relative;
      //        margin-right: 2px;
      //      }
      //    }
      // &:hover{
      //  .titleText{
      //  	padding-left:10px;
      //  }
      // }
      // &.active,
      // &:hover{
      //  background-color: #e8f4ff;
      //  color: #1890ff;
      //  border-color: #1890ff;
      //  .titleText{
      //  	padding-right:10px;
      //  }
      // }

      // &.active {
      //   background-color: #e8f4ff;
      //   color: #1890ff;
      //   border-color: #1890ff;
      //   &::before {
      //     content: "";
      //     background: #1890ff;
      //     display: inline-block;
      //     width: 8px;
      //     height: 8px;
      //     border-radius: 50%;
      //     position: relative;
      //     margin-right: 2px;
      //   }
      //   .titleText {
      //     padding-right: 10px;
      //     padding-left: 10px;
      //   }
      // }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
// .tags-view-wrapper {
//   .tags-view-item {
//     // height: 100px !important;
//     // padding-right: 10px !important;

//     .titleText {
//       transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
//       padding: 0;
//     }

//     .el-icon-close {
//       width: 16px;
//       height: 16px;
//       vertical-align: 2px;
//       border-radius: 50%;
//       text-align: center;
//       transition: all 0.3s; //cubic-bezier(0.645, 0.045, 0.355, 1)
//       transform-origin: 100% 50%;
//       &:before {
//         transform: scale(0.6);
//         display: inline-block;
//         vertical-align: -3px;
//       }
//       &:hover {
//         background-color: #b4bccc;
//         color: #fff;
//       }
//     }
//   }
// }
</style>


