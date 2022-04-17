<template>
  <nav-table-page leftTitle="左边的标题" rightTitle="右边的标题">
    <!-- 左边 -->
    <template #left>
      <el-tree
        @node-click="nodeClick"
        :props="defaultProps"
        lazy
        :load="loadNode"
      >
      </el-tree>
    </template>
    <!-- 右边 -->
    <template #right>
      <!-- 表单 -->
      <base-form :data="form">
        <template #button>
          <el-button type="primary" @click="search" native-type="submit"
            >搜索</el-button
          >
        </template>
      </base-form>

      <!-- 表格 -->
      <base-table :data="table" :pager="pagerData" @event="tableEvent">
        <template #do="{ scope }">
          <el-button type="text" @click="edit(scope.row, scope.$index)"
            >编辑</el-button
          >
          <el-button type="text" @click="del(scope.row, scope.$index)"
            >删除</el-button
          >
        </template>
      </base-table>

      <!-- 分页 -->
      <pager :data="pagerData" @pageChange="getData" @sizeChange="getData" />
    </template>
  </nav-table-page>
</template>

<script>
// import * as config from "@/tools/config.js"
export default {
  data() {
    let self = this;
    return {
      defaultProps: {
        children: "children",
        label: "ddd",
      },
      form: {
        list: [
          { title: "姓名", field: "__input", type: "input" },
          { slot: "button" },
        ],
        data: {},
        inline: true,
      },

      table: {
        autoWidth: true,
        head: [
          {
            field: "projectNo",
            title: "项目编号",
          },
          {
            field: "userName",
            title: "用户名",
          },
          { slot: "do", title: "操作", width: 150, fixed: "right" },
        ],
        data: [],
        height: self.h,
        loading: true,
        index: true,
      },
      pagerData: {
        pageNo: 1, //第一页
        pageSize: 20, //每页显示20张
        total: 0, //总数
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    edit(row) {},
    del(row, index) {},
    search() {
      this.pagerData.pageNo = 1;
      this.getData();
    },
    getData() {
      this.$api.test
        .tablePager(Object.assign({}, this.pagerData), {
          load: { obj: this.table },
        })
        .then((res) => {
          this.table.data = res.data.records;
          this.pagerData.total = res.data.total;
        });
    },
    tableEvent(e) {
      if (e.name == "checkbox") {
        console.log(e.value);
      }
      if (e.name == "radio") {
        console.log(e.value);
      }
    },
    //一进页面也会执行此方法,所以不需要:data="treeData"
    //点击tree 动态加载  ,
    //此方法会比 node-click先执行
    // 如果一个节点的 isLeaf 是true,则不会执行此方法,只会执行 node-click
    loadNode(node, resolve) {
      //resolve是一个方法 用来合并返回的数据  resolve(res.data);
      let params = {
        // parentId: node.data.id,
      };
      this.getTree(params, resolve);
    },

    //获取tree
    getTree(params, resolve) {
      // api.getTree(params).then((res) => {
      //   if (params.parentId) {
      //     resolve(res.data);
      //   } else {
      //     this.treeData = res.data;
      //   }
      //   this.$forceUpdate();
      // });
      setTimeout(() => {
        resolve([
          {
            ddd: "一级 ---11",
            children: [],
          },
        ]);
      }, 2000);
    },
    // 懒加载点击node上的文字会触发  左边的箭头不会触发此方法
    nodeClick(data, node) {
      console.log(data, node);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

