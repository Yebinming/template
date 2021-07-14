<template>
  <div class="app-container">
        <!-- <el-header>
      <div class="topright flex flex-x-end">
        <el-button
          type="primary"
          style="width: 114px"
          @click="$router.push({ path: 'detail'})"
        >
          添加
        </el-button>
      </div>
    </el-header> -->
      <el-header>
      <div class="search">
        <span class="font">学校名称：</span>
         <el-input
          placeholder="请输入内容"
          v-model="page.name"
          style="width: 150px"
          size="mini"
          clearable
        >
        </el-input>
        <el-button class="btns" size='mini' type="primary" @click="fetchData('act')"
          >搜索</el-button
        >
      </div>
        <div class="topright flex flex-x-end">
        <el-button
          type="primary"
          style="width: 114px"
          @click="$router.push({ path: 'targeted/detail' })"
        >
          添加
        </el-button>
        </div>
    </el-header>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
 <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        width="80"
      >
      </el-table-column>
      <el-table-column label="负责人姓名">
        <template slot-scope="scope">
          {{ scope.row.principalName }}
        </template>
      </el-table-column>
      <el-table-column label="指标类型">
        <template slot-scope="scope">
          {{ scope.row.targetedTypeName }}
        </template>
      </el-table-column>
      <el-table-column label="一级指标">
        <template slot-scope="scope">
          {{ scope.row.firstTargetedName }}
        </template>
      </el-table-column>
      <el-table-column label="年份">
        <template slot-scope="scope">
          {{ scope.row.createdYear }}
        </template>
      </el-table-column>
      <el-table-column label="学校类型" >
        <template slot-scope="scope">
          {{ scope.row.type=='PRIMARY_SCHOOL'
          ?'小学'
          :scope.row.type=='JUNIOR_HIGH_SCHOOL'
          ? '初中'
          :scope.row.type=='SENIOR_HIGH_SCHOOL'
          ?'高中'
          :'九年一贯学校'
          }}
        </template>
      </el-table-column>
      <el-table-column label="学校名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学校简介">
        <template slot-scope="scope">
          {{ scope.row.introduce }}
        </template>
      </el-table-column>


      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            class="mr20 mb10"
            type="primary"
            @click="
              $router.push({ path: 'detailedrule/detail', query: { 
                id: scope.row.id,
                 } })
            "
          >
            修改
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="不用了"
            title="确定删除吗？"
            @onConfirm="onDelete(scope.row.id)"
          >
            <el-button slot="reference" size="small" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20 flex flex-x-center">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        layout=" prev, pager, next "
        :total="page.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { detailedruleList,
detailedruleUpdate,
detailedruleDetail,
detailedruleDel,
detailedruleAdd} from '@/api/api';
export default {
  data() {
    return {
      list: [],
      page: {
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
        name:''
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(val) {
      this.page.pageNum = --val;
         this.fetchData();
    },
 indexMethod(index) {
      return index + 1 + this.page.pageNum * this.page.pageSize;
    },
    onDelete(id) {
      detailedruleDel({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    fetchData() {
      detailedruleList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.list = res.body.rows;
      });
    },
  },
};
</script>
<style  scoped>
.topright {
  line-height: 60px;
}
.el-header {
  padding: 0;
  display: flex;
  align-items: center;
}
.font{
  font-size: 14px;
}
.btns {
 margin-left: 20px;
}.el-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>