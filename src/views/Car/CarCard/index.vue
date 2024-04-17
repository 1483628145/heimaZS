<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="queryParams.carNumber" size="mini" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="queryParams.personName" size="mini" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">状态：</span>
      <el-select v-model="queryParams.cardStatus" size="mini">
        <el-option
          v-for="item in cardListStatus"
          :key="item.id"
          :value="item.id"
          :label="item.label"
        />
      </el-select>
      <el-button type="primary" class="search-btn" size="mini" @click="queryList">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" size="mini" @click="addCard">添加月卡</el-button>
      <el-button size="mini">批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="cardList">
        <el-table-column type="index" label="序号" prop="id" />
        <el-table-column label="车主名称" prop="personName" />
        <el-table-column label="联系方式" prop="phoneNumber" />
        <el-table-column label="车牌号码" prop="carNumber" />
        <el-table-column label="车辆品牌" prop="carBrand" />
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate" />
        <el-table-column label="状态" :formatter="formatter" prop="cardStatus" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="page-container">
      <el-pagination
        :current-page="queryParams.page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加楼宇 -->
    <el-dialog
      title="添加楼宇"
      width="580px"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCardList } from '@/api/parking'
export default {
  data() {
    return {
      // 表格
      cardList: [],
      // 表格查询参数
      queryParams: {
        page: '1',
        pageSize: '2',
        carNumber: '',
        personName: '',
        cardStatus: ''
      },
      // 列表总数
      listTotal: null,
      // 下拉菜单
      cardListStatus: [
        {
          id: null,
          label: '全部'
        },
        {
          id: 0,
          label: '可用'
        },
        {
          id: 1,
          label: '已过期'
        }
      ]
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    // 拿到当前表格数据
    async getCardList() {
      const res = await getCardList(this.queryParams)
      this.cardList = res.rows
      this.listTotal = res.total
    },
    // 格式化内容
    formatter(row) {
      const MAP = {
        0: '可用',
        1: '已过期'
      }
      return MAP[row.cardStatus]
    },
    // 页面变化
    // 拿到pageSize
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getCardList()
    },
    // 拿到当前页码发生变化
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getCardList()
    },
    // 根据新参数获取列表
    queryList() {
      /* 调用接口之前将页面数重置为1 */
      this.queryParams.page = 1
      this.getCardList()
    },
    // 添加月卡
    addCard() {
      this.$router.push('/parking/addcard')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;
  .search-main {
    width: 220px;
    margin-right: 10px;
  }
  .search-btn{
    margin-left:20px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
