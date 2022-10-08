<template>
  <div>
    <h1 v-if="items.type === '学生'">学生个人信息</h1>
    <h1 v-if="items.type === '教师'">教师个人信息</h1>
    <el-form>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/uploadphoto'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="学号">
        <span>{{items.username}}</span>
      </el-form-item>
      <el-form-item label="学院">
        <span>{{items.college}}</span>
      </el-form-item>
      <el-form-item label="班级" v-if="items.type === '学生'">
        <span>{{items.class}}</span>
      </el-form-item>
      <el-form-item label="姓名">
        <span>{{items.name}}</span>
      </el-form-item>
      <el-form-item label="联系方式">
        <span>{{items.phone}}</span>
      </el-form-item>
      <el-form-item label="faceid">
        <span>{{items.faceid}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      imageUrl: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/user/info");
      this.items = res.data;
    },
    handleAvatarSuccess(res) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.url;
      console.log(res.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt3M;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>