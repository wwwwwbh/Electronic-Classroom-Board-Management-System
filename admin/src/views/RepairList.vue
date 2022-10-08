<template>
  <div>
    <h1>报修信息展示</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="name" label="设备名称" width="200"></el-table-column>
        <el-table-column prop="info" label="报修详情" width="300"></el-table-column>
        <el-table-column prop="time" label="报修时间" width="200"></el-table-column>
        <el-table-column prop="status" label="维修状态" width="150"></el-table-column>
        <el-table-column prop="operator" label="维修员" width="150"></el-table-column>
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
      const res = await this.$http.get("/repair");
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
  width: 1200px;
}
</style>