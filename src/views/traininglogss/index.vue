<template>
  <div class="app-container">

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
        <el-table-column label="地址">
        <template slot-scope="scope">
          {{ scope.row.addresses }}
        </template>
      </el-table-column>
      <el-table-column label="登录时间">
        <template slot-scope="scope">
          {{scope.row.loginTime | parseTime('{y}-{m}-{d} {h}:{i}')  }}
        </template>
      </el-table-column>
      <el-table-column label="登出时间">
        <template slot-scope="scope">
          {{scope.row.logoutTime | parseTime('{y}-{m}-{d} {h}:{i}')  }}
        </template>
      </el-table-column>
    <el-table-column label="启用状态">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status == 'ENABLED'"
            active-color="#13ce66"
            @change="onChange($event, scope.row.id)"
          >
          </el-switch>
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
                path: '/detail',
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
import { mapGetters } from "vuex";
import { traininglogssDelete,
traininglogssList,
traininglogssDisableTrain,
traininglogssEnableTrain
 } from "@/api/api";
export default {
  data() {
    return {
      list: [],
      page: {
        userId:'114',
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
      },
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["id"]),
  },
  methods: {
    handleCurrentChange(val) {
      this.page.pageNum = --val;
      this.fetchData();
    },
        onChange(val, id) {
      val
        ? traininglogssEnableTrain({ id }).then((res) => {
            this.fetchData();
          })
        : traininglogssDisableTrain({ id }).then((res) => {
            this.fetchData();
          });
    },
    indexMethod(index) {
      return index + 1 + this.page.pageNum * this.page.pageSize;
    },
    onDelete(id) {
      traininglogssDelete({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    fetchData() {
      // this.page.userId=this.id
      traininglogssList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.list = res.body;
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