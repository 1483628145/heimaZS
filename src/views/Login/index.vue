<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <!-- 登录表单 -->
      <el-form ref="form" :rules="rules" :model="LoginForm">
        <!-- 登录用户名 -->
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="LoginForm.username" />
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="LoginForm.password" show-password />
        </el-form-item>
        <!-- 勾选协议 -->
        <el-form-item prop="remember">
          <el-checkbox>记住我</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="login_btn"
            @click="Login"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单
      LoginForm: {
        username: 'admin',
        password: 'admin123'
        // isOk: true
      },
      // 表单验证规则
      rules: {
        username: [
          {
            required: true, message: '请输入用户名', trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ],
        isOk: [
          // 使用自定义校验必须是勾选状态
        ]
      }
    }
  },
  methods: {
    // 登录按钮
    Login() {
      // 拿到的是当前 ref对象 validate 传入的参数是当前表单校验布尔值 true代表全部通过
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          // 调用vueX登录接口 注意这action是异步的 得等他执行完了成功才跳转
          await this.$store.dispatch('user/getToken', this.LoginForm)
          // 跳转到主页
          this.$router.push('/')
        } else {
          console.log('error')
          return false
        }
      })
    }
  }
}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
