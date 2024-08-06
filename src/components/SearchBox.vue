<template>
  <div class="flex gap-x-1">
    <el-card
      style="width: 100%; border-radius: 16px"
      :style="{
        'box-shadow':
          mouseover || inputFocus ? 'var(--el-box-shadow-light)' : 'none',
      }"
      shadow="never"
      :body-style="{ padding: 'calc(var(--el-card-padding) / 2)' }"
      @mouseenter="mouseover = true"
      @mouseleave="mouseover = false"
    >
      <el-input
        style="width: 100%; padding: -5px"
        resize="none"
        class="flex-grow max-w-full noPadding"
        v-model="internalQuery"
        placeholder="有什么问题，放马过来🐎"
        @keyup.enter.native="performSearch"
        @keyup.enter.prevent
        :rows="3"
        type="textarea"
        input-style="padding: 4px"
        @focus="inputFocus = true"
        @blur="inputFocus = false"
      />
      <!-- <el-divider border-style="dashed" style="margin: 6px 0" /> -->
      <div class="flex items-center justify-between">
        <el-select
          v-model="value"
          placeholder="选择你要的搜索能力"
          size="small"
          class="w-40"
        >
          <template #header>
            <el-text class="mx-1" type="info" size="small"
              >选择你想使用的搜索能力</el-text
            >
          </template>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <div class="flex ml-auto">
          <el-tooltip content="常用对话设定" placement="top">
            <el-button
              :icon="MagicStick"
              style="margin-left: 6px"
              circle
              disabled
            />
          </el-tooltip>

          <el-tooltip content="添加文件" placement="top">
            <el-button
              :icon="DocumentAdd"
              style="margin-left: 6px"
              circle
              disabled
            />
          </el-tooltip>

          <el-tooltip
            :content="internalQuery === '' ? '请输入你的问题' : '发射🚀！'"
            placement="top"
          >
            <el-button
              class="flex"
              style="margin-left: 6px"
              type="primary"
              @click="performSearch"
              :icon="Promotion"
              :disabled = "internalQuery === ''"
              circle
            />
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { Promotion, DocumentAdd, MagicStick } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const internalQuery = ref((route.query.query as string) || "");
const mouseover = ref(false);
const inputFocus = ref(false);
const value = ref("general");
const options = [
  {
    value: "general",
    label: "综合",
  },
  {
    value: "error",
    label: "搜报错",
    disabled: true,
  },
  {
    value: "document",
    label: "查文档",
    disabled: true,
  },
];

watch(
  () => route.query.query,
  (newQuery) => {
    internalQuery.value = (newQuery as string) || "";
  }
);

function performSearch() {
  if (internalQuery.value !== "") {
    ElMessage.success(`搜索: ${internalQuery.value}`);
    router.push({ path: "/results", query: { query: internalQuery.value } });
  } else {
    ElMessage.warning("请输入搜索关键词");
  }
}
</script>

<style scoped>
.rainbow {
  @apply bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent;
}

:deep(.el-textarea__inner) {
  box-shadow: none !important;
}
</style>
