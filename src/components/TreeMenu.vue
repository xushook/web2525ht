<template>
    <div v-for="(item, index) in userMenu" :key="index">
        <!-- 多个菜单 -->
        <el-sub-menu index="1" v-if="item.children&&item.children.length>0">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>{{ item.menuName }}</span>
            </template>

            <TreeMenu :userMenu="item.children"></TreeMenu>
            <!-- 这里要用递归组件 -->
            <!-- <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu> -->
        </el-sub-menu>

        <!-- 单个菜单 -->
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.menuName }}</span>
        </el-menu-item>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
const props = defineProps(['userMenu'])
</script>

<style scoped lang="sass">

</style>