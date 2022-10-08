<template>
  <div>
    <h1>新建课程信息</h1>
    <el-card header="课程信息表单" class="course-card">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="开课学院">
          <el-select v-model="model.college" placeholder="请选择" @change="OnChangeCollege">
            <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="课程时间">
          <el-select v-model="model.weekday" placeholder="请选择">
            <el-option
              v-for="item in weekdays"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="model.time" placeholder="请选择">
            <el-option
              v-for="item in timescope"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学年">
          <el-select v-model="tempyear" placeholder="请选择">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="tempscope" placeholder="请选择">
            <el-option
              v-for="item in scope"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室">
          <el-select v-model="building" placeholder="请选择">
            <el-option
              v-for="item in buildings"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="room" placeholder="请选择">
            <el-option
              v-for="item in rooms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课教师">
          <el-select v-model="model.teacher" placeholder="请选择">
            <el-option
              v-for="item in teachers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程周程">
          <el-select v-model="model.startweek" placeholder="请选择">
            <el-option
              v-for="item in weeks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="model.endweek" placeholder="请选择">
            <el-option
              v-for="item in weeks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        college: "",
        name: "",
        weekday: "",
        time: "",
        classroom: "",
        teacher: "",
        year: "",
        startweek: 1,
        endweek: 16
      },
      colleges: [],
      weekdays: [
        { label: "星期一", value: "星期一" },
        { label: "星期二", value: "星期二" },
        { label: "星期三", value: "星期三" },
        { label: "星期四", value: "星期四" },
        { label: "星期五", value: "星期五" },
        { label: "星期六", value: "星期六" },
        { label: "星期七", value: "星期七" }
      ],
      timescope: [],
      temptimescope: [
        "8:00-9:40",
        "9:55-11:35",
        "13:30-15:10",
        "15:25-17:05",
        "18:30-20:10"
      ],
      tempyear: "2016",
      tempscope: "",
      years: [],
      scope: [
        { label: "上", value: "上" },
        { label: "下", value: "下" }
      ],
      weeks: [],
      building: "广知楼A",
      buildings: [],
      room: "",
      rooms: [],
      teachers: []
    };
  },
  methods: {
    async fetch() {
      const res1 = await this.$http.get("colleges");
      res1.data.forEach(element => {
        this.colleges.push({
          label: element.name,
          value: element.name
        });
      });
      const res2 = await this.$http.get("buildings");
      let temp = res2.data.building;
      temp.forEach(element => {
        this.buildings.push({
          label: element,
          value: element
        });
      });
      let temp2 = res2.data.room;
      temp2.forEach(element => {
        this.rooms.push({
          label: element,
          value: element
        });
      });
    },
    async save() {
      this.model.year = this.tempyear + this.tempscope;
      this.model.classroom = this.building + this.room;
      await this.$http.post("courses", this.model);

      this.$message({
        type: "success",

        message: "保存成功"
      });
    },
    OnChangeCollege: function() {
      this.getTeachers();
    },
    async getTeachers() {
      const res3 = await this.$http.post("/findteachersbycollege", {
        college: this.model.college
      });
      (this.teachers = []),
        res3.data.forEach(element => {
          this.teachers.push({
            label: element.name,
            value: element.name
          });
        });
    }
  },
  created() {
    for (let i = 2010; i < 2031; i++) {
      this.years.push({
        label: i,
        value: i
      });
    }
    for (let i = 1; i < 21; i++) {
      this.weeks.push({
        label: i,
        value: i
      });
    }
    this.temptimescope.forEach(element => {
      this.timescope.push({
        label: element,
        value: element
      });
    });
    this.fetch();
  }
};
</script>

<style>
.course-card {
  width: 600px;
}
</style>