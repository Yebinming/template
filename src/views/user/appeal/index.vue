<template>
  <div class="app-container">
    <el-tabs
      v-model="active"
      type="card"
      tab-position="top"
    >
      <el-tab-pane label="忘记密码申诉" name="isUpdate"> </el-tab-pane>
      <el-tab-pane label="设备锁定解锁申诉" name="isUnlock"> </el-tab-pane>
    </el-tabs>

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

      <el-table-column label="创建时间">
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
      <el-table-column label="原因">
        <template slot-scope="scope">
          {{ active == "isUpdate" ? scope.row.forgetText : scope.row.applyText}}
        </template>
      </el-table-column>


      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            class=" mb10"
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
    <div class="mt20 flex flex-x-center">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page.limit"
        layout=" prev, pager, next "
        :total="page.totalCount"
      >
      </el-pagination>
    </div>
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
  userIsUnlock,
  userIsUpdate,
} from "@/api/api";
export default {
  data() {
    return {
      active: "isUpdate",
      list: [],
      page: {
        userName: "",
        regStart: "",
        regEnd: "",
        status: "",
        page: 0,
        limit: 10,
        isUpdate: 1,
        isUnlock: "",
        isTrain: "",
        lognErr: "",
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
      this.handlerUpdate({
        id,
        isUpdate: this.$const.ADOPT,
        isUnlock	: this.$const.ADOPT,
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
        this.handlerUpdate({
          id,
          isUpdate: this.$const.REBUT,
          isUnlock	: this.$const.REBUT,
          forgetText: value,
          applyText: value,
        }).then((res) => {
          this.$message.success("成功");
          this.fetchData();
        });
      });
    },
    handlerUpdate(opt) {
      return this.page.isUpdate ? userIsUpdate(opt) : userIsUnlock(opt);
    },
    handleCurrentChange(val) {
      this.page.page = --val;
      this.fetchData();
    },
    indexMethod(index) {
      return index + 1 + this.page.page * this.page.limit;
    },
    fetchData(opt) {
      userGetUserList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.list = res.body.rows;
      });
    },
  },
  watch: {
    active(val) {
      this.page =
        val == "isUpdate"
          ? Object.assign(this.page, {
              page: 0,
              isUpdate: 1,
              isUnlock: "",
            })
          : Object.assign(this.page, {
              page: 0,
              isUpdate: "",
              isUnlock: 1,
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