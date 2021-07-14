<template>
  <div class="app-container">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form_box">
          <el-form-item label="旧密码" prop="oldPwd">
                <el-input type="password" v-model="ruleForm.oldPwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
                <el-input type="password" v-model="ruleForm.confirmPwd" clearable></el-input>
          </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
               <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
     </el-form>
  </div>
</template>
<script>
// import {
//   updatePwd
// } from "@/api/setting";
import { mycenterUpdatePwd } from '@/api/api';
import { sha256_digest } from '@/utils';
export default {
  data() {
     const validateOldPwd = (rule, value, callback) => {
          if (value === '') {
               callback(new Error('请输入旧密码'));
           } else if(value.length < 6) {
               callback(new Error('长度不小于6位'));
          } else {
               callback();
          }
    };
     var validatePass = (rule, value, callback) => {
          if (value === '') {
               callback(new Error('请输入新密码'));
          } else if(value.length < 6) {
               callback(new Error('长度不小于6位'));
          }  else {
               if (this.ruleForm.confirmPwd !== '') {
                    this.$refs.ruleForm.validateField('confirmPwd');
               }
               callback();
          }
     };
     var validatePass2 = (rule, value, callback) => {
          if (value === '') {
               callback(new Error('请再次输入密码'));
          } else if(value.length < 6) {
               callback(new Error('长度不小于6位'));
          } else if (value !== this.ruleForm.pwd) {
               callback(new Error('两次输入密码不一致!'));
          } else {
               callback();
          }
     };
     return {
          ruleForm: {
               oldPwd: '',
               pwd: '',
               confirmPwd: ''
          },
          rules: {
               oldPwd: [{ validator: validateOldPwd, required: true, trigger: "blur" }],
               pwd: [ { validator: validatePass,required: true, trigger: 'blur' }],
               confirmPwd: [{ validator: validatePass2, required: true,trigger: 'change' }],
          }
     };
    },
    methods: {
     submitForm(formName) {
          this.$refs[formName].validate((valid) => {
               if (valid) {
                    let obj = JSON.parse(JSON.stringify(this.ruleForm))
                    Object.keys(obj).forEach((i)=>{
                         obj[i] = sha256_digest(obj[i])
                    })
                    mycenterUpdatePwd(obj).then(res=>{
                         if(res.errorCode == 0 ){
                              this.$message.success("修改密码成功")
                         }
                    })
               } else {
                    console.log('error submit!!');
                    return false;
               }
          });
     },
     resetForm(formName) {
        this.$refs[formName].resetFields();
     }
    }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.form_box {
  max-width: 800px;
  margin: 0 auto;
}
</style>
