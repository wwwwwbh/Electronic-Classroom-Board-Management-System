<template>
  <div>
    <h1>当前班级公告</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="class" label="班级" width="200"></el-table-column>
        <el-table-column prop="notice" label="公告内容" width="400"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入{{model.class}}新的公告信息</span>
      <el-input v-model="model.notice"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      model:{
        notice:'',
        class:''
      },
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/publicnotices");
      this.items = res.data;
    },
    open(row){
      this.dialogVisible = true
      this.model.class = row.class
    },
    async update() {
      await this.$http.post("/publicnotices/update", this.model);
      this.$message({
        type: "success",

        message: "编辑成功"
      });
      this.dialogVisible = false
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
  width: 800px;
}
</style>