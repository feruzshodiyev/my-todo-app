<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item required>
            <el-col :span="18">
                <el-form-item prop="title">
                    <el-input placeholder="Please input title" v-model="ruleForm.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="time">
                    <el-time-picker
                            format="HH:mm"
                            placeholder="Pick a time" v-model="ruleForm.time" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item prop="description">
            <el-input type="textarea" rows="15" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item prop="importance">
            <el-radio-group v-model="ruleForm.importance">
                <el-radio label="High"></el-radio>
                <el-radio label="Medium"></el-radio>
                <el-radio label="Low"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import moment from 'moment'
    export default {
        props: [
            'selectedDate'
        ],
        name: "ToDoForm",
        data() {
            return {
                ruleForm: {
                    title: '',
                    time: '',
                    description: '',
                    importance: '',
                },
                rules: {
                    title: [
                        {required: true, message: 'Please input to do title', trigger: 'blur'}
                    ],
                    time: [
                        {type: 'date', required: true, message: 'Please pick a time', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: 'Please input to do description', trigger: 'blur'}
                    ],
                    importance: [
                        {required: true, message: 'Please select to do importance', trigger: 'change'}
                    ]

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm);
                        this.$store.commit("addToDo",{date: moment(this.selectedDate).format("YYYY-MM-DD"), toDo: this.ruleForm})
                        this.resetForm(formName)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        }
    }
</script>

<style scoped>
    .el-form {
        width: 80%;
    }
</style>