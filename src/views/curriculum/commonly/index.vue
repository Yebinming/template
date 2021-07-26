<template>
  <div class="app-container">
   
    <el-header>
      <div class="topright flex flex-x-end">
        <el-button type="primary" style="width: 114px" @click="$router.push({ path:$route.path + '/detail'})">
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
      <el-table-column label="设定时间">
        <template slot-scope="scope">
          {{ scope.row.settingTime | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          {{ scope.row.synopsis }}
        </template>
      </el-table-column>

      <!-- <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type == "VIDEO" ? "视频" : "广告" }}
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button    size="small" @click="$router.push({ path:$route.path + '/list', query: { pid: scope.row.id } })">
             查看
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
import { timetableuniformsDelete,getTimetableUniformsList } from "@/api/api";
export default {
  data() {
    return {
      listLoading: true,
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
    onDelete(id) {
      timetableuniformsDelete({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },

    fetchData() {
      this.listLoading = true;
      getTimetableUniformsList(this.page).then((res) => {
        this.listLoading = false;
        this.list = res.body.rows;
      });
    },
  },
};
</script>
