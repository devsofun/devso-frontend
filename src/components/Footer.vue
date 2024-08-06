<template>
  <div
    class="footer h-10 fixed left-0 right-0 bottom-0 flex justify-center items-center"
    dark="bg-dark-700"
    bg="gray-100"
    w="full"
    h="12"
    text="xs"
  >
    <div
      class="inline-flex justify-center items-center text-center text-gray-500"
      m="x-2"
      opacity="75"
    >
      <el-text class="mx-1" size="small">
        <a href="http://sese.yyj.moe" target="_blank">
          <!-- <img
          width="28"
          height="16"
          class="filter grayscale"
          m="x-2"
          style="margin-top: -2px"
          :src="bannerUrl"
          alt="Rimo And XiaoYun"
        /> -->
        </a>
        ©️ 2023-{{ new Date().getFullYear() }}
        <el-link class="mx-1" href="/" :underline="false">DevSo.Fun</el-link>
      </el-text>
    </div>
    <div class="inline-flex justify-center items-center" m="x-2">
      <el-link :icon="Burger" :underline="false">gh构建编号</el-link>
      <span class="mx-2"></span>
      <el-link :icon="InfoFilled" :underline="false"></el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Burger, InfoFilled } from "@element-plus/icons-vue";
</script>
