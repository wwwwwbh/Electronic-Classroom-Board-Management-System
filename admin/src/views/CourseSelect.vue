<template>
  <div>
    <h1>选课系统</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="college" label="开课学院" width="300"></el-table-column>
        <el-table-column prop="name" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="teacher" label="教师" width="100"></el-table-column>
        <el-table-column prop="weekday" label="课程时间" width="100"></el-table-column>
        <el-table-column prop="time" label="日程" width="150"></el-table-column>
        <el-table-column prop="classroom" label="上课地点" width="150"></el-table-column>
        <el-table-column prop="year" label="学年" width="100"></el-table-column>
        <el-table-column prop="startweek" label="起始周" width="100"></el-table-column>
        <el-table-column prop="endweek" label="结束周" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">选课</el-button>
            <el-button type="text" size="small">取消</el-button>
          </template>
        </el-table-column>
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
      const res = await this.$http.get("/courses");
      this.items = res.data;
    },
    async handleClick(row) {
      await this.$http.post("timetable", row);
      this.$message({
        type: "success",

        message: "选课成功"
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.list-card {
  width: 1450px;
}
</style>