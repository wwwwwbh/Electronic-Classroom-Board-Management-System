<template>
  <div class="login-container">
    <el-card header="请先登陆" class="login-card">
      <el-form :model="model" :rules="rules" ref="model" @submit.native.prevent="login">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button type="success" @click="back">返回首页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        usename: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {

      this.$refs.model.validate(async valid => {
        if (valid) {
          const res = await this.$http.post("/login", this.model);

          //localStorage.token = res.data.token //存储在浏览器中，关掉浏览器还有，只要保证打开是同一个网址
          //前端控制台 loaclStorage.clear()   localStorage.token
          sessionStorage.token = res.data.token;

          this.$router.push("/");

          this.$message({
            type: "success",

            message: "登陆成功"
          });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    back() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.login-card {
  width: 25rem;

  margin: 10rem auto;
}
</style>
