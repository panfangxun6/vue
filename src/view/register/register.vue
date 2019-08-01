<template>
  <div class="mh-register">
    <div class="centerStyle">
      <el-row>

        <el-col :span="10" class="leftCol">

          <img style="width: 100%;height: 506px;" src="../../assets/images/loginBack.png">
        </el-col>
        <el-col :span="14">
          <el-card style="height: 506px;" >
    <el-form :model="formData" :rules="rules" ref="formData" label-position="top" label-width="0px"
             >
      <h3 class="mh-register-title">政务可视化管理系统</h3>
      <h4 class="mh-register-title">-注册-</h4>
      <el-form-item prop="userName" label="用户名">
        <el-input
          v-model="formData.userName"
          placeholder="请设置账号">
          <!--<i slot="prefix" class="icon iconfont icon-my"></i>-->
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请设置密码"
        >
          <!--<i slot="prefix" class="icon iconfont icon-jiesuo"></i>-->
        </el-input>
      </el-form-item>
      <el-form-item prop="rePassWord" label="密码">
        <el-input
          type="password"
          v-model="formData.rePassWord"
          auto-complete="off"
          placeholder="请再次输入密码"
        >
          <!--<i slot="prefix" class="icon iconfont icon-jiesuo"></i>-->
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%;"
          type="primary"
          @click="registerAccount"
          :loading="loading">注册
        </el-button>
      </el-form-item>
      <div  style="float: right;height: 50px;" class="mh-login-footer">已有账号？
        <el-button
          type="text"
          @click="returnLogin"
        >快速登录</el-button></div>

    </el-form>
          </el-card>
        </el-col>
      </el-row>
  </div>
  </div>
</template>

<script>
import {RegisterApi} from "./registerApi";
import {Msg} from "../../tools/message";

export default {
    components: {},
    data() {
      var checkPass =(rule,value,callback)=>{
        if(value == ''){
          return callback(new Error("请再次输入密码"));
        }
        else if (value != this.formData.password){
          return callback(new Error("两次密码不一致"));
        }
        else{
          return callback();
        }
      };
      var checkAccount=(rule,value,callback)=>{
        if(value == ''){
          return callback(new Error("请输入账号"));
        }
        else if((value.trim().length <5) ||(value.trim().length >12)){
          return callback(new Error("长度在 5 到 12 个字符"));
        }
        else if(value != ''){
          this.formData.account = value;
          RegisterApi.checkAccount(this.formData).then(res=>{
            if(res.data.data){
              return callback(new Error("账号已存在"));
            }
            else{
              return callback();
            }
          })
        }
        else{
          return callback();
        }
      };
      return {
        loading: false,
        formData: {
          userName: '',
          password: '',
          account:'',
          rePassWord:''
        },
        rules: {
          userName: [{validator:checkAccount,trigger:'blur',required:true}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'focus'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'focus'}
          ],
          rePassWord:[{validator: checkPass, trigger: 'blur',required: true,}]
        }
      }
    },
    created() {
    },
    /** 计算属性 */
    computed: {},
    /** 完成挂载 */
    mounted() {
    },
    destroyed() {
    },
    /** 方法事件 */
    methods: {
      returnLogin:function () {
        this.$router.push({path:'/login'})
      },
      registerAccount:function () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.formData.account = this.formData.userName;
            this.loading = true;
          RegisterApi.register(this.formData).then((res) => {
              this.loading = false;
              if(res.data.status){
                Msg.success('注册成功');
                this.returnLogin();
              }
              else{
                Msg.error("注册失败");
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },

    },
    /** 监听函数 */
    watch: {
    }
  }
</script>

<style lang="scss" >
  .mh-register {
    width: 100%;
    height: 100%;
    background-color:#f0f4ff;
    .el-form-item {
      .el-form-item__label{
        color: #b9bedc;
      }

      .el-input--medium .el-input__inner {
        border-color:#b9bedc;
        border-top:none;
        border-left:none;
        border-right: none;
      }
      .el-form-item__content {
        .icon {
          position: absolute;
          left: 8px;
          z-index: 1;
        }
      }
    }
    &-title {
      margin-bottom: 10px;
      text-align: center;
    }

    &-footer {
      font-size: 14px;
      color: #606266;
    }
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    overflow: hidden;
    min-width: 270px;
    .title {
      text-align: center;
      color: #505458;
    }
  }

  .centerStyle{
    width: 50%;
    /*height: 520px;*/
    position: absolute;
    left: 22%;
    top: 10%;

  }



</style>
