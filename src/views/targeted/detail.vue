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
            <el-form-item label="学校名称：" prop="name">
              <el-input v-model="subForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="学校类型：" prop="type">
              <el-select
                v-model="subForm.type"
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
            <el-form-item label="时间：" prop="createdYear">
              <el-date-picker
              style="width:100%"
                v-model="subForm.createdYear"
                type="year"
                placeholder="选择年"
              >
              </el-date-picker>
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
  targetedUpdate,
  targetedDetail,
  addTargetedType,
  addFirstTargeted,
} from "@/api/api";
export default {
  data() {
    return {
      options: [
        {
          value: "PRIMARY_SCHOOL",
          label: "小学",
        },
        {
          value: "JUNIOR_HIGH_SCHOOL",
          label: "初中",
        },
        {
          value: "SENIOR_HIGH_SCHOOL",
          label: "高中",
        },
        {
          value: "NINE_YEAR_SCHOOL",
          label: "九年一贯学校",
        },
      ],
      subForm: {
        name: "",
        type: "",
        createdYear: "",
      },
      subRules: {
        name: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"],
          },
        ],
        createdYear: [
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
      },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      targetedDetail({ id: this.$route.query.id }).then((res) => {
        this.subForm = res.body;
      });
    }
  },
  methods: {
    onBit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          targetedUpdate(this.subForm).then((res) => {
            this.$message.success("修改成功");
            this.$router.back();
          });
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