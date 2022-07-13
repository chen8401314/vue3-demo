<template>
    <div class="test">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-input v-model="name" placeholder="请输入姓名" />
           </el-col>
            <el-col :span="10">
                <el-input v-model="adress" placeholder="请输入地址"/>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="1">
                <el-button type="primary" @click="greet">确定</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
      name: 'Test',
      data(){
          return{
              name:'',
              adress:''
          }
      },
      methods: {
          greet() {
              // `methods` 内部的 `this` 指向当前活动实例
              alert('test=:'+this.name)
          }
      }
  }
</script>
<style>
    .el-row {
        margin-bottom: 20px;
    }
    .el-row:last-child {
        margin-bottom: 0;
    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>


