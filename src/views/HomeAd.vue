<template>
    <div class="home">
        <div class="common-layout">
            <el-container>
                <el-header>Header</el-header>
                <el-container>
                    <el-aside width="200px">

                        <h5 class="mb-2">Custom colors</h5>
                        <el-menu active-text-color="#ffd04b" background-color="#000" class="el-menu-vertical-demo"
                            default-active="2" text-color="#fff">
                            <tree-menu :userMenu="userMenu"></tree-menu>
                        </el-menu>

                    </el-aside>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import Api from '../api';
import TreeMenu from '../components/TreeMenu.vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()
let userMenu = ref([])
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

const getmenulist = () => {
    Api.getMenuList().then((res: any) => {
        console.log(res)
        userMenu.value = res
    })
}
getmenulist()


</script>

<style scoped>
.home {
    height: 100%;
}

.el-container {
    height: 100vh;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
}

.el-aside {
    background-color: #000;
    color: #333;
    text-align: center;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}
</style>
