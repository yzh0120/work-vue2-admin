<template>
  <page>
    <!-- 表单 -->
    <base-form :data="form">
      <template #button>
        <el-button type="primary" @click="search" native-type="submit"
          >搜索</el-button
        >
        <el-button type="primary" @click="add">新增</el-button>
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

    <!-- 弹窗 -->
    <alert :data="alertData" @event="alertEvent">
      <!-- 弹窗的表单 -->
      <base-form :data="formAlert"></base-form>
    </alert>
  </page>
</template>

<script>
// import * as config from "@/tools/config.js"
export default {
  data() {
    let self = this;
    return {
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
      formAlert: {
        span: true,
        list: [
          { title: "角色名称", field: "roleName", type: "input", span: 12 },
          { slot: "button" },
        ],
        data: {},
      },
      alertData: {
        flag: false,
        // width: "800px",
        // height: "600px",
        title: "基础弹窗",
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
    add() {
      this.alertData.flag = true;
    },
    alertEvent(e) {
      if (e.name == "confirm") {
        // let url = this.formAlert.data.id ? "update" : "save";
        // this.$api.role[url](this.formAlert.data).then((res) => {
        //   this.$message.success(res.info);
        //   this.getData();
        //   this.alertEvent({ event: "cancel" });
        // });
        this.alertEvent({ name: "cancel" });
      }
      if (e.name == "cancel") {
        this.formAlert.data = {};
        this.alertData.flag = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

