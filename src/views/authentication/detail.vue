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
      <el-form ref="regsForm" :model="subForm" label-width="180px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="名称：" prop="authenticationName">
              <el-input
                disabled
                v-model="subForm.authenticationName"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="手机号：" prop="authenticationPhone">
              <el-input
                disabled
                v-model="subForm.authenticationPhone"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="职称：" prop="authenticationSchoolName">
              <el-input
                disabled
                v-model="subForm.authenticationSchoolName"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="所属学校：" prop="authenticationTitle">
              <el-input
                disabled
                v-model="subForm.authenticationTitle"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="审核状态：" prop="authenticationStatus">
              <el-select
                disabled
                v-model="subForm.authenticationStatus"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
             </el-col>
        </el-row>
           <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="请审核：" prop="status">
              <el-radio-group v-model="status">
                <el-radio :label="true">通过</el-radio>
                <el-radio :label="false">不通过</el-radio> </el-radio-group
              >
            </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item>
              <div class="fr">
                <el-button class="fr" type="primary" @click="onBit()">
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
  authenticationschoolAudit,
  authenticationschoolDetail,
  authenticationschoolList,
} from "@/api/api";
export default {
  data() {
    return {
        status:true,
        id:this.$route.query.id,
      // NOAUDIT(未审核),AUDIT(审核中),FIAL(失败),SUCCESS(成功),COMPLETE(完成)
      options: [
        {
          value: "NOAUDIT",
          label: "未审核",
        },
        {
          value: "AUDIT",
          label: "审核中",
        },
        {
          value: "FIAL",
          label: "失败",
        },
        {
          value: "SUCCESS",
          label: "成功",
        },
        {
          value: "COMPLETE",
          label: "完成",
        },
      ],
      subForm: {
        name: "",
        principalName: "",
        principalPhone: "",
        studentsNumber: "",
        teacherNumber: "",
        type: "",
        introduce: "",
      },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      authenticationschoolDetail({ id: this.$route.query.id }).then((res) => {
        this.subForm = res.body;
      });
    }
  },
  methods: {
    onBit() {
        
          authenticationschoolAudit({id:this.id,status:this.status}).then((res) => {
            this.$message.success("审核完成");
            this.$router.back();
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