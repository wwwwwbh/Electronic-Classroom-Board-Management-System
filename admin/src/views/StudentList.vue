
<template>
  <div>
    <h1>学生信息展示</h1>
    <el-card class="list-card">
      <el-table
        :data="items.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column prop="username" label="学号" width="200"></el-table-column>
        <el-table-column prop="class" label="班级" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        layout="prev, pager, next"
        @current-change="current_change"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 1000,
      pagesize: 9,
      currentPage: 1,
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/users/students");
      this.items = res.data;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    }
  },
  created() {
    this.fetch(),
      function() {
        this.total = this.items.length;
      };
  }
};
</script>

<style>
.list-card {
  width: 1000px;
}
.fy {
  text-align: center;
  margin-top: 30px;
}
</style>