<template>
  <page>
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
        sum: true, //重点
        sumfn: (param) => {
          //重点
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              //第一列一般是合计
              sums[index] = "合计";
              return;
            }
            if (index === 1) {
              //设置某一列是 固定
              sums[index] = "N/A";
              return;
            }
            const values = data.map((item) => {
              //value就是整列的数据   //特殊操作
              if (column.property == "ChannelNames" && item[column.property]) {
                return item["ChannelNames"].split(",").length;
              } else if (column.property == "UserName") {
                return NaN;
              } else {
                return Number(item[column.property]);
              }
            });
            //列里面有一个数据不是数字则显示N/A
            if (values.every((value) => isNaN(value))) {
              sums[index] = "N/A";
            } else {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr; //prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] = sums[index].toFixed(2);
            }
          });
          return sums;
        },
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
  },
};
</script>

<style lang="scss" scoped>
</style>

