<template>
  <div class="app-container">
   
    <el-header>
        <div class="search">
        <span class="font">时间：</span>
         <el-date-picker
          v-model="page.settingTime"
          value-format="timestamp"
          type="date" size='mini'
          placeholder="选择日期">
        </el-date-picker>

        <el-button class="btn" size='mini' type="primary" @click="fetchData('act')"
          >搜索</el-button
        >
      </div>
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
          {{ scope.row.settingTime | parseTime("{y}-{m}-{d}") }}
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          {{ scope.row.synopsis }}
        </template>
      </el-table-column>
 <el-table-column label="封面图片">
        <template slot-scope="scope">
           <el-image 
              style="width: 100px; height: 100px"
              :src="scope.row.coverImg" 
              :preview-src-list="[scope.row.coverImg]">
            </el-image>
        </template>
      </el-table-column>
      <!-- <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type == "VIDEO" ? "视频" : "广告" }}
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button    size="small" @click="$router.push({ path:$route.path + '/list', query: { settingTime: scope.row.settingTime,  } })">
             查看
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="
              $router.push({
                 path:$route.path + '/detail',
                query: { id: scope.row.id,act:'1' }
              })
            "
          >
            修改
          </el-button>
             <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="不用了"
            title="确定删除一天的视频吗？"
            @onConfirm="onDelete(scope.row.id)"
          >
            <el-button slot="reference" class="ml10" size="small" type="danger">
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
import { timetableuniformsDelete,getTimetableUniformsList,timetableuniformsDeleteCourse  } from "@/api/api";
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
      timetableuniformsDeleteCourse({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },

    fetchData() {
      this.listLoading = true;
      getTimetableUniformsList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.listLoading = false;
        this.list = res.body.rows;
      });
    },
  },
};
</script>
<style scoped>
 .el-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  display: flex;
  align-items: center;
  height: 28px;
  margin: auto 0 auto 20px;
}
.search {
  display: flex;
  line-height: 30px;
}
</style>