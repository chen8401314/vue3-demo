<template>
    <el-table :data="datas">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="sex" label="性别" width="180" />
        <el-table-column prop="department" label="部门" />
    </el-table>
   <el-pagination
            v-model:currentPage="pages"
            v-model:page-size="size"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :hide-on-single-page="false"
            @size-change="handleSizeChange"
            :total="total"
            @current-change="handleCurrentChange">
    </el-pagination>
</template>

<script>
    //import axios from 'axios';
    import {testList} from "../common/api.js";
    export default {
        name: 'List',
        data(){
            return{
                pages:1,
                size:10,
                total:0,
                datas:[]
            }
        },
       methods: {
            //点击第几页
           handleCurrentChange(pages) {
                this.pages = pages;
                this.getData();
                console.log(this.pages);
            },
            handleSizeChange(size) {
                this.size = size;
                this.getData();
                console.log(this.size);
            },
           async getData() {
              const data  =  await testList({pages: this.pages, size: this.size});
               this.datas=data.records;
               this.pages =data.current;
               this.size = data.size;
               this.total = data.total;
               /*       axios.defaults.withCredentials = true;
                      axios
                          .get('http://localhost:8069/test/anon/findPage?pages='+this.pages+'&size='+this.size).then((res) => {
                              if(res.data.code=='500101'){
                                  this.$router.push({ path: '/login' })
                              }else{
                                  //用axios的方法引入地址
                                  this.datas=res.data.data.records;
                                  this.pages = res.data.data.current;
                                  this.size = res.data.data.size;
                                  this.total = res.data.data.total;
                                  //赋值
                                  console.log(res.data.data);
                              }
      */
                }
            },
        mounted(){
            this.getData();
        }
    }
</script>
<style>
</style>


