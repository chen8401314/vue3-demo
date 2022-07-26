<template>
    <el-input
            v-model="searchKey"
            style="width:300px;height:30px"
            placeholder="请输入姓名搜索"

    >
        <template #append>
            <el-button @click="getData();">
                <el-icon style="vertical-align: middle">
                    <Search/>
                </el-icon>
            </el-button>
        </template>
    </el-input>
    <el-button type="primary" @click="addTest(); handleClick($event);"
               style="margin-left: 20px;width:60px;height:30px;">
        新增
    </el-button>
    <el-table :data="datas" style="margin-top:20px;">
        <el-table-column prop="name" label="姓名" width="180"/>
        <el-table-column prop="sex" label="性别" width="180"/>
        <el-table-column prop="department" label="部门" width="180"/>
        <el-table-column prop="birthday" label="生日" width="180"/>
        <el-table-column prop="address" label="家庭住址" width="180"/>
        <el-table-column prop="status.msg" label="状态"/>
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
    <el-dialog
            v-model="dialogVisible"
            title="新增用户"
            width="30%"
    >
        <el-form :model="formData" label-width="120px" :rules="rules" ref="form">
            <el-form-item label="姓名"
                          prop="name">
                <el-input v-model="formData.name"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="formData.sex">
                    <el-radio label="男"/>
                    <el-radio label="女"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否结婚">
                <el-radio-group v-model="formData.isMarry">
                    <el-radio label="false">否</el-radio>
                    <el-radio label="true">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="部门" prop="department">
                <el-input v-model="formData.department"/>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input type="number" v-model="formData.age"/>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker
                        v-model="formData.birthday"
                        type="date"
                />
            </el-form-item>
            <el-form-item label="家庭住址" prop="homeAddress">
                <el-input v-model="formData.homeAddress"/>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false;">取消</el-button>
        <el-button type="primary" @click="save()"
        >保存</el-button
        >
      </span>
        </template>
    </el-dialog>
</template>

<script>
    import {testList} from "../common/api.js";
    import {save} from "../common/api.js";

    export default {
        name: 'List',
        data() {
            return {
                formData: {sex: '男', isMarry: 'false',birthday: ''},
                dialogVisible: false,
                searchKey: '',
                pages: 1,
                size: 10,
                total: 0,
                datas: [],
                rules: {
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'},
                        {min: 2, max: 10, message: '字符长度2-10', trigger: 'blur'},
                    ],
                    department: [
                        {required: true, message: '请填写部门', trigger: 'blur'},
                        {min: 1, max: 30, message: '字符长度1-30', trigger: 'blur'},
                    ]
                }
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
            addTest() {
                this.dialogVisible = true;
                if (this.$refs.form) {
                    this.$refs.form.resetFields();
                }
            },
            handleClick(e) {
                let target = e.target;
                if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
                    target = e.target.parentNode;
                }
                target.blur();
            }, save() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        console.log("form", this.formData);
                        console.log("form1", this.formData.Target);
                        let data = JSON.parse(JSON.stringify(this.formData));
                        console.log("form2", data);
                        await save(data);
                        this.dialogVisible = false;
                        this.getData();

                    }
                })
            },
            async getData() {
                const data = await testList({pages: this.pages, size: this.size, name: this.searchKey});
                this.datas = data.records;
                this.pages = data.current;
                this.size = data.size;
                this.total = data.total;
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
<style>
</style>


