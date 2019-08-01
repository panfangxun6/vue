<template>
  <div class="mh-login">
    <div class="centerStyle">
      <el-row>

        <el-col :span="10" >

            <img style="width: 100%;height: 484px;" src="../../assets/images/loginBack.png">
        </el-col>
        <el-col :span="14" >
          <el-card  style="height: 484px;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="0px"
                   class="formClass" >
            <h3 class="mh-login-title">货物管理系统</h3>
            <h4 class="mh-login-title">-登录-</h4>
            <el-form-item prop="userName" label="用户名">
              <el-input
                type="text"
                v-model="ruleForm.userName"
                ref="adminput"
                auto-complete="off"
                placeholder="请输入用户名">
                <!--<i slot="prefix" class="icon iconfont icon-my"></i>-->
              </el-input>
            </el-form-item>
            <el-form-item prop="passWord" label="密码">
              <el-input
                type="password"
                v-model="ruleForm.passWord"
                auto-complete="off"
                placeholder="请输入密码"
              >
                <!--<i slot="prefix" class="icon iconfont icon-jiesuo"></i>-->
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                label="记住账号" v-model="ruleForm.remember"
                style="text-align: left">
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%;"
                type="primary"
                @click.native.prevent="submitForm"
                :loading="loading">登录
              </el-button>
            </el-form-item>
            <div  style="float: right;height: 50px;" class="mh-login-footer">还没有账号？
              <el-button
                type="text"
                @click="registerAccount"
              >快速注册</el-button></div>
          </el-form>
          </el-card>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import {version} from '../../../package'
  import {Auth} from '../../store/user/auth'
  import {Msg} from "../../tools/message";

  export default {
    name: 'Login',
    components: {},
    /** state 默认信息 */
    data() {

      return {
        loading: false,
        version,
        ruleForm: {
          userName: '',
          passWord: '',
          remember: false,
        },
        rules: {
          userName: [
            {required: true, message: '请输入登录账户', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
          passWord: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      window.addEventListener ? window.addEventListener('keyup', this.Enter) : null ;
      this.getUser();
    },
    /** 计算属性 */
    computed: {},
    /** 完成挂载 */
    mounted() {

      this.$refs['adminput'].focus();
    },
    destroyed() {
      window.removeEventListener('keyup', this.Enter)
    },
    /** 方法事件 */
    methods: {
      Enter() {
        document.onkeyup = (e) => {
          var currKey=0;
          let event= e ||window.event;
          currKey=e.keyCode||e.which||e.charCode;//支持IE、FF
          if (currKey == 13){
            if(event){
              e.returnValue = false;
            }else{
              e.preventDefault();
            }
            this.submitForm()
          }
        }
      },
      getUser() {
        this.ruleForm = Auth.getAccountPwd()|| {};

      },
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          // if (valid) {
            this.loading = true;
            // this.$store.dispatch('accountLoginSubmit', this.ruleForm).then((res) => {
            //   this.loading = false;
            //   if(res.status){
                Msg.success('登录成功');
                this.$router.push({path: '/admin'});
              // }
              // else{
              //   Msg.error("登陆失败");
              // }

            // }).catch(() => {
            //   this.loading = false
            // })
          // } else {
          //   return false
          // }
        })
      },
      registerAccount:function () {
        this.$router.push({path:'/register'});
      }
    },
    /** 监听函数 */
    watch: {
      $route() {
        this.path = this.$route.path.split('/')[2]
      }
    }
  }
</script>

<style lang="scss" >
  .mh-login {
    width: 100%;
    height: 100%;
    background-color:#f0f4ff;
    .el-form-item {
      .el-form-item__label{
        color: #b9bedc;
      }
      .el-textarea__inner {
        border-color: #67c23a;
      }


      .el-input--medium .el-input__inner {
        border-color:#b9bedc;
        border-top:none;
        border-left:none;
        border-right: none;
        padding: 0 10px;
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
    height:90%;
    overflow:hidden;
  /*height: 520px;*/
    position: absolute;
    left: 25%;
    top: 10%;
  }


</style>
