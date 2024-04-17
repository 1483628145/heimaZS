<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header content="增加月卡" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form ref="carInfoRef" :model="formInfo" :rules="carInfoRules" label-width="100px">
            <el-form-item prop="personName" label="车主姓名">
              <el-input v-model="formInfo.personName" />
            </el-form-item>
            <el-form-item prop="phoneNumber" label="联系方式">
              <el-input v-model="formInfo.phoneNumber" />
            </el-form-item>
            <el-form-item prop="carNumber" label="车辆号码">
              <el-input v-model="formInfo.carNumber" />
            </el-form-item>
            <el-form-item prop="carBrand" label="车辆品牌">
              <el-input v-model="formInfo.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form ref="feeForm" :model="formInfo" :rules="feeFormRules" label-width="100px">
            <el-form-item label="有效日期">
              <el-input />
            </el-form-item>
            <el-form-item prop="paymentAmount" label="支付金额">
              <el-input />
            </el-form-item>
            <el-form-item prop="paymentMethod" label="支付方式">
              <el-select>
                <el-option
                  v-for="item in [{}]"
                  :key="item.industryCode"
                  :value="item.industryCode"
                  :label="item.industryName"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { addCard } from '@/api/parking'
export default {
  data() {
    // 手机号单独校验规则
    const phoneNumberRules = (rule, value, callback) => {
      const phoneRegular = /^1[3-9]\d{9}$/
      if (phoneRegular.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    // 车牌号单独验证规则
    const carNumberRules = (rule, value, callback) => {
      const carRegular = /^[A-Z\u4e00-\u9fa5]{1}[A-Z0-9\u4e00-\u9fa5]{6}$/
      if (carRegular.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      // 表单信息
      formInfo: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: '',
        cardStartDate: '',
        cardEndDate: '',
        paymentAmount: '',
        paymentMethod: ''
      },
      // 车辆信息校验
      carInfoRules: {
        personName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: phoneNumberRules, trigger: 'blur' }
        ],
        carNumber: [
          { required: true, message: '请输入车牌信息', trigger: 'blur' },
          { validator: carNumberRules, trigger: 'blur' }

        ],
        carBrand: [
          { required: true, message: '请输入车辆品牌', trigger: 'blur' }
        ]
      },
      // 缴费信息规则
      feeFormRules: {
        paymentAmount: [
          { required: true, message: '请输入支付金额', trigger: 'blur' }

        ],
        paymentMethod: [
          { required: true, message: '请选择支付方式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 校验信息-发请求添加月卡
    addCard() {
      // 先做表单验证 俩个都通过发请求
      this.$refs.carInfoRules.vaildate((isOk) => {
        if (isOk) {
          // 俩层校验规则
          this.$refs.formInfo.vaildate(async(isOk) => {
            if (isOk) {
              await addCard()
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;

      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
