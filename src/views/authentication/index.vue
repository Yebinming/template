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
    <!-- <el-header>
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
        <el-button
          class="btns"
          size="mini"
          type="primary"
          @click="fetchData('act')"
          >搜索</el-button
        >
      </div>
    </el-header> -->
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
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.authenticationName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{ scope.row.authenticationPhone }}
        </template>
      </el-table-column>
      <el-table-column label="职称">
        <template slot-scope="scope">
          {{ scope.row.authenticationSchoolName }}
        </template>
      </el-table-column>
      <el-table-column label="所属学校">
        <template slot-scope="scope">
          {{ scope.row.authenticationTitle }}
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          {{ scope.row.authenticationStatus=='NOAUDIT'
          ? '未审核'
          :scope.row.authenticationStatus=='AUDIT'
          ?'审核中'
          :scope.row.authenticationStatus=='FIAL'
          ?'审核不通过'
          :scope.row.authenticationStatus=='SUCCESS'
          ?'审核成功'
          :'审核完成'
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            class="mr20 mb10"
            type="primary"
            @click="
              $router.push({
                path: '/authentication/detail',
                query: {
                  id: scope.row.id,
                },
              })
            "
          >
            去审核
          </el-button>
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
import {
  authenticationschoolList,
} from "@/api/api";
export default {
  data() {
    return {
      list: [],
      page: {
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
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
      schoolDel({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    fetchData() {
      authenticationschoolList(this.page).then((res) => {
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
.font {
  font-size: 14px;
}
.btns {
  margin-left: 20px;
}
</style>