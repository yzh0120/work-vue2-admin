<template>
  <page>
    <file-list-show :arr="uploadObj.detail" :del="true" />
    <oneFile :uploadObj="uploadObj" :projectId="projectId"></oneFile>
  </page>
</template>

<script>
export default {
  data() {
    return {
      projectId: "23424232344645",
      uploadObj: {
        name: "xxx",
        taskName: "xxx",
        detail: [],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>