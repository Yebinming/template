<template>
  <div class="app-container">
    <!-- <div class="from_worp">
      <div class="flex font">
        仅查看禁用训练模式：
        <el-switch
          inactive-test="#000"
          v-model="page.isTrain"
          :active-value="1"
          :inactive-value='""'
        >
        </el-switch>
      </div>
    </div> -->
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
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime}}
        </template>
      </el-table-column>
      <el-table-column label="持续时间（分钟）">
        <template slot-scope="scope">
          {{ scope.row.persistentTime }}
        </template>
      </el-table-column>
      
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 80px"
            :src="scope.row.user.coverImg"
            :preview-src-list="[scope.row.coverImg]"
          />
        </template>
      </el-table-column>

      <el-table-column label="视频名称">
        <template slot-scope="scope">
          {{ scope.row.videoName }}
        </template>
      </el-table-column>

      <el-table-column label="视频简介">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
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
import Pagination from '@/components/myPagination' // Secondary package based on el-pagination
import {
  traininglogssDelete,
  adminuserGetAdminUserList,
  userGetUserList,
  userEnable,
  userDisable,
  traininglogssDisableTrain,
  traininglogssEnableTrain,
  traininglogssParentList,
  traininglogssSublevelList,
  traininglogssSublevelVideoList,
} from "@/api/api";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      // page: {
      //   userId: "",
      //   page: 0,
      //   limit: 10,
      //   totalCount: 0,
      // },
      page: {
        id: this.$route.query.id,
        pageNum: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["id"]),
  },
  watch: {
    "page.isTrain"() {
      this.fetchData();
    },
  },
  methods: {
    change(val, id) {
      val == this.$const.DISABLED
        ? userDisable({ id }).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.fetchData();
          })
        : userEnable({ id }).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.fetchData();
          });
    },
    trainStatusChange(val, id) {
      val == this.$const.DISABLED
        ? traininglogssDisableTrain({ id }).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.fetchData();
          })
        : traininglogssEnableTrain({ id }).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.fetchData();
          });
    },

    handleCurrentChange(val) {
      this.page.pageNum = --val;
      this.fetchData();
    },
    indexMethod(index) {
      return index + 1 + this.page.pageNum * this.page.pageSize;
    },
    fetchData() {
      traininglogssSublevelVideoList(this.page).then((res) => {
        this.page.totalCount = res.body.rows.totalCount;
        this.list = Object.assign(this.list,res.body.rows, {
          coverImg: res.body.rows.video,
          videoName: res.body.rows.video,
          introduction: res.body.rows.video,
        });
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