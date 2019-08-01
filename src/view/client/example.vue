<template>
  <div class="outDiv">
    <p style="font-size: 40px;font-weight: 600; color: #3448a1; padding-top: 20%" @click="showMessage">{{message}}</p>

    <el-dialog
      title="标题"
      :visible.sync="dialogVisible">
      <p>请在此处添加内容</p>
      <el-button @click="disShowMessage" type="primary" style="margin-top: 5%">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data() {
      return {
        message: '开始你的表演',
        dialogVisible: false,
      }
    },
    methods: {
      showMessage() {
        this.dialogVisible = true
      },
      disShowMessage() {
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .outDiv {
    width: 100%;
    height: 100%;
    background-color: white;
    text-align: center;

  }
</style>
