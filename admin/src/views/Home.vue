<template>
  <div id="home">
    <el-container style="height: 100vh;">
      <el-header>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple" align="left">
              <img src="../assets/logo.png" width="20px" height="20px" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" align="right">
              <el-button type="text" v-if="userinfo.username">您好,{{ userinfo.name }}</el-button>
              <el-button v-if="userinfo.username === ''" @click="login">登录</el-button>
              <el-button type="danger" v-if="userinfo.username" @click="logout">注销</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238,241,246)">
          <el-menu router :default-openeds="['1','2','3']" :default-active="$route.path">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>导航
              </template>
              <el-menu-item-group v-if="userinfo.type === '管理员'">
                <template slot="title">用户信息管理</template>
                <el-menu-item index="/users/create">添加用户</el-menu-item>
                <el-menu-item index="/users/list">查看学生信息</el-menu-item>
                <el-menu-item index="/teachers/list">查看教师信息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group v-if="userinfo.type === '管理员'">
                <template slot="title">课程信息管理</template>
                <el-menu-item index="/courses/create">添加课程信息</el-menu-item>
                <el-menu-item index="/courses/list">课程信息显示</el-menu-item>
                <el-menu-item index="/collegelist">学院信息</el-menu-item>
                <el-menu-item index="/admincourse/list">选课信息管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group v-if="userinfo.type === '管理员'">
                <template slot="title">设备信息管理</template>
                <el-menu-item index="/devices/create">添加设备信息</el-menu-item>
                <el-menu-item index="/devices/list">查看设备信息</el-menu-item>
                <el-menu-item index="/repairlist">查看设备报修信息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group v-if="userinfo.type === '管理员'">
                <el-menu-item index="/publicnotice">公告管理</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2" v-if="userinfo.type === '学生'">
                <template slot="title">个人信息管理</template>
                <el-menu-item index="/personalinfo">个人信息查看</el-menu-item>
                <el-menu-item-group>
                  <el-menu-item index="/course/select">选课</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/stucourses/list">已选课程信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/sign/list">前往签到</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3" v-if="userinfo.type === '教师'">
                <template slot="title">个人信息管理</template>
                <el-menu-item index="/personalinfo">个人信息查看</el-menu-item>
                <el-menu-item-group>
                  <el-menu-item index="/stucourses/list">课程信息查看</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/sign/list">签到信息查看</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userinfo: {
        username: "",
        name: "",
        type: ""
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    async getinfo() {
      const res = await this.$http.get("/userinfo");
      this.userinfo = res.data;
    },
    logout() {
      sessionStorage.clear();
      this.setinfo();
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "注销成功"
      });
    },
    setinfo() {
      this.userinfo = {
        username: "",
        name: "",
        type: ""
      };
    }
  },
  created() {
    if (sessionStorage.token) {
      this.getinfo();
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
