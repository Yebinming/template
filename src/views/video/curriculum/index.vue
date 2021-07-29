<template>
  <div class="app-container">
    <el-header style="padding:0">
      <div class="topright flex flex-x-end">
        <el-button type="primary" style="width: 114px" @click="$router.push({ path:$route.path + '/detail'})">
          添加
        </el-button>
      </div>
    </el-header>
       <!-- <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="视频" name="VIDEO"></el-tab-pane>
        <el-tab-pane label="广告" name="ADVERT"></el-tab-pane>
      </el-tabs> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
        <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.videoName }}
        </template>
      </el-table-column>
        <el-table-column label="地址">
        <template slot-scope="scope">
           <span style=" cursor: pointer; color:#004BFF" @click="open(scope.row.videoAddresses)">{{ scope.row.videoAddresses }}</span> 
        </template>
      </el-table-column>
        <el-table-column label="时长(/秒)">
        <template slot-scope="scope">
          {{ scope.row.videoTokinaga }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </template>
      </el-table-column>
       <el-table-column label="视频标题">
        <template slot-scope="scope">
          {{ scope.row.remarks }}
        </template>
      </el-table-column>
      <el-table-column label="视频简介">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>
     
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.type=='VIDEO'?'视频':'广告' }}
        </template>
      </el-table-column>
    
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button    type="primary" size="small" @click="$router.push({ path:$route.path + '/detail', query: { id: scope.row.id } })">
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
import {videosCreate,
videosDelete,
videosDetail,
videosList,
videosUpdate } from '@/api/api';
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      page: {
        pageNum: 0,
        pageSize: 50,
        totalCount: 0,
        type:'VIDEO'
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
      videosDelete({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
 open(url){
       window.open(url)
    }, 
    fetchData() {
      this.listLoading = true;
      videosList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.listLoading = false;
        this.list = res.body.rows;
      });
    },
  },

};
</script>