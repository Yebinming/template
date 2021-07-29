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
            src="../../../assets/img/backs.png"
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
            <el-form-item label="图书馆名称" prop="libraryName">
              <el-input v-model="subForm.libraryName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="图书馆图片" prop="libraryImg">
              <el-upload
                class="avatar-uploader"
                :action="$api.uploadFileUrl"
                :show-file-list="false"
                name="upfile"
                :on-success="onUploadImgSuccessImg"
              >
                <img v-if="subForm.libraryImg" :src="subForm.libraryImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="图书馆地址：" prop="addresses">
              <el-input
            
                v-model="subForm.addresses"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="简介：" prop="introduction">
              <el-input
              
                v-model="subForm.introduction"
                placeholder="请输入"
              />
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
import {librarysDetail,
librarysUpdate,librarysCreate
 } from "@/api/api";
export default {
  data() {
    return {
      subForm: {
      libraryName:'',
      libraryImg:'',
      addresses:'',
      introduction:''
      },
      subRules: {
        libraryName: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        libraryImg: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        addresses: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        introduction: [
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
    if (this.$route.query.id) {
      librarysDetail({ id: this.$route.query.id }).then((res) => {
        this.subForm = res.body;
      });
    }
  },
  methods: {
    onUploadImgSuccessImg(res, file) {
      this.subForm.libraryImg = res.body;
      console.log();
    },
    onBit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.subForm.id) {
            librarysUpdate(this.subForm).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            librarysCreate(this.subForm).then((res) => {
              this.$message.success("新增成功");
              this.$router.back();
            });
          }
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
// .avatar-uploader{
//   width: 200px;
//   height: 200px;
// }
.avatar {
  width:200px;
  height: 200px;
}
</style>