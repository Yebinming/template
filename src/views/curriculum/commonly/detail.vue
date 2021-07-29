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
            <el-form-item label="视频：" prop="videoId" v-if="$route.query.act=='2'|| !$route.query.act">
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
                      :value="item.id">
                      <span style="float: left">{{ item.videoName }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">({{ item.type=='VIDEO'?'视频':'广告' }})</span>
                    </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设点时间：" prop="settingTime" v-if="$route.query.act=='2'|| !$route.query.act">
              <el-date-picker
                value-format="timestamp"
                style="width: 334px"
                v-model="subForm.settingTime"
                type="datetime"
                placeholder="选择日期"
                :picker-options="dateEnd"
                @focus="beginDataChange"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="简介：" prop="synopsis" v-if="$route.query.act=='1'||!$route.query.act">
              <el-input
                style="width: 334px"
                v-model="subForm.synopsis"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="封面图片：" prop="coverImg"  v-if="$route.query.act == '1' ">
            <el-upload
              class="avatar-uploader"
              :action="$api.uploadFileUrl"
              :show-file-list="false"
              name="upfile"
              :on-success="onUploadImgSuccessImg"
            >
              <img v-if="subForm.coverImg" :src="subForm.coverImg" class="avatar" />
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
  timetableuniformsCreate,
  timetableuniformsUpdate,
  videosLists,
  timetableuniformsGet,
  timetableuniformsGetPid,
} from "@/api/api";
export default {
  data() {
    return {
    dateEnd:{},
      subForm: {
        settingTime: this.$route.query.settingTime,
        videoId: "",
        synopsis: "",
        coverImg: "",
        id: this.$route.query.id,
      },
      options: [],
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
    if (this.$route.query.act=='1') {
      timetableuniformsGetPid({ id: this.$route.query.id }).then((res) => {
        this.subForm.synopsis = res.body.synopsis;
      });
    }
    if (this.$route.query.act=='2') {
      timetableuniformsGet({ id: this.$route.query.id }).then((res) => {
        this.subForm.settingTime = res.body.settingTime;
        this.subForm.videoId = res.body.videoId;
        this.subForm.synopsis = res.body.synopsis;
      });
    }
  },
  methods: {
    onUploadImgSuccessImg(res, file) {
      this.subForm.coverImg = res.body;
      console.log();
    },
    beginDataChange (times) {
      if (this.$route.query.id) {
        this.dateEnd = {
          disabledDate(time) {
            return time.getTime();
          }
        }
      }
    },
    
    onBit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            if(this.$route.query.act=='1'){
              timetableuniformsUpdate({id:this.$route.query.id,synopsis:this.subForm.synopsis,coverImg:this.subForm.coverImg}).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
            }else{

              timetableuniformsUpdate(this.subForm).then((res) => {
                this.$message.success("修改成功");
                this.$router.back();
              });
            }
          } else {
            timetableuniformsCreate(this.subForm).then((res) => {
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

<style lang="scss" >
.right_cont {
  margin-top: 50px;
}
.fr {
  width: 500px;
}
.avatar{
  width: 200px;
}
</style>