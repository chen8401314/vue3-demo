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
                        :disabled="formDisabled"
                >
                    <div style="display:inline-block;position:relative" v-if="formData.photo">
                        <img :src="baseFileUrl+formData.photo" class="avatar"/>
                    </div>
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus/>
                    </el-icon>
                </el-upload>
                <button v-if="formData.photo && !formDisabled" style="position:absolute;top:0;left:186px;"
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
        <el-button type="primary" @click="saveTest(form)">保存</el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import {save, findById, testList, delById, baseFileUrl, baseApiUrl,successMsg} from "../common/api.js";
    import {ref, onMounted} from "vue"
    import {ElMessage} from 'element-plus'

    const initFormData = {id: '', name: '', department: '', sex: '男', isMarry: false, birthday: '', photo: ''};
    const formData = ref({...initFormData})
    const dialogVisible = ref(false)
    const dialogTitle = ref('新增')
    const searchKey = ref('')
    const formDisabled = ref(false)
    const pages = ref(1)
    const size = ref(10)
    const total = ref(0)
    const loading = ref(false)
    const datas = ref([])
    const form = ref(null)
    const rules = ref({
        name: [
            {required: true, message: '请填写姓名', trigger: 'blur'},
            {min: 2, max: 10, message: '字符长度2-10', trigger: 'blur'},
        ],
        department: [
            {required: true, message: '请填写部门', trigger: 'blur'},
            {min: 1, max: 30, message: '字符长度1-30', trigger: 'blur'},
        ]
    })
    //点击第几页
    const handleCurrentChange = (pages) => {
        pages.value = pages;
        getData();
    }
    const handleSizeChange = (size) => {
        size.value = size;
        getData();
    }
    const handleSearch = async (index, row) => {
        let data = await findById({id: row.id});
        formData.value = data;
        dialogVisible.value = true;
    }
    const updateIsMarry = async (row) => {
        await save({id: row.id, isMarry: row.isMarry});
        ElMessage.success(successMsg);
    }
    const updateStatus = async (row) => {
        await save({id: row.id, status: row.status.value});
        ElMessage.success(successMsg);
    }
    const handleAvatarSuccess = (res) => {
        formData.value.photo = res.data.filePath;
    }
    const removePhoto = () => {
        formData.value.photo = '';
    }
    const addTest = () => {
        formDisabled.value = false;
        formData.value = {...initFormData};
        dialogVisible.value = true;
    }
    const delTest = async (index, row) => {
        await delById({id: row.id});
        getData();
        ElMessage.success(successMsg);
    }
    const handleClick = (e) => {
        let target = e.target;
        if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
            target = e.target.parentNode;
        }
        target.blur();
    }
    const saveTest = async (form) => {
        console.log('form:',form)
        await  form.validate(async (valid) => {
            if (valid) {
                let data = {
                    ...formData.value
                }
                await save(data);
                dialogVisible.value = false;
                formData.value = initFormData;
                getData();
                ElMessage.success(successMsg);
            }
        })
    }
    const getData = async () => {
        loading.value = true;
        const data1 = await testList({pages: pages.value, size: size.value, name: searchKey.value});
        datas.value = data1.records;
        pages.value = data1.current;
        size.value = data1.size;
        total.value = data1.total;
        loading.value = false;
    }
    onMounted(() => {
        getData()
    })

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


