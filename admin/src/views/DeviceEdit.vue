<template>
  <div>
    <h1>新建设备信息</h1>
    <el-card header="设备信息表单" class="device-card">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="设备名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="设备位置">
          <el-select v-model="building">
            <el-option
              v-for="item in buildings"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="classroomnumber">
            <el-option
              v-for="item in classroomnumbers"
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
    <h1>新建教学楼信息</h1>
    <el-card header="教学楼信息表单" class="classroom-card">
      <el-form label-width="120px" @submit.native.prevent="savebuilding">
        <el-form-item label="教学楼">
          <el-input v-model="classroom.name"></el-input>
        </el-form-item>
        <el-form-item label="楼号">
          <el-select v-model="classroom.number" placeholder="请选择">
            <el-option
              v-for="item in numbertype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼高">
          <el-select v-model="classroom.floor">
            <el-option
              v-for="item in floors"
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
        name: "",
        health: "健康",
        location: ""
      },
      buildings: [],
      classroomnumbers: [],
      building: "",
      classroomnumber: "",
      classroom: {
        name: "",
        number: "",
        floor: ""
      },
      floors: [
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        }
      ],
      numbertype: [
        {
          value: "A",
          label: "A"
        },
        {
          value: "B",
          label: "B"
        },
        {
          value: "C",
          label: "C"
        },
        {
          value: "D",
          label: "D"
        }
      ]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("buildings", this.model);
      let temp = res.data.building;
      temp.forEach(element => {
        this.buildings.push({
          label: element,
          value: element
        });
      });
      let temp2 = res.data.room;
      temp2.forEach(element => {
        this.classroomnumbers.push({
          label: element,
          value: element
        });
      });
    },
    async save() {
      this.model.location = this.building + this.classroomnumber;
      await this.$http.post("devices", this.model);

      this.$message({
        type: "success",

        message: "保存成功"
      });
    },
    async savebuilding() {
      await this.$http.post("buildings", this.classroom);

      this.$message({
        type: "success",

        message: "保存成功"
      });

      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.device-card {
  width: 600px;
}
.classroom-card {
  width: 600px;
}
</style>