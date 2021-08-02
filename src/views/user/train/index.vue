<template>
  <div class="app-container">
    <div class="mb20">
      <el-input
        class=""
        style="width: 180px"
        v-model="page.userName"
        placeholder="请输入用户名"
        @input="fetchData()"
      ></el-input>

      <el-button
        type="primary"
        size="small"
        class="ml10"
        @click="store.visible = true"
        >门店启用/禁用训练模式</el-button
      >
    </div>
    <el-tabs v-model="active" tab-position="top">
      <el-tab-pane label="全部" name="all">
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
          <el-table-column label="训练模式" class="isTrain">
            <template slot-scope="scope">
              <el-tag effect="plain" :type="scope.row.isTrain | isTrainType(scope.row.isTabooTrain)">
                {{ scope.row.isTrain | isTrain(scope.row.isTabooTrain) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="禁用原因">
            <template slot-scope="scope">
              {{ scope.row.trainText }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button
                  :type="scope.row.isTabooTrain != 0 ? 'primary' : 'info'"
                  size="small"
                  @click="trainStatusChange(scope.row.isTabooTrain, scope.row.id)"
                  >{{
                    (scope.row.isTabooTrain != 0 ? "启用" : "禁用") + "训练模式"
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
    <el-dialog
      title="按门店禁用/启用"
      :visible.sync="store.visible"
      width="30%"
    >
      <span>
        <el-select
          v-model="store.id"
          placeholder="请选择门店"
          clearable
          filterable
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.libraryName"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <el-radio-group class="ml20" v-model="store.type">
          <el-radio :label="$const.DISABLED"> 禁用 </el-radio>
          <el-radio :label="$const.ENABLED"> 启用 </el-radio>
        </el-radio-group>
      </span>
      <el-input
        v-model="store.trainText"
        v-if="store.type == $const.DISABLED"
        class="mt20"
        placeholder="请输入禁用原因"
      ></el-input>
      <span slot="footer">
        <el-button @click="store.visible = false">取消</el-button>
        <el-button type="primary" @click="handleDisAndEna">确定</el-button>
      </span>
    </el-dialog>
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
  passTrain,
  traininglogssTurnTrain,
  traininglogssParentList,
  traininglogssDisableTrainDeputy,
  traininglogssEnableTrainDeputy,
  librarysLists,
} from "@/api/api";
export default {
  components: { Pagination },
  data() {
    return {
      options: [],
      store: {
        visible: false,
        type: this.$const.DISABLED,
        id: "",
        trainText: "",
      },

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
    this.active = this.$route.query.active || "audit";

    librarysLists().then((res) => {
      this.options = res.body;
    });

    this.fetchData();
  },
  computed: {
    ...mapGetters(["id"]),
  },
  methods: {
    handleDisAndEna() {
      if (!this.store.id) {
        this.$message({
          message: "请选择门店",
          type: "error",
        });
        return;
      }
      this.store.type == this.$const.DISABLED
        ? traininglogssDisableTrainDeputy({
            id: this.store.id,
            trainText: this.store.trainText,
          }).then((res) => {
            this.$message({
              message: "提交成功",
              type: "success",
            });
            this.store.visible = false;
            this.fetchData();
          })
        : traininglogssEnableTrainDeputy({
            id: this.store.id,
          }).then((res) => {
            this.$message({
              message: "提交成功",
              type: "success",
            });
            this.store.visible = false;
            this.fetchData();
          });
    },

    adopt(id) {
       passTrain({
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
        traininglogssDisableTrain({
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
      val != '0'
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
            traininglogssTurnTrain({ id, trainText: value }).then((res) => {
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

      window.location.href =
        window.location.href.split("?")[0] +
        "?" +
        this.$utils.objectToUrlParams({
          ...this.$route.query,
          active: val,
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