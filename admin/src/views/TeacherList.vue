
<template>
  <div>
    <h1>教师信息展示</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="username" label="工号" width="200"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="college" label="学院" width="250"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/users/teachers");
      this.items = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.list-card {
  width: 950px;
}
</style>