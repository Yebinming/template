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
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        width="80"
      >
      </el-table-column>
      <el-table-column label="图书馆名称">
        <template slot-scope="scope">
          {{ scope.row.libraryName }}
        </template>
      </el-table-column>

      <el-table-column label="图书馆图片">
        <template slot-scope="scope">
          <!-- {{ scope.row.libraryImg }} -->
           <el-image
            style="width:80px"
            :src="scope.row.libraryImg"
            :preview-src-list="[scope.row.libraryImg]"
          />
        </template>
      </el-table-column>
      <el-table-column label="图书馆地址">
        <template slot-scope="scope">
          {{ scope.row.addresses }}
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
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
                path:$route.path + '/detail',
                query: {
                  id: scope.row.id,
                },
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
import { librarysList,librarysDelete
 } from "@/api/api";
export default {
  data() {
    return {
      list: [],
      page: {
        userId:'',
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
      librarysDelete({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    fetchData() {
      this.page.userId=this.id
      librarysList(this.page).then((res) => {
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
  justify-content: flex-end;
}
.font {
  font-size: 14px;
}
.btns {
  margin-left: 20px;
}

</style>