<template>
  <div class="manage">
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户表单信息 -->
      <el-form ref="form" :model="form" :rules="rules" :inline='true' label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
            v-model="form.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">
        +新增
      </el-button>
      <el-form :model="userForm" :inline="true">
        <el-form-item prop="name">
          <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" height="90%" style="width: 100%;" :stripe="true">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" :hide-on-single-page="true"
          @current-change="handlePage" :page-size="pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, deleteUser } from '../api/index'
export default {
  name: 'page_user',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入住址', trigger: 'blur' }
        ],
      },
      tableData: [],
      modalType: 0, // 0为新增，1为修改
      total: 0, // 当前数据总条数
      pageSize: 10,
      pageIndex: 1,
      userForm: {
        name: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    submit() {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('submit!', this.form);
          let form = this.form
          if (this.modalType === 0) {
            addUser(form).then(() => {
              this.handleClose()
              this.dialogVisible = false
              this.getList()
            })
          } else {
            editUser(form).then(() => {
              this.handleClose()
              this.dialogVisible = false
              this.getList()
            })
          }
        } else {
          console.log('error');
          return false
        }
      })
    },
    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    // 获取数据列表
    getList() {
      getUser({
        params: {
          page: this.pageIndex,
          limit: this.pageSize,
          name: this.userForm.name
        }
      }).then(({ data }) => {
        console.log(data)
        // this.tableData = data.list.map(item => {
        //   item.sexLabel = item.sex == 0 ? '女' : '男'
        //   return item
        // })
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    handleEdit(index, item) {
      console.log('修改', index, item)
      this.modalType = 1
      this.dialogVisible = true
      // 简单的深拷贝，只能拷贝只有一层的对象
      this.form = JSON.parse(JSON.stringify(item))
    },
    handleDelete(index, item) {
      console.log('删除', index, item)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: item.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handlePage(val) {
      console.log(val);
      this.pageIndex = val
      this.getList()
    },
    search () {
      this.getList()
    },
  }
}
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
  
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>