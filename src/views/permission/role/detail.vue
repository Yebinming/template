<template>
  <div class="app-container narrow">
    <el-form ref="regForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入角色名称"
          style="width: 20%"
        />
      </el-form-item>
      <el-form-item prop="permission" label="权限">
        <!-- <el-transfer :titles="['未添加','已添加']" v-model="form.permission" :data="list"></el-transfer> -->
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="list"
          :props="defaultProps"
          show-checkbox
          node-key="code"
          class="permission-tree"
          :expand-on-click-node="false"
          @check-change="handleCheckChange"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span @click="() => editShow(data)">{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => appendShow(data)"
              >
                append
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
        <el-button type="primary" class="mt20" size="mini" @click="appendShow"
          >添加菜单</el-button
        >
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
    <el-dialog title="编辑权限" :visible.sync="permission.visible" width="30%">
      <el-form
        :model="permission"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="code">
          <el-input v-model="permission.code"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="permission.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="permission.visible = false">Cancel</el-button>
        <el-button type="primary" @click="exec">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  adminuserCreate,
  adminuserDisable,
  adminuserGet,
  adminuserUpdate,
  getPermissionList,
  permissionDel,
  roleCreate,
  roleGet,
  roleList,
  roleUpdate,
} from "@/api/permission";
import { permissionAdd, permissionUpdate } from "@/api/api";
export default {
  data() {
    return {
      permission: {
        visible: false,
        mode: 'add',
        code: "",
        name: "",
        pId: "",
        id: 0,
      },
      defaultProps: {
        children: "list",
        label: "name",
      },
      routesData: [],
      checkStrictly: false,
      list: [],
      form: {
        role: [{ code: "" }],
        permission: [],
      },
      page: {
        page: 0,
        limit: 50,
        totalCount: 0,
      },
      placeholder: this.$route.query.id ? "●●●●●●" : "请输入密码",
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"],
          },
        ],
        loginPhone: [
          {
            required: true,
            message: "请输入登录名",
            trigger: ["blur", "change"],
          },
        ],
        permission: [
          {
            required: true,
            message: "请添加权限",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请选择密码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.rules.password = null;
      delete this.rules.password;
      roleGet({ id: this.$route.query.id }).then((res) => {
        this.form = res.body;
        this.$refs.tree.setCheckedKeys(res.body.permission);
      });
    }
    this.fetchData();
  },

  methods: {
    editShow(data) {
      this.permission.mode = 'edit'
      this.permission.code = data.code;
      this.permission.name = data.name;
      this.permission.pId = data.pid;
      this.permission.id = data.id;
      this.permission.visible = true;
    },
    exec() {        
      if(this.permission.mode == 'add'){
        permissionAdd(this.permission).then((res) => {
            let parent = this.getNode(this.list, res.body.pid);
            if (parent) {
              if (!parent.list) {
                this.$set(parent, "list", []);
              }
              parent.list.push(res.body);
            } else {
              this.list.push(res.body);
            }
            this.permission.visible = false;
          })
      }else{
          console.log('aa');
          console.log(this.permission);
          delete this.permission.pId
          console.log(this.permission);
          permissionUpdate(this.permission).then((res) => {
            let data = this.getNode(this.list, res.body.id);
            data = Object.assign(data, res.body);
            this.permission.visible = false;
          });
      }

    },
    appendShow(data) {
      this.permission.mode = 'add'
      this.getMaxId()
      this.permission.code = "";
      this.permission.name = "";
      this.permission.pId = data.id || "";
      this.permission.visible = true;
    },

    remove(node, data) {
      let o = Object.assign({}, data, { pId: 0 });
      delete o.list;
      delete o.pid;
      permissionUpdate(o).then((res) => {
        const parent = node.parent;
        const list = parent.data.list || parent.data;
        const index = list.findIndex((d) => d.id === data.id);
        list.splice(index, 1);
      });
    },

    change(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    fetchData() {
      getPermissionList(this.page).then((res) => {
        this.list = res.body;
      });
    },
    getMaxId() {
      let resList = []
      function preOrder(list, resList) {
        for (let i = 0; i < list.length; i++) {
          let o = Object.assign({}, list[i]);
          delete o.list;
          // debugger
          resList.push(o);
          if (list[i].list) {
            preOrder(list[i].list, resList);
          }
        }
      }
      preOrder(this.list, resList);
      this.permission.id = resList.reduce((max, cur) => {
        if (cur.id > max) return cur.id;
        return max;
      }, 0);
      this.permission.id++;
    },
    handleCheckChange(data, checked, indeterminate) {
      //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let res = this.$refs.tree.getCheckedNodes(true, true);
      this.form.permission = res.map((v) => v.code);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            roleUpdate(this.form).then((res) => {
              this.$message.success("修改成功");
              this.$router.back();
            });
          } else {
            roleCreate(this.form).then((res) => {
              this.$message.success("添加成功");
              this.$router.back();
            });
          }
        } else {
          this.$message.warning("请填写内容");
        }
      });
    },
    getNode(list, targetId) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == targetId) {
          return list[i];
        }
        if (list[i].list) {
          let flag = this.getNode(list[i].list, targetId);
          if (flag != null) {
            return flag;
          }
        }
      }
      return null;
    },
  },
};
</script>
<style scoped>
.el-form-item__label {
  text-align: left;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>