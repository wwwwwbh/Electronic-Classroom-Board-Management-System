<template>
  <div>
    <h1>学院信息</h1>
    <el-card header="学院信息表单" class="college-card">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="学院名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <h1>学院信息展示</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="name" label="学院名称" width="200"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      model: {
        name: ""
      },
      devices: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("colleges");
      this.items = res.data;
    },
    async save() {
      await this.$http.post("colleges", this.model);

      this.$message({
        type: "success",

        message: "添加学院成功"
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
.list-card {
  width: 550px;
}
.college-card {
  width: 550px;
}
</style> 