<template>
    <div class="login">
        <el-card style="max-width: 480px" class="box-card">
            <template #header>
                <div class="card-header py-2">
                    <h3 class="ma">课工场大数据汇聚平台</h3>
                </div>
            </template>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="mt-5 px-12">
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="ruleForm.userName" :prefix-icon="User" />
                </el-form-item>
                <el-form-item label="密码" prop="userPwd">
                    <el-input v-model="ruleForm.userPwd" show-password :prefix-icon="Lock" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="text-gray-300 text-xs">@copytight IP备案号：IP-1214414141414</span>
            </template>
        </el-card>
        <div class="wave">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import router from './../router'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<interLoginRuleForm>({
    userName: 'admin',
    userPwd: '123456',
})

const rules = reactive<FormRules<interLoginRuleForm>>({
    userName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 2, max: 10, message: '账号长度在2-10之间', trigger: 'blur' },
    ],
    userPwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度至少为6位', trigger: 'blur' },
    ],
})
//确定登录
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            router.push('/welcome')
        } else {
            console.log('error submit!', fields)
        }
    })
}
//重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<style scoped lang="scss">
.login {
    background-color: #2646b1;
    height: 100vh;
}

.box-card {
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.ma {
    @apply text-2xl font-bold
}

.wave {
    position: absolute;
    width: 100vw;
    bottom: 0;
    left: 0;
}

.waves {
    position: relative;
    width: 100%;
    height: 155vh;
    min-height: 100px;
    max-height: 200px;
}

.content {
    position: relative;
    height: 40vh;
    text-align: center;
    background-color: white;
}

.content a {
    margin: 0 5px;
    font-size: 12px;
    color: #333;
}

.content a:hover {
    color: #000;
}

/* Animation */

.parallax>use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax>use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
    .waves {
        height: 80px;
        min-height: 80px;
    }

    .content {
        height: 30vh;
    }

    h1 {
        font-size: 24px;
    }
}

.captcha {
    width: 230px;
    margin: 0 20px 0 0;
}
</style>