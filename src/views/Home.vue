<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 space-y-5"> 
    <div class="flex items-center">
      <div class="inline-block text-5xl font-bold rainbow leading-none">
        DevSo.Fun
      </div>
    </div>
    <div class="flex items-center gap-x-1">
      <el-input
        class="w-80" 
        v-model="query"
        placeholder="请输入搜索关键词"
        @keyup.enter.native="performSearch"
      />
      <el-button
        type="primary"
        @click="performSearch"
      >
        搜索
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const query = ref('');

const performSearch = () => {
  // 这里你可以处理搜索逻辑
  console.log('搜索: ', query.value);
  ElMessage.success('搜索: ' + query.value);
};
</script>

<style scoped>
.rainbow {
  @apply bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent
}
</style>