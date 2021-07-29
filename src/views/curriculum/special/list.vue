<template>
  <div class="app-container">
    <el-header style="padding:0">
      <div class="topright flex  display">
        <div
          class="topright flex"
          style="cursor: pointer; display: flex; align-items: center"
        >
          <img
            @click="$router.back()"
            src="../../../assets/img/backs.png"
            alt=""
          />
          <span @click="$router.back()" style="line-height: 1px">返回</span>
        </div>
        <!-- <el-button
          type="primary"
          style="width: 114px"
          @click="$router.push({ path: '/curriculum/special/detail',  query: { settingTime:$route.query.settingTime }})"
        >
          添加
        </el-button> -->
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
      <el-table-column label="视频名称">
        <template slot-scope="scope">
          {{!!scope.row.video? scope.row.video.videoName:'视频被删除了' }}
        </template>
      </el-table-column>
      <el-table-column label="视频链接">
        <template slot-scope="scope">
          <span v-if="!!!scope.row.video">视频被删除了</span>
        <span v-else style=" cursor: pointer; color:#004BFF" @click="open(scope.row.video.videoAddresses)">{{ scope.row.video.videoAddresses }}</span> 
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          {{!!scope.row.video? scope.row.video.introduction:'视频被删除了' }}
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          {{!!scope.row.video? scope.row.video.remarks:'视频被删除了' }}
        </template>
      </el-table-column>
      <!-- 
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type == "VIDEO" ? "视频" : "广告" }}
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="
              $router.push({
                path: '/curriculum/special/detail',
                query: { id: scope.row.id,act:'2' }
              })
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
import { timetablespecialsDelete,specialsGetTimetable } from "@/api/api";
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      page: {
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
        pid: this.$route.query.pid,
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
      timetablespecialsDelete({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
 open(url){
       window.open(url)
    }, 
    fetchData() {
      this.listLoading = true;
      specialsGetTimetable(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.listLoading = false;
        this.list = res.body.rows;
      });
    },
  },
};
</script>
<style>
.display{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>