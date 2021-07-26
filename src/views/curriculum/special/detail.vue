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
            <el-form-item label="视频：" prop="videoId">
              <el-select style="width: 334px" v-model="subForm.videoId">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.videoName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分店：" prop="libraryId">
              <el-select style="width: 334px" v-model="subForm.libraryId">
                <el-option
                  v-for="item in option"
                  :key="item.id"
                  :label="item.libraryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设点时间：" prop="settingTime">
              <el-date-picker
                value-format="timestamp"
                style="width: 334px"
                v-model="subForm.settingTime"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="简介：" prop="synopsis">
              <el-input
                style="width: 334px"
                v-model="subForm.synopsis"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item>
              <div class="fr">
                <el-button @click="$router.back()"> 取消 </el-button>

                <el-button type="primary" @click="onBit('regsForm')">
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
import {
  timetablespecialsCreate,
  timetablespecialsUpdate,
  videosLists,
  getTimetablespecialsGet,
  librarysLists
} from "@/api/api";
export default {
  data() {
    return {
      subForm: {
        settingTime: this.$route.query.settingTime,
        videoId: "",
        synopsis: "",
      },
      options: [],
      option:[],
      subRules: {
        settingTime: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        videoId: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        synopsis: [
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
    videosLists().then((res) => {
      this.options = res.body;
    });
     librarysLists().then(res=>{
        this.option = res.body;
    })
    if (this.$route.query.id) {
      getTimetablespecialsGet({ id: this.$route.query.id }).then((res) => {
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
            timetablespecialsUpdate(this.subForm).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            timetablespecialsCreate(this.subForm).then((res) => {
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

<style lang="scss" >
.right_cont {
  margin-top: 50px;
}
.fr {
  width: 500px;
}
</style>