<template>
  <div class="app-container">
    <div class="from_worp font">
      <div>
      <el-input
        style="width: 180px"
        v-model="page.userName"
        placeholder="请输入用户名"
        @input="fetchData()"
      ></el-input>
      <el-select
        class="ml10"
        v-model="page.status"
        clearable
        filterable
        @change="fetchData()"
      >
        <el-option label="全部状态" value=""></el-option>
        <el-option label="启用" value="ENABLED"></el-option>
        <el-option label="禁用" value="DISABLED"></el-option>
      </el-select>
      <!-- <span class="ml10">
        仅查看禁用训练模式：
        <el-switch
          inactive-test="#000"
          v-model="page.isTrain"
          :active-value="true"
          :inactive-value="false"
          @change="fetchData()"
        >
        </el-switch>
      </span> -->
      <span class="ml10">
        仅查看登录异常
        <el-switch
          inactive-test="#000"
          v-model="page.lognErr"
          :active-value="true"
          :inactive-value="false"
          @change="fetchData()"
        >
        </el-switch>
      </span>
      </div>
       <el-button type="primary" style="width: 114px" @click="$router.push({ path: '/user/detail'})">
          新增用户
        </el-button>
        
    </div>
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
          <el-tag effect="plain" :type="scope.row.isTrain | isTrainType(scope.row.isTabooTrain)">
            {{ scope.row.isTrain | isTrain(scope.row.isTabooTrain) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="登录状况">
        <template slot-scope="scope">
          <el-tag
            effect="plain"
            :type="scope.row.lognErr == 1 ? 'danger' : 'success'"
          >
            {{ scope.row.lognErr == 1 ? "异常" : "正常" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="410px">
        <template slot-scope="scope">
          <div style="margin-top: 10px">
            <el-button
              :type="scope.row.status == 'DISABLED' ? 'primary' : 'info'"
              size="small"
              @click="
                change(scope.row.status == 'DISABLED' ? 1 : 0, scope.row.id)
              "
              >{{ scope.row.status == "DISABLED" ? "启用" : "禁用" }}</el-button
            >
            <!-- <el-button
              :type="scope.row.isTrain != 2 ? 'primary' : 'info'"
              size="small"
              @click="trainStatusChange(scope.row.isTrain, scope.row.id)"
              >{{
                (scope.row.isTrain != 2 ? "开启" : "关闭") + "训练模式"
              }}</el-button
            > -->
            <el-popconfirm
              v-if="scope.row.lognErr == 1"
              class="ml10"
              confirm-button-text="确定"
              cancel-button-text="不用了"
              title="确定忽略吗？"
              @onConfirm="errIgnore(scope.row.id)"
            >
              <el-button slot="reference" size="small" type="danger">
                忽略异常
              </el-button>
            </el-popconfirm>
            <router-link
              class="ml10"
              :to="{ path: 'detail', query: { id: scope.row.id } }"
            >
              <el-button size="small" type="primary">修改资料</el-button>
            </router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20 flex flex-x-center">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page.limit"
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

      <span slot="footer">
        <el-button @click="store.visible = false">取消</el-button>
        <el-button type="primary" @click="handleDisAndEna">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  traininglogssDelete,
  adminuserGetAdminUserList,
  userGetUserList,
  userEnable,
  userDisable,
  traininglogssDisableTrain,
  traininglogssEnableTrain,
  userErrIgnore,
  librarysLists,
  traininglogssDisableTrainDeputy,
  traininglogssEnableTrainDeputy,
} from "@/api/api";
export default {
  data() {
    return {
      options: [],
      store: {
        visible: false,
        type: this.$const.DISABLED,
        id: "",
      },
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
        isUpdate: "",
        isUnlock: "",
        isTrain: "",
        lognErr: false,
        totalCount: 0,
      },
    };
  },
  created() {
    librarysLists().then((res) => {
      this.options = res.body;
    });

    this.fetchData();
  },
  mounted(){
    setInterval(this.fetchData,5000)
  },
  watch: {},
  methods: {
 
    errIgnore(id) {
      userErrIgnore({ id }).then((res) => {
        this.$message({
          message: "提交成功",
          type: "success",
        });
        this.fetchData();
      });
    },
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

    handleCurrentChange(val) {
      this.page.page = --val;
      this.fetchData();
    },
    indexMethod(index) {
      return index + 1 + this.page.page * this.page.limit;
    },
   
    fetchData() {
      let data = { ...this.page };
      data.lognErr ? (data.lognErr = 1) : delete data.lognErr;
      userGetUserList(data).then((res) => {
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
  display: flex;
  justify-content: space-between;
}
.btns {
  margin-left: 20px;
}
</style>