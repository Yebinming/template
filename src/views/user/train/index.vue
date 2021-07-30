<template>
  <div class="app-container">

    <el-tabs v-model="active" type="card" tab-position="top">
      <el-tab-pane label="全部" name="all">
            <el-input
    class="mb20"
      style="width: 180px"
      v-model="page.userName"
      placeholder="请输入用户名"
      @input="fetchData()"
    ></el-input>

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
          <el-table-column label="头像">
            <template slot-scope="scope">
              <el-image
                style="width: 80px"
                :src="scope.row.headerImg"
                :preview-src-list="[scope.row.headerImg]"
              />
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.createdTime | parseTime }}
            </template>
          </el-table-column>

          <el-table-column label="手机号">
            <template slot-scope="scope">
              {{ scope.row.loginPhone }}
            </template>
          </el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>
          <el-table-column label="门店">
            <template slot-scope="scope">
              {{ scope.row.library ? scope.row.library.libraryName : "" }}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag
                effect="plain"
                :type="scope.row.status == 'ENABLED' ? 'success' : 'danger'"
              >
                {{ scope.row.status | status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="训练模式">
            <template slot-scope="scope">
              <el-tag effect="plain" :type="scope.row.isTrain | isTrainType">
                {{ scope.row.isTrain | isTrain }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button
                  :type="scope.row.isTrain != 2 ? 'primary' : 'info'"
                  size="small"
                  @click="trainStatusChange(scope.row.isTrain, scope.row.id)"
                  >{{
                    (scope.row.isTrain != 2 ? "开启" : "关闭") + "训练模式"
                  }}</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待审核" name="audit">
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
          <el-table-column label="头像">
            <template slot-scope="scope">
              <el-image
                style="width: 80px"
                :src="scope.row.headerImg"
                :preview-src-list="[scope.row.headerImg]"
              />
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.createdTime | parseTime }}
            </template>
          </el-table-column>

          <el-table-column label="手机号">
            <template slot-scope="scope">
              {{ scope.row.loginPhone }}
            </template>
          </el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>
          <el-table-column label="门店">
            <template slot-scope="scope">
              {{ scope.row.library ? scope.row.library.libraryName : "" }}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag
                effect="plain"
                :type="scope.row.status == 'ENABLED' ? 'success' : 'danger'"
              >
                {{ scope.row.status | status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="small"
                class="mb10"
                type="primary"
                @click="adopt(scope.row.id)"
              >
                通过
              </el-button>
              <el-button
                slot="reference"
                size="small"
                @click="rebut(scope.row.id)"
                type="danger"
              >
                驳回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

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
import Pagination from "@/components/myPagination"; // Secondary package based on el-pagination
import {
  traininglogssDelete,
  adminuserGetAdminUserList,
  userGetUserList,
  userEnable,
  userDisable,
  traininglogssDisableTrain,
  traininglogssEnableTrain,
  traininglogssTurnTrain,
  traininglogssParentList,
} from "@/api/api";
export default {
  components: { Pagination },
  data() {
    return {
      active: "audit",
      list: [],
      // page: {
      //   userId: "",
      //   page: 0,
      //   limit: 10,
      //   totalCount: 0,
      // },
      page: {
        userName: "",
        regStart: "",
        regEnd: "",
        status: "",
        page: 0,
        limit: 10,
        isTrain: 1,
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
    adopt(id) {
      traininglogssEnableTrain({
        id,
      }).then((res) => {
        this.$message.success("成功");
        this.fetchData();
      });
    },

    rebut(id) {
      this.$prompt(null, "请输入驳回原因", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: "",
      }).then(({ value }) => {
        traininglogssTurnTrain({
          id,
          trainText: value,
        }).then((res) => {
          this.$message.success("成功");
          this.fetchData();
        });
      });
    },

    handleCurrentChange(val) {
      this.page.page = --val;
      this.fetchData();
    },
    indexMethod(index) {
      return index + 1 + this.page.page * this.page.limit;
    },
    fetchData() {
      userGetUserList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.list = res.body.rows;
      });
    },
        trainStatusChange(val, id) {
      val != this.$const.ADOPT
        ? traininglogssEnableTrain({ id }).then((res) => {
            this.$message({
              message: "成功",
              type: "success",
            });
            this.fetchData();
          })
        : this.$prompt(null, "请输入禁用原因", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: "",
            inputErrorMessage: "",
          }).then(({ value }) => {
            traininglogssDisableTrain({ id, trainText: value }).then((res) => {
              this.$message({
                message: "成功",
                type: "success",
              });
              this.fetchData();
            });
          });
    },

  },
  watch: {
    active(val) {
      this.page =
        val == "all"
          ? Object.assign(this.page, {
              userName: "",
              status: "",
              page: 0,
              limit: 10,
              isTrain: "",
              totalCount: 0,
            })
          : Object.assign(this.page, {
              userName: "",
              status: "",
              page: 0,
              limit: 10,
              isTrain: 1,
              totalCount: 0,
            });
      this.fetchData();
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