<template>
  <div>
    <div class="right_cont">
      <el-header>
        <div
          class="topright flex"
          style="cursor: pointer; display: flex; align-items: center"
        >
          <img
            @click="$router.back()"
            src="../../assets/img/backs.png"
            alt=""
          />
          <span @click="$router.back()" style="line-height: 1px">返回</span>
        </div>
      </el-header>
      <el-form
        ref="regsForm"
        :model="subForm"
        :rules="subRules"
        label-width="180px"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="subForm.userName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="头像" prop="headerImg">
              <el-upload
                class="avatar-uploader"
                :action="$api.uploadFileUrl"
                :show-file-list="false"
                name="upfile"
                :on-success="(res) => {
                   subForm.headerImg = res.body;
                }"
              >
                <img v-if="subForm.headerImg" :src="subForm.headerImg" style="width: 200px;height: 200px;" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="门店" prop="libraryId">
              <el-select v-model="subForm.libraryId" placeholder="请选择门店" clearable filterable>
                <el-option 
                v-for="item in options"
                  :key="item.id"
                  :label="item.libraryName"
                  :value="item.id">
                </el-option>
              </el-select>
              
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item>
              <div class="fr">
                <el-button class="fr" type="primary" @click="onBit('regsForm')">
                  提交
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {traininglogssDetail,
DisableTrain,
DnableTrain, 
userGet,
librarysLists,
userUserUpdate} from "@/api/api";
export default {
  data() {
    return {
      options: [],
      subForm: {
        userId: "",
        headerImg: "",
        userName: "",
        libraryId: "",
      },
      subRules: {
        headerImg: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        userName: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        libraryId: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {
    librarysLists().then(res => {
       this.options = res.body
    });
    if (this.$route.query.id) {
      userGet({ id: this.$route.query.id }).then((res) => {
        this.subForm = {
          userId: res.body.id,
          headerImg: res.body.headerImg,
          userName: res.body.userName,
          libraryId: res.body.libraryId,
        };
      });
    }
  },
  methods: {
    onBit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            userUserUpdate(this.subForm).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
        } else {
          this.$message.warning("请填写内容");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.right_cont {
  margin-top: 50px;
}
</style>