<template>
  <el-container class="h-screen max-w-screen flex flex-col overflow-x-hidden">
    <div class="flex flex-grow">
      <router-view class="min-h-full min-w-full"></router-view>
    </div>
    <div class="footer h-10"><Footer /></div>
  </el-container>
  <SettingsPanel />
</template>

<script setup lang="ts">
import SettingsPanel from "./components/SettingsPanel.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped>
.footer {
  @apply text-center p-4 bg-gray-100 border-t border-gray-200;
}
</style>
