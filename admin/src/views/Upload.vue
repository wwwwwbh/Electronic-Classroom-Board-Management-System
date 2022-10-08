<template>
  <div>
    <h1>签到页面</h1>
    <div>{{user.college}} {{user.class}} {{user.username}} {{user.name}} {{user.type}}</div>

    <div class="camera_outer">
      <div v-if="imgSrc" class="img_bg_camera" style="position:absolute;left:1400px">
        <p>效果预览</p>
        <img :src="imgSrc" alt class="tx_img" />
      </div>
      <video
        id="videoCamera"
        :width="videoWidth"
        :height="videoHeight"
        autoplay
        style="margin-left:auto; margin-right:auto"
      ></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
    </div>
    <div class="button">
      <el-button @click="getCompetence()">打开摄像头</el-button>
      <el-button @click="stopNavigator()">关闭摄像头</el-button>
      <el-button @click="setImage()">拍照</el-button>
      <el-button @click="upload()">上传</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      videoWidth: 350,
      videoHeight: 450,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false
    };
  },
  methods: {
    getParams() {
      if (this.$route.params.data) this.user = this.$route.params.data;
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      this.setUsername();
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = "block";
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            console.log(e);
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image; //赋值并预览图片
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    upload() {
      if (this.imgSrc !== "") {
        let file = this.imgSrc; // 把整个base64给file
        //let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
        let time = new Date().valueOf(); //生成时间戳
        let name = time + ".jpg"; // 定义文件名字（例如：abc.png ， cover.png）
        let conversions = this.dataURLtoFile(file, name); // 调用base64转图片方法
        let parms = new FormData();
        parms.append("file", conversions);
        let url = "http://www.wubingo.cn:3010/upload"; //你的接口
        this.$axios
          .post(url, parms, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            console.log(res.data);
            console.log("签到成功");
            this.toSignList()
          })
          .catch(err => {
            this.$notify.error({
              title: "上传失败",
              message: err.msg
            });
          });
      }
    },
    setUsername() {
      let url = "http://www.wubingo.cn:3010/setUsername"; //你的接口
      //let params = { username: this.user.username };
      this.$axios.post(url, JSON.stringify({ username: this.user.username })).then(res => {
        console.log(res.data);
      });
    },
    toSignList(){
      this.$router.push('/sign/list')
    }
  },
  created() {
    this.getParams();
  }
};
</script>

<style>
</style>