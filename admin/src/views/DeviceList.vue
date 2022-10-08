<template>
  <div>
    <el-row :span="24">
      <el-col :span="12">
        <h1>设备信息展示</h1>
        <el-card class="list-card">
          <el-table :data="items" style="width: 100%">
            <el-table-column prop="name" label="设备名称" width="200"></el-table-column>
            <el-table-column prop="health" label="健康程度" width="150"></el-table-column>
            <el-table-column prop="location" label="位置" width="150"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <h1>设备报修</h1>
        <el-card header="设备报修信息表单" class="repair-card">
          <el-form label-width="120px" :model="model" :rules="rules" ref="model" @submit.native.prevent="save">
            <el-form-item label="设备名称" prop="name">
              <el-select v-model="model.name" placeholder="请选择">
                <el-option
                  v-for="item in devices"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报修原因" prop="info">
              <el-input v-model="model.info"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      model: {
        name: "",
        info: ""
      },
      rules: {
        name: [
          { required: true, message: "请选择设备名称", trigger: "change" }
        ],
        info: [
          { required: true, message: "请输入报修原因", trigger: "blur" },
          { min: 3, message: "请输入详细报修原因", trigger: "blur" }
        ]
      },
      devices: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/devices");
      this.items = res.data;
      res.data.forEach(item => {
        this.devices.push({
          label: item.name,
          value: item.name
        });
      });
    },
    save() {
      //.model即表单对象
      this.$refs.model.validate(async valid => {
        if (valid) {
          await this.$http.post("repair", this.model);
          this.$message({
            type: "success",

            message: "报修成功"
          });
          this.fetch();
        } else {
          console.log("error submit!!");

          return false;
        }
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
  width: 550px;
}
.repair-card {
  width: 600px;
}
</style>