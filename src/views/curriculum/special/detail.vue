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
            <el-form-item
              label="视频："
              prop="videoId"
              v-if="$route.query.act == '2' || $route.query.act == 'a2'"
            >
              <el-select style="width: 334px" v-model="subForm.videoId">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.videoName"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.videoName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px"
                    >({{ item.type == "VIDEO" ? "视频" : "广告" }})</span
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="分店："
              prop="libraryId"
              v-if="$route.query.act == '1' || $route.query.act == 'a1'"
            >
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

            <el-form-item
              label="设点时间："
              prop="settingTime"
              v-if="$route.query.act == '1' || $route.query.act == 'a1'"
            >
              <el-date-picker
                @change="beginChange"
                style="width: 334px"
                value-format="timestamp"
                v-model="subForm.settingTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="设点时间："
              prop="value"
              v-if="$route.query.act == '2' || $route.query.act == 'a2'"
            >
              <el-time-picker
                @blur="beginDataChange"
                is-range
                v-model="value"
                value-format="timestamp"
                format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
              <!-- <el-time-picker v-model="subForm.settingTime" format = 'HH:mm' value-format = 'timestamp' placeholder="选择打卡时间"></el-time-picker> -->
            </el-form-item>
            <el-form-item
              label="简介："
              prop="synopsis"
              v-if="$route.query.act == '1' || $route.query.act == 'a1'"
            >
              <el-input
                style="width: 334px"
                v-model="subForm.synopsis"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="封面图片："
              prop="coverImg"
              v-if="$route.query.act == '1' || $route.query.act == 'a1'"
            >
              <el-upload
                class="avatar-uploader"
                :action="$api.uploadFileUrl"
                :show-file-list="false"
                name="upfile"
                :on-success="onUploadImgSuccessImg"
              >
                <img
                  v-if="subForm.coverImg"
                  :src="subForm.coverImg"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
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
  librarysLists,
  getTimetablespecialsGetPid,
  getTimeToDetermines,
  getTimeToDeterminePids,
} from "@/api/api";
export default {
  data() {
    return {
      dateEnd: {},
      value: [],
      subForm: {
        id: this.$route.query.id,
        pid: this.$route.query.pid,
        settingTime: "",
        finishTime: "",
        synopsis: "",
        libraryId: "",
        videoId: "",
        coverImg: "",
      },
      options: [],
      option: [],
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
        libraryId: [
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
        coverImg: [
          {
            required: true,
            message: "请上传图片",
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
    librarysLists().then((res) => {
      this.option = res.body;
    });
    if (this.$route.query.act == "1") {
      getTimetablespecialsGetPid({ id: this.$route.query.id }).then((res) => {
        this.subForm.settingTime = res.body.settingTime;
        this.subForm.synopsis = res.body.synopsis;
        this.subForm.libraryId = res.body.libraryId;
        this.subForm.coverImg = res.body.coverImg;
      });
    }
    if (this.$route.query.act == "2") {
      getTimetablespecialsGet({ id: this.$route.query.id }).then((res) => {
        // this.value[0] =Number( res.body.settingTime);
        // this.value[1] = Number(res.body.finishTime) ;
        this.subForm.videoId = res.body.videoId;
        this.subForm.libraryId = res.body.libraryId;
        this.$set(this.value, 0, res.body.settingTime);
        this.$set(this.value, 1, res.body.finishTime);
      });
    }
    if (this.$route.query.act == "a2") {
      this.$set(this.value, 0, this.$route.query.settingTime);
      this.$set(this.value, 1, this.$route.query.settingTime);
    }
  },
  methods: {
    onUploadImgSuccessImg(res, file) {
      this.subForm.coverImg = res.body;
      console.log();
    },

    beginDataChange(times) {
      getTimeToDetermines({
        settingTime: this.value[0],
        finishTime: this.value[1],
        pid: this.$route.query.pid,
      }).then((res) => {
        if (res.body == "1") {
          this.$message.error("这个时间段已经被占用了！");
          this.$set(this.value, 0, this.$route.query.settingTime);
          this.$set(this.value, 1, this.$route.query.settingTime);
        } else {
          this.subForm.settingTime = this.value[0];
          this.subForm.finishTime = this.value[1];
        }
      });
      // if (this.$route.query.id) {
      //   this.dateEnd = {
      //     disabledDate(time) {
      //       return time.getTime();
      //     },
      //   };
      // }
    },
    beginChange(times) {
      console.log("aa");
      getTimeToDeterminePids({ settingTime: this.subForm.settingTime }).then(
        (res) => {
          if (res.body == "1") {
            this.$message.error("这一天已经创建了！");
            this.subForm.settingTime = "";
          }
        }
      );
    },
    onBit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.subForm.settingTime <= this.subForm.finishTime) {
            this.$message({
              showClose: true,
              message: "结束时间不能小于或等于开始时间！",
              type: "error",
            });
            return
          }
          if (this.$route.query.id) {
            if (this.$route.query.act == "1") {
              timetablespecialsUpdate({
                id: this.$route.query.id,
                synopsis: this.subForm.synopsis,
                coverImg: this.subForm.coverImg,
              }).then((res) => {
                this.$message.success("修改成功");
                this.$router.back();
              });
            } else {
              timetablespecialsUpdate(this.subForm).then((res) => {
                this.$message.success("修改成功");
                this.$router.back();
              });
            }
          } else {
            if (this.$route.query.act == "a1") {
              timetablespecialsCreate({
                settingTime: this.subForm.settingTime,
                synopsis: this.subForm.synopsis,
                libraryId: this.subForm.libraryId,
                coverImg: this.subForm.coverImg,
              }).then((res) => {
                this.$message.success("新增成功");
                this.$router.back();
              });
            } else {
              timetablespecialsCreate(this.subForm).then((res) => {
                this.$message.success("新增成功");
                this.$router.back();
              });
            }
          }
        } else {
          this.$message.warning("请填写内容");
        }
      });
    },
  },
  // watch : {
  //       kilometers:function(val) {
  //           this.kilometers = val;
  //           this.meters = this.kilometers * 1000
  //       },
  //   }
};
</script>

<style lang="scss" scoped>
.right_cont {
  margin-top: 50px;
}
.fr {
  width: 500px;
}
.avatar {
  width: 200px;
}
</style>
