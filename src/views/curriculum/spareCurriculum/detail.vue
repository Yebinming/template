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
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="视频简介" prop="synopsis">
              <el-input
                v-model="subForm.synopsis"
                placeholder="请输入"
                style="width: 334px"
              />
            </el-form-item>

            <el-form-item label="视频：" prop="videoId">
              <el-select style="width: 334px" v-model="subForm.videoId">
                <!-- <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.videoName"
                  :value="item.id"
                >
                </el-option> -->
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
            <el-form-item label="封面图片：" prop="coverImg">
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
import {
  TimetableBackupsCreate,
  videosLists,
  TimetableBackupsDelete,
  TimetableBackupsDetail,
  TimetableBackupslList,
  TimetableBackupslUpdate,
} from "@/api/api";
export default {
  data() {
    return {
      fileList: [],
      options: [],
      ban: false,
      subForm: {
        videoId: "",
        synopsis: "",
        coverImg: "",
      },
      subRules: {
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
        coverImg: [
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
    if (this.$route.query.id) {
      this.ban = true;
      TimetableBackupsDetail({ id: this.$route.query.id }).then((res) => {
        this.subForm = res.body;
        this.fileList = [
          {
            status: "success",
            name: res.body.videoName,
            size: "175397",
            percentage: "100",
            raw: {
              type: res.body.type,
            },
            response: {
              state: "SUCCESS",
              url: res.body.videoAddresses,
              title: null,
              original: null,
            },
          },
        ];
      });
    }
  },
  methods: {
    handleChange(file, fileList) {
      //   console.log(JSON.stringify(fileList));
      this.fileList = fileList;
    },
    onUploadImgSuccessImg(res, file) {
      this.subForm.coverImg = res.body;
      console.log();
    },
    getCaption(obj) {
      var index = obj.lastIndexOf(".");
      obj = obj.substring(0, index + 1);
      //  console.log(obj);
      return obj;
    },
    beforeAvatarAUDIO(file) {
      this.subForm.videoName = this.getCaption(file.name);
      let _this = this;
      let url = URL.createObjectURL(file);
      var audioElement = new Audio(url);
      audioElement.addEventListener("loadedmetadata", function () {
        let playTime = audioElement.duration; //playTime就是当前视频长度
        console.log(playTime);
        _this.subForm.videoTokinaga = Math.round(playTime);
      });
    },

    beforeRemove(file, fileList) {
      console.log(file);
      //  console.log(fileList)
      this.fileList = fileList;

      return;
    },
    onBit(formName) {
  

      //   this.subForm.videoTokinaga = this.fileList[0].size;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.subForm.id) {
            TimetableBackupslUpdate(this.subForm).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            TimetableBackupsCreate(this.subForm).then((res) => {
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
.avatar {
  width: 200px;
}

</style>