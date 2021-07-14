<template>
  <div class="app-container">
    <el-header>
      <div class="search">
        <span class="font">学校名称：</span>
        <el-input
          placeholder="请输入内容"
          v-model="page.name"
          style="width: 160px"
          size="mini"
          clearable
        >
        </el-input>
        <span class="font" style="margin-left: 20px">年份：</span>
        <el-date-picker
         v-model="page.createdYear"
          size="mini"
          style="width: 160px"
          type="year"
          placeholder="选择年">
    </el-date-picker>
        <span class="font" style="margin-left: 20px">学校类型：</span>
        <el-select
          clearable
          v-model="page.type"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          class="btns"
          size="mini"
          type="primary"
          @click="fetchData('act')"
          >搜索</el-button
        >
      </div>
      <div class="topright flex flex-x-end">
        <el-button
          type="primary"
          style="width: 114px"
          @click="$router.push({ path: 'targeted/detail' })"
        >
          添加
        </el-button>
      </div>
    </el-header>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        width="80"
      >
      </el-table-column>
      <el-table-column label="学校名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="年份">
        <template slot-scope="scope">
          {{ scope.row.createdYear }}
        </template>
      </el-table-column>
      <el-table-column label="学校类型">
        <template slot-scope="scope">
          {{
            scope.row.type == "PRIMARY_SCHOOL"
              ? "小学"
              : scope.row.type == "JUNIOR_HIGH_SCHOOL"
              ? "初中"
              : scope.row.type == "SENIOR_HIGH_SCHOOL"
              ? "高中"
              : "九年一贯学校"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            class="mr20 mb10"
            type="primary"
            @click="
              $router.push({
                path: 'targeted/detail',
                query: {
                  id: scope.row.id,
                },
              })
            "
          >
            修改
          </el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="不用了"
            title="确定删除吗？"
            @onConfirm="onDelete(scope.row.id)"
          >
            <el-button slot="reference" size="small" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20 flex flex-x-center">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        layout=" prev, pager, next "
        :total="page.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  targetedList,
  targetedUpdate,
  targetedDetail,
  targetedDel,
  addTargetedType,
  addFirstTargeted,
} from "@/api/api";
export default {
  data() {
    return {
      list: [],
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
      page: {
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
        name: "",
        type: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(val) {
      this.page.pageNum = --val;
      this.fetchData();
    },
    indexMethod(index) {
      return index + 1 + this.page.pageNum * this.page.pageSize;
    },
    onDelete(id) {
      targetedDel({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    fetchData() {
      if(this.page.createdYear){
        this.page.createdYear = new Date(this.page.createdYear).getTime();
        console.log(this.page.createdYear);
      }
      targetedList(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.list = res.body.rows;
      });
    },
  },
};
</script>
<style  scoped>
.topright {
  line-height: 60px;
}
.el-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.font {
  font-size: 14px;
}
.btns {
  margin-left: 20px;
}
</style>