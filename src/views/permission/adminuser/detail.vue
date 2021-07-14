<template>
  <div class="app-container narrow">
    <el-form ref="regForm" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="名称" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="登录名" prop="loginPhone">
        <el-input v-model="form.loginPhone" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :placeholder="placeholder" />
      </el-form-item>
      <el-form-item label="角色" prop="role[0].code">
        <el-select v-model="form.role[0].code" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <div class="fr">
          <el-button @click="$router.back()"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit('regForm')">
            保存
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  adminuserCreate,
  adminuserDisable,
  adminuserGet,
  adminuserUpdate,
  roleList,
} from "@/api/permission";
import { funDifference } from '@/utils';
import { validUsername } from "@/utils/validate";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("不能输入中文字符"));
      } else {
        callback();
      }
    };
    return {
      defaultForm: {},
      list: [],
      form: {
        role: [{ code: "", }],
         schoolId: ""
      },
      page: {
        page: 0,
        limit: 50,
        totalCount: 0,
      },
      placeholder: this.$route.query.id ? "●●●●●●" : "请输入密码",
      rules: {
        userName: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"],
          },
        ],
        loginPhone: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          {
            required: true,
            message: "请选择密码",
            trigger: ["blur", "change"],
          },
        ],
        // "role[0].code": [
        //   {
        //     required: true,
        //     message: "请选择角色",
        //     trigger: ["blur", "change"],
        //   },
        // ],
      },
      schoolList: []
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.rules.password = null;
      delete this.rules.password;
      adminuserGet({ id: this.$route.query.id }).then((res) => {
        this.form = res.body;
        this.form.role.length || (this.form.role[0] = { code: "" });
        this.defaultForm = JSON.parse(JSON.stringify(res.body));
      });
    }
    this.fetchData();
  },

  methods: {
    fetchData() {
      // this.listLoading = true;
      roleList(this.page).then((res) => {
        // this.listLoading = false;
        this.list = res.body.rows;
      });
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            let diff = funDifference(this.form, this.defaultForm); //只更新修改的部分
            adminuserUpdate({
              id: this.form.id,
              userName: this.form.userName,
              ...diff,
            }).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            adminuserCreate(this.form).then((res) => {
              this.$message.success("添加成功");
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