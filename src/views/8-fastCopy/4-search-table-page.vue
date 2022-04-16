<template>
  <page>
    <!-- 表单 -->
    <base-form :data="form" @event="formEvent">
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
          { type: "input", field: "__input", title: "姓名" },
          {
            type: "select",
            field: "__jidu",
            title: "季度",
            opt: [
              {
                text: "第一季度",
                value: 1,
              },
              {
                text: "第二季度",
                value: 2,
              },
              {
                text: "第三季度",
                value: 3,
              },
              {
                text: "第四季度",
                value: 4,
              },
            ],
          },
          {
            type: "select",
            field: "__yuefen",
            title: "月份开始",
            opt: [
              {
                text: "1月",
                value: 1,
              },
              {
                text: "2月",
                value: 2,
              },
              {
                text: "3月",
                value: 3,
              },
              {
                text: "4月",
                value: 4,
              },
              {
                text: "5月",
                value: 5,
              },
              {
                text: "6月",
                value: 6,
              },
              {
                text: "7月",
                value: 7,
              },
              {
                text: "8月",
                value: 8,
              },
              {
                text: "9月",
                value: 9,
              },
              {
                text: "10月",
                value: 10,
              },
              {
                text: "11月",
                value: 11,
              },
              {
                text: "12月",
                value: 12,
              },
            ],
          },
          { type: "select", field: "__end", title: "月份结束", opt: [] },
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
  watch: {
    "form.data": {
      handler(newVal) {
        this._setList(this.form, "__jidu", {
          disabled: this.form.data.__yuefen ? true : false,
        });

        this._setList(this.form, "__yuefen", {
          disabled: this.form.data.__jidu ? true : false,
        });

        this._setList(this.form, "__end", {
          disabled:
            !this.form.data.__yuefen || this.form.data.__jidu ? true : false,
        });
      },
      immediate: true,
      deep: true,
    },
    "form.data.__yuefen": {
      handler(newVal) {
        let opMonthEnd = [];
        let num = this.form.data.__yuefen;
        let start = 12 - num;
        for (let i = 0; i <= start; i++) {
          opMonthEnd.push({ value: num + i, text: num + i + "月" });
        }
        this._setList(this.form, "__end", { opt: opMonthEnd });
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    formEvent(e) {
      if (e.name == "select" && e.item.title == "月份开始") {
        this.form.data.__end = "";
      }
    },
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
  },
};
</script>

<style lang="scss" scoped>
</style>

