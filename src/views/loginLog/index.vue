<template>
  <div class="app-container">
    <el-header>
        <div class="search">
        <span class="font">用户：</span>
        <el-select clearable size='mini' v-model="page.userid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>

        <el-button class="btn" size='mini' type="primary" @click="fetchData('act')"
          >搜索</el-button
        >
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
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{ scope.row.systemTime | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.user.userName }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <el-image 
            style="width: 100px; height: 100px"
            :src="scope.row.user.headerImg" 
            :preview-src-list="[scope.row.user.headerImg]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.user.logAddresses }}
        </template>
      </el-table-column>
      <el-table-column label="修改记录">
        <template slot-scope="scope">
          {{ scope.row.behavior }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button  size="small"  @click="$router.push({path: 'loginLog/detail', query: { id: scope.row.id } })">
             查看
          </el-button> -->
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
      <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
   >
    <span>{{log}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
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
import {systemLgos,
systemLgosDel,UserAlllist} from '@/api/api';
export default {
  data() {
    return {
      options:[],
      listLoading: true,  
      dialogVisible: false,
      log:'',
      list: [],
      page: {
        pageNum: 0,
        pageSize: 10,
        totalCount: 0,
        userid:''
      },
    };
  },
  created() {
    this.fetchData();
    UserAlllist().then(res=>{
      this.options=res.body
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.page.pageNum = --val;
      this.fetchData();
    },
    onDelete(id) {
      systemLgosDel({ id }).then((res) => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
   
    getCaption(obj){
        var index=obj.indexOf("\,");
        obj=obj.substring(index+1,obj.length);
    //  console.log(obj);
        return obj;
    },
 
    fetchData() {
      this.listLoading = true;
      systemLgos(this.page).then((res) => {
        this.page.totalCount = res.body.totalCount;
        this.listLoading = false;
        this.list = res.body.rows;
        // this.list.map((v,i)=>{
        //   return this.list[i].log=this.getCaption(v.log)
        //     console.log( this.getCaption(v.log));
        // })
      });
    },
    
  },

};
</script>
<style scoped>
 .el-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  display: flex;
  align-items: center;
  height: 28px;
  margin: auto 0 auto 20px;
}
.search {
  display: flex;
  line-height: 30px;
}
</style>