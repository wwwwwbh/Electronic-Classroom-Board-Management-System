<template>
  <div>
    <h1 v-if="type === '学生'">学生选课信息</h1>
    <h1 v-if="type === '教师'">教师课程信息</h1>
    <h1 v-if="type === '管理员'">管理员查看选课信息</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column v-if="type !== '学生'" prop="_id" label="课程名称" width="200"></el-table-column>
        <el-table-column v-if="type === '学生'" prop="coursename" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="teacher" label="教师" width="100"></el-table-column>
        <el-table-column prop="weekday" label="课程时间" width="100"></el-table-column>
        <el-table-column prop="time" label="日程" width="150"></el-table-column>
        <el-table-column prop="classroom" label="上课地点" width="150"></el-table-column>
        <el-table-column prop="year" label="学年" width="100"></el-table-column>
        <el-table-column prop="startweek" label="起始周" width="100"></el-table-column>
        <el-table-column prop="endweek" label="结束周" width="100"></el-table-column>
        <el-table-column v-if="type !== '学生'" prop="totalStudent" label="总人数" width="100"></el-table-column>
        <el-table-column v-if="type === '教师'" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="danger" size="small">开启签到</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请选择要发起的签到的周数</span>
      <el-select v-model="week" placeholder="请选择">
        <el-option v-for="item in weeks" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="attendance">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      week: 1,
      tempweeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      details: '',
      weeks: [],
      type: "",
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/timetable");
      const user = await this.$http.get("/user/info");
      this.type = user.data.type;
      this.items = res.data;
    },
    open(row) {
      this.dialogVisible = true;
      this.details = row
    },
    async attendance() {
      await this.$http.post("/attendance", { details: this.details, week: this.week });
      this.$message({
        type: "success",

        message: "发起签到成功"
      });
      this.dialogVisible = false
    }
  },
  created() {
    this.fetch();
    this.tempweeks.forEach(element => {
      this.weeks.push({
        label: element,
        value: element
      });
    });
  }
};
</script>

<style>
.list-card {
  width: 1150px;
}
</style>