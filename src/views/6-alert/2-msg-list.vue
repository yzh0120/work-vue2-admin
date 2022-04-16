<template>
  <div>
    <page>
      <el-button @click="go">点我</el-button>
      <alert :data="alertData" @event="alertEvent">
        <base-form :data="formAlert"></base-form>
      </alert>
    </page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formAlert: {
        span: true,
        list: [
          { title: "角色名称", field: "roleName", type: "input", span: 12 },
          { slot: "button" },
        ],
        data: {},
      },
      alertData: {
        msg: true,
        flag: false,
        // width: "800px",
        // height: "600px",
        title: "基础弹窗",
      },
    };
  },
  methods: {
    go() {
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
