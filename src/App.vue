<template>
  <el-container class="h-screen max-w-screen flex flex-col overflow-x-hidden">
    <div class="flex flex-grow">
      <router-view class="min-h-full min-w-full"></router-view>
    </div>
    <div class="footer h-15">
      <div class="text-center text-gray-500">
        Powered by DevSo.Fun
      </div>
    </div>
  </el-container>
  <SettingsPanel />
</template>

<script setup lang="ts">
import SettingsPanel from './components/SettingsPanel.vue'
</script>

<style scoped>
.footer {
  @apply text-center p-4 bg-gray-100 border-t border-gray-200;
}
</style>