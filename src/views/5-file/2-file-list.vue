<template>
  <div>
    <file-List :fileList="fileList" :del="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "xxx",
          taskName: "xxx",
          detail: [],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>