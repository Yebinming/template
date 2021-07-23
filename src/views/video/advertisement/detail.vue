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
            <el-form-item label="请上传视频：">
              <el-upload
                accept=".mp3 ,.mp4 "
                class="upload-demo"
                :action="$api.uploadimage"
                :limit="1"
                multiple
                :on-change="handleChange"
                name="upfile"
                :file-list="fileList"
                :before-remove="beforeRemove"
                :before-upload="beforeAvatarAUDIO"
              >
                <el-button  size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>

            <!-- <el-form-item label="名称" prop="title">
              <el-input v-model="subForm.videoName" placeholder="请输入" />
            </el-form-item>
      
            <el-form-item label="地址：" prop="videoAddresses">
              <el-input
                type="number"
                v-model.number="subForm.videoAddresses"
                placeholder="请输入"
              />
            </el-form-item> -->
            <el-form-item label="时长：" prop="videoTokinaga">
              <el-input
                disabled
                v-model.number="subForm.videoTokinaga"
                placeholder="请输入"
              />
            </el-form-item>
           
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="subForm.remarks" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
              <el-input v-model="subForm.introduction" placeholder="请输入" />
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
import { videosCreate, videosUpdate, videosDetail } from "@/api/api";
export default {
  data() {
    return {
      fileList: [],
      ban:false,
      subForm: {
        videoName: "",
        videoAddresses: "",
        videoTokinaga: "",
        type: "ADVERT",
        remarks: "",
        introduction: "",
      },
      subRules: {
        videoName: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        fileList: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        videoAddresses: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        videoTokinaga: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        type: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        remarks: [
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
        this.ban=true
      videosDetail({ id: this.$route.query.id }).then((res) => {
        this.subForm = res.body;
        this.fileList 
       = [{
            'status': "success",
            'name': res.body.videoName,
            'size': "175397",
            'percentage': "100",
            'raw': {
              'type': res.body.type,
            },
            'response': {
              'state': "SUCCESS",
              'url': res.body.videoAddresses,
              'title': null,
              'original': null,
            },
          }];
       
      });
    }
  },
  methods: {
    handleChange(file, fileList) {
      //   console.log(JSON.stringify(fileList));
      this.fileList = fileList;
    },
    beforeAvatarAUDIO(file){
    let _this=this
　　let url = URL.createObjectURL(file)
    var audioElement = new Audio(url)
    audioElement.addEventListener('loadedmetadata',function(){
　　let playTime = audioElement.duration; //playTime就是当前视频长度
    console.log(playTime);
   _this.subForm.videoTokinaga= Math.round(playTime)
   })
},

    beforeRemove(file, fileList) {
      console.log(file);
      //  console.log(fileList)
      this.fileList = fileList;

      return;
    },
    onBit(formName) {
        if(this.fileList.length>0){
            this.subForm.videoName = this.fileList[0].name;
            this.subForm.videoAddresses = this.fileList[0].response.url;
        }else{
        this.$message({
          message: '还没上传视频哦',
          type: 'warning'
        });
        }
      
    //   this.subForm.videoTokinaga = this.fileList[0].size;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.subForm.id) {
            videosUpdate(this.subForm).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            videosCreate(this.subForm).then((res) => {
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