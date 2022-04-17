<template>
  <nav-table-page leftTitle="左边的标题" rightTitle="右边的标题">
    <!-- 左边 -->
    <template #left>
      <div
        v-for="(item, index) in arr"
        :key="index"
        :class="['left-item', active == index ? 'active' : '']"
        @click="select(index)"
      >
        <div>目录{{ item }}</div>
      </div>
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
      active: "",
      arr: [
        1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 14, 15, 13, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
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
    select(index) {
      this.active = index;
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

