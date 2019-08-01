<template>
  <table style="height: 38px;width: 746px;">
    <tr>
      <th style="width: 303px;">
        <span style="color: #bababb;font-size: 13px;font-family: '微软雅黑 Light';float: left;">每5 条/页&nbsp;&nbsp;&nbsp;&nbsp;共{{totalCount}}条</span>
      </th>
      <th>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="5"
          layout="prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </th>
      <th>
        <el-input style="width: 50px;height: 36px;" v-model="pageInput"></el-input>
      </th>
      <th>
        <button style="width: 40px;height:36px;background-color: #3448a1;font-size: 12px;color: white;border:none" @click="pageSubmit">跳转</button>
      </th>
    </tr>
  </table>
</template>

<script>
  export default {
    data() {
      return {
        pageInput: ''
      }
    },
    mounted() {
      // todo
    },
    computed: {
      pageCount() {
        this.pageInput = this.$route.query.page * 1 || 1;
        return Math.ceil(this.totalCount / 5);
      }
    },
    props: {
      page: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 5,
      },
      totalCount: {
        type: Number,
        default: 100
      }
    },
    methods: {
      /** 改变页码 */
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val);
      },
      /** 点击跳转按钮 **/
      pageSubmit() {
        if (this.pageInput > this.totalCount / 5 + 1) {
          this.$message({
            message: '输入页数过大,请重新输入',
            type: 'failed'
          });
          this.pageInput = parseInt(this.totalCount / 5, 10) + 1;
        } else if (this.pageInput < 1) {
          this.$message({
            message: '输入页数过小,请重新输入',
            type: 'failed'
          });
          this.pageInput = 1;
        } else if (this.pageInput % 1 !== 0) {
          this.$message({
            message: '输入页数格式有误,请重新输入',
            type: 'failed'
          });
          this.pageInput = 1;
        } else {
          this.handleCurrentChange(parseInt(this.pageInput, 10));
          this.page = parseInt(this.pageInput, 10);
        }
      }
    }
  }
</script>

<style lang="scss">
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #3448a1;
  }

  .el-pagination {
    width: 300px;
  }

  .el-pagination__jump{
    width: 0;
  }

  .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li{
    background-color: #e7ebef;
  }
</style>
