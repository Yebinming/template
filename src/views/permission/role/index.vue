<template>
  <div class="app-container">
    <el-header>
      <div class="topright flex flex-x-end">
        <el-button type="primary" style="width: 114px" @click="$router.push({ path:$route.path + '/detail'})">
          添加
        </el-button>
      </div>
    </el-header>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdTime | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button    type="primary" size="small" @click="$router.push({ path:$route.path + '/detail', query: { id: scope.row.id } })">
             修改
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="不用了"
            title="确定删除吗？"
            @onConfirm="onDelete(scope.row.id)"
          >
            <el-button slot="reference" class="ml10" size="small" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleList, roleDelete } from '@/api/permission';
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      page: {
        page: 0,
        limit: 50,
        totalCount: 0,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onDelete(id) {
      roleDelete({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    fetchData() {
      this.listLoading = true;
      roleList(this.page).then((res) => {
        this.listLoading = false;
        this.list = res.body.rows;
      });
    },
  },
};
</script>