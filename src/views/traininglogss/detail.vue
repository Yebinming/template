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
            <el-form-item label="标题：" prop="title">
              <el-input v-model="subForm.title" placeholder="请输入" />
            </el-form-item>
      
            <el-form-item label="排序数：" prop="sortNum">
              <el-input
                type="number"
                v-model.number="subForm.sortNum"
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
import {logDetail,

 } from "@/api/api";
export default {
  data() {
    return {
      subForm: {
        title: "",
        img: "",
        sortNum: "",
      },
      subRules: {
        title: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        img: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        sortNum: [
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
      logDetail({ pid: this.$route.query.id }).then((res) => {
        this.subForm = res.body;
      });
    }
  },
  methods: {
    onUploadImgSuccessImg(res, file) {
      this.form.bannerImg = res.body;
      console.log();
    },
    onBit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.subForm.id) {
            bannersUpdate(this.subForm).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            bannersAdd(this.subForm).then((res) => {
              this.$message.success("修改成功");
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
</style>