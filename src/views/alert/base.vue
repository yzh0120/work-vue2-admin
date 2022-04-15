<template>
  <div>
    <page>
      <el-button @click="go">点我</el-button>
      <alert :data="alertData" @event="event">
        <base-form :data="alertFormInfo"></base-form>
      </alert>
    </page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertFormInfo: {
        span: true,
        list: [
          { title: "角色名称", field: "roleName", type: "input", span: 12 },
          { slot: "button" },
        ],
        data: {},
      },
      alertData: {
        field: false,
        // width: "800px",
        // height: "600px",
        title: "基础弹窗",
      },
    };
  },
  methods: {
    go() {
      this.alertData.field = true;
    },
    event(e) {
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
