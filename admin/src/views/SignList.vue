<template>
  <div>
    <h1>签到信息查询</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="coursename" label="课程名称" width="150"></el-table-column>
        <el-table-column prop="coursedetail" label="课程信息" width="400"></el-table-column>
        <el-table-column prop="teacher" label="教师" width="100"></el-table-column>
        <el-table-column prop="week" label="签到周数" width="100"></el-table-column>
        <el-table-column prop="username" label="学号" width="150"></el-table-column>
        <el-table-column prop="studentname" label="姓名" width="100"></el-table-column>
        <el-table-column prop="isSign" label="签到状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isSign" type="success" disable-transitions>已签到</el-tag>
            <el-tag v-if="!scope.row.isSign" type="danger" disable-transitions>未签到</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="user.type === '学生'" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="HandleClick(scope.row)" type="danger" size="small">点击签到</el-button>
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
      user: {},
      items: [],
      timer:null,
    };
  },
  mounted() {
    var that = this;
    that.timer = setInterval(() => {
      that.fetch();
    }, 10000);
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/attendance");
      const res2 = await this.$http.get("/user/info");
      this.user = res2.data;
      this.items = res.data;
    },
    HandleClick(row) {
      if (this.user.username == row.username) {
        this.$router.push({ name: "Upload", params: { data: this.user } });
      } else {
        alert("请选择本人签到！");
      }
    }
  },
  created() {
    this.fetch();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style>
.list-card {
  width: 1350px;
}
</style>