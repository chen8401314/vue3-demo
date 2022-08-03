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
    <el-table :data="datas" style="margin-top:20px;" v-loading="loading" border height="auto">
        <el-table-column prop="id" label="ID" v-if="false"/>
        <el-table-column type="index" label="序号" width="80"/>
        <el-table-column prop="name" label="姓名" width="180"/>
        <el-table-column prop="sex" label="性别" width="180"/>
        <el-table-column prop="department" label="部门" width="180"/>
        <el-table-column prop="birthday" label="生日" width="180"/>
        <el-table-column label="是否结婚">
            <template #default="scope">
                <el-switch v-model="scope.row.isMarry" @change="updateIsMarry(scope.row)"/>
            </template>
        </el-table-column>
        <el-table-column prop="homeAddress" label="家庭住址" width="360"/>
        <el-table-column label="状态">
            <template #default="scope">
                <el-switch v-model="scope.row.status.value"
                           :active-value="1"
                           :inactive-value="0"
                           @change="updateStatus(scope.row)"
                />
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
                <el-button @click="dialogTitle='查看';formDisabled=true;handleSearch(scope.$index, scope.row);" circle>
                    <el-icon style="vertical-align: middle">
                        <Search/>
                    </el-icon>
                </el-button>
                <el-button type="primary"
                           @click="dialogTitle='编辑';formDisabled=false;handleSearch(scope.$index, scope.row);" circle>
                    <el-icon style="vertical-align: middle">
                        <Edit/>
                    </el-icon>
                </el-button>

                <el-popconfirm title="确定要删除吗?" @confirm="delTest(scope.$index, scope.row);">
                    <template #reference>
                        <el-button type="danger" circle>
                            <el-icon style="vertical-align: middle">
                                <Delete/>
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>

            </template>
        </el-table-column>
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
            :title="dialogTitle+'用户'"
            width="30%"
    >
        <el-form :disabled="formDisabled" :model="formData" label-width="120px" :rules="rules"
                 ref="form">
            <el-form-item v-if="false" label="ID" type="hidden" prop="id">
                <el-input v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"/>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="formData.sex">
                    <el-radio label="男"/>
                    <el-radio label="女"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否结婚" prop="isMarry">
                <el-radio-group v-model="formData.isMarry">
                    <el-radio :label="false">否</el-radio>
                    <el-radio :label="true">是</el-radio>
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

            <el-form-item label="头像" prop="photo">
                <el-upload
                        class="avatar-uploader"
                        :action="baseApiUrl+'minio/anon/uploadFile'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                >
                    <div style="display:inline-block;position:relative" v-if="formData.photo">
                        <img :src="baseFileUrl+formData.photo" class="avatar"/>
                    </div>
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus/>
                    </el-icon>
                </el-upload>
                <button v-if="formData.photo && !this.formDisabled" style="position:absolute;top:0;left:186px;"
                        @click="removePhoto()">
                    <el-icon>
                        <Delete/>
                    </el-icon>
                </button>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer" v-if="!formDisabled">
        <el-button @click="dialogVisible = false;">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script>
    import {save, findById, testList, delById, baseFileUrl, baseApiUrl} from "../common/api.js";

    const initFormData = {id: '', name: '', department: '', sex: '男', isMarry: false, birthday: '', photo: ''};
    export default {
        name: 'List',
        data() {
            return {
                formData: {...initFormData},
                baseFileUrl: baseFileUrl,
                baseApiUrl: baseApiUrl,
                dialogVisible: false,
                dialogTitle: '新增',
                searchKey: '',
                formDisabled: false,
                pages: 1,
                size: 10,
                total: 0,
                loading: false,
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
            async handleSearch(index, row) {
                let data = await findById({id: row.id});
                this.formData = data;
                this.dialogVisible = true;
            },
            async updateIsMarry(row) {
                await save({id: row.id, isMarry: row.isMarry});
                this.$message.success("操作成功");
            },
            async updateStatus(row) {
                await save({id: row.id, status: row.status.value});
                this.$message.success("操作成功");
            },
            handleAvatarSuccess(res, uploadFile) {
                this.formData.photo = res.data.filePath;
            },
            removePhoto() {
                this.formData.photo = '';
            },
            addTest() {
                this.formDisabled = false;
                this.formData = {...initFormData};
                this.dialogVisible = true;
            },
            async delTest(index, row) {
                await delById({id: row.id});
                this.getData();
                this.$message.success("操作成功");
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
                        let  data = {
                            ...this.formData
                        }
                        await save(data);
                        this.dialogVisible = false;
                        this.formData = initFormData;
                        this.getData();
                        this.$message.success("操作成功");
                    }
                })
            },
            async getData() {
                this.loading = true;
                const data = await testList({pages: this.pages, size: this.size, name: this.searchKey});
                this.datas = data.records;
                this.pages = data.current;
                this.size = data.size;
                this.total = data.total;
                this.loading = false;
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
<style>
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>


