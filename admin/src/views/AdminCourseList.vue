<template>
  <div>
    <h1>管理员选课详情管理</h1>
    <el-card class="list-card">
      <el-table
        :data="items.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column prop="coursename" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="teacher" label="教师" width="100"></el-table-column>
        <el-table-column prop="weekday" label="课程时间" width="100"></el-table-column>
        <el-table-column prop="time" label="日程" width="150"></el-table-column>
        <el-table-column prop="classroom" label="上课地点" width="150"></el-table-column>
        <el-table-column prop="year" label="学年" width="100"></el-table-column>
        <el-table-column prop="startweek" label="起始周" width="100"></el-table-column>
        <el-table-column prop="endweek" label="结束周" width="100"></el-table-column>
        <el-table-column prop="username" label="学号" width="100"></el-table-column>
        <el-table-column prop="studentname" label="姓名" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
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
      type: "",
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/timetable/admin");
      this.items = res.data;
    },
    async handleClick(row){
      await this.$http.post("/timetable/delete",row);
      this.$message({
        type: "success",

        message: "删除成功"
      });
      this.fetch()
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
  width: 1450px;
}
</style>