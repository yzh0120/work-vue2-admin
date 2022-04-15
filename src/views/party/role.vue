<template>
  <page>
    <!-- 表单 -->
    <base-form :data="formInfo">
      <template #button>
        <el-button type="primary" @click="search" native-type="submit"
          >搜索</el-button
        >
        <el-button type="primary" @click="alertData.field = true"
          >新增</el-button
        >
      </template>
    </base-form>

    <!-- 表格 -->
    <base-table :data="table" :pager="pagerData">
      <template #do="{ scope }">
        <el-button type="text" @click="edit(scope.row, scope.$index)"
          >编辑</el-button
        >
        <el-button type="text" @click="del(scope.row, scope.$index)"
          >删除</el-button
        >

        <el-button type="text" @click="fnSet(scope.row, scope.$index)"
          >功能授权</el-button
        >
      </template>
    </base-table>

    <!-- 分页 -->
    <pager :data="pagerData" @pageChange="getData" @sizeChange="getData" />

    <!-- 新增的弹窗 -->
    <alert :data="alertData" @event="alertEvent">
      <base-form :data="alertFormInfo"></base-form>
    </alert>
    <!-- 功能授权的弹窗 -->
    <alert :data="alertData_fn" @event="alertEvent_fn">
      <!-- <base-form :data="alertFormInfo"></base-form> -->
      <el-tabs type="border-card">
        <el-tab-pane label="菜单">
          <el-tree
            default-expand-all
            @check-change="handleCheckChange"
            show-checkbox
            ref="tree"
            :data="data_route"
            node-key="id"
            :props="defaultProps"
          >
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="按钮"> </el-tab-pane>
      </el-tabs>
    </alert>
  </page>
</template>

<script>
// import * as config from "@/tools/config.js"
export default {
  data() {
    let self = this;
    return {
      data_route: [],
      alertData_fn: {
        field: false,
        // width: "800px",
        // height: "600px",
        title: "功能授权",
      },
      alertData: {
        field: false,
        // width: "800px",
        // height: "600px",
        title: "角色",
      },
      alertFormInfo: {
        span: true,
        list: [
          { title: "角色名称", field: "roleName", type: "input", span: 12 },
          { slot: "button" },
        ],
        data: {},
      },
      formInfo: {
        list: [
          { title: "角色名称", field: "roleName", type: "input", span: 12 },
          { slot: "button" },
        ],
        data: {},
        titleWidth: "100px", //form的title宽度
        inline: true,
      },

      table: {
        head: [
          {
            field: "roleName",
            title: "角色名称",
          },

          { slot: "do", title: "操作", width: 150, fixed: "right" },
        ],
        autoWidth: true,
        data: [],
        height: self.h,
        loading: true,
        index: true,
      },
      defaultProps: {
        children: "children",
        label: "routeTitle",
      },
      pagerData: {
        pageNo: 1, //第一页
        pageSize: 20, //每页显示20张
        total: 0, //总数
      },
      menuCheckList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleCheckChange() {
      this.menuCheckList = this.$refs.tree.getCheckedKeys();
    },
    fnSet(row) {
      this.alertData_fn.field = true;
      this.$api.menu.getchecktree().then((res) => {
        this.data_route = res.data.menuTree;
        console.log(res.data.menuTree); //1513511761343385602
        this.$api.menu.getCheck().then((res) => {
          // 0: "1513511761343385602"
          //1: "1513511896517414913"
          //
          this.$refs.tree.setCheckedKeys(res.data.menuList);
        });
      });
    },
    edit(row) {
      this.alertFormInfo.data = this.$fn.deepClone(row);
      this.alertData.field = true;
    },
    del(row, index) {
      this.$api.role
        .del({}, { tip: true, params: { id: row.id } })
        .then((res) => {
          this.$message.success(res.info);
          this.getData();
        });
    },
    search() {
      this.pagerData.pageNo = 1;
      this.getData();
    },
    getData() {
      let other = {
        load: {
          obj: this.table,
          // loading : 'loading',   //默认的值就是 "loading",
          // text:'自定义'
        },
      };
      let data = Object.assign({}, this.formInfo.data, this.pagerData);
      this.$api.role.pageList(data, other).then((res) => {
        this.table.data = res.data.records;
        this.pagerData.total = res.data.total;
      });
    },
    event(e) {
      if (e.event == "checkbox") {
        console.log(e.value);
      }
      if (e.event == "radio") {
        console.log(e.value);
      }
    },
    alertEvent_fn(e) {
      if (e.event == "confirm") {
        // let url = this.alertFormInfo.data.id ? "update" : "save";

        // this.$api.role[url](this.alertFormInfo.data).then((res) => {
        //   this.$message.success(res.info);
        //   this.getData();
        // });
        let data = {
          menuList: this.menuCheckList,
        };
        this.$api.menu.saveCheck(data).then(() => {
          this.alertEvent_fn({ event: "cancel" });
        });
      }
      if (e.event == "cancel") {
        this.alertData_fn.field = false;
      }
    },
    alertEvent(e) {
      if (e.event == "confirm") {
        let url = this.alertFormInfo.data.id ? "update" : "save";

        this.$api.role[url](this.alertFormInfo.data).then((res) => {
          this.$message.success(res.info);
          this.getData();
          this.alertEvent({ event: "cancel" });
        });
      }
      if (e.event == "cancel") {
        this.alertFormInfo.data = {};
        this.alertData.field = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

