<template>
  <div>
    <h1>新增用户信息</h1>
    <el-card header="用户信息表单" class="user-card">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="学号/工号">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="model.class"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="model.college" placeholder="请选择">
            <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
        <!--         <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>-->
        <el-form-item label="用户类型:" prop="usertype">
          <el-select v-model="model.type" placeholder="请选择">
            <el-option
              v-for="item in itemusertype"
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
  name: "StudentEdit",
  data() {
    return {
      model: {
        username: "",
        class: "",
        name: "",
        faceid: "",
        phone: "",
        password: "",
        type: ""
      },
      colleges: [],
      itemusertype: [
        {
          value: "管理员",
          label: "管理员"
        },
        {
          value: "教师",
          label: "教师"
        },
        {
          value: "学生",
          label: "学生"
        }
      ]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("colleges");
      res.data.forEach(element => {
        this.colleges.push({
          label: element.name,
          value: element.name
        });
      });
    },
    async save() {
      await this.$http.post("users", this.model);
      /*this.$router.push('/users/list') */
      this.$message({
        type: "success",

        message: "保存成功"
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.user-card {
  width: 35rem;
}
</style>