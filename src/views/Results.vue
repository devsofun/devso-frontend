<!-- <template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col">
    <div class="common-layout">
      <el-container>
        <el-page-header>
          <template #content>
            <span class="text-large font-600 mr-3"> Title </span>
          </template>
        </el-page-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <main
            class="flex flex-col items-center max-w-4xl py-4 px-4 flex-grow"
            v-loading="loading"
          >
            <div
              v-for="(result, index) in results"
              :key="index"
              class="mb-6 p-6 bg-white rounded-xl shadow-lg min-w-full transition-transform duration-300 hover:shadow-xl hover:scale-105"
            >
              <h2 class="text-xl font-semibold text-blue-700">
                <a
                  :href="result.link"
                  target="_blank"
                  class="hover-underline-animation"
                  >{{ result.title }}</a
                >
              </h2>
              <p class="text-gray-800 mt-2 break-all">
                {{ result.content + "..." }}
              </p>
              <p class="text-green-600 mt-2 break-all">{{ result.link }}</p>
            </div>
          </main>
          <el-footer>
            <SearchBox
              class="flex-grow"
              v-model="query"
              @search="fetchResults"
            />
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template> -->

<template>
  <div class="flex flex-col min-h-full">
    <el-row class="tac">
      <el-col :span="5">
        <div
          style="
            position: fixed;
            max-width: inherit;
            left: 0;
            right: 0;
            height: 100vh;
          "
        >
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            style="height: 100%"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="2">
              <el-icon><search /></el-icon>
              <span>DevSo.Fun</span>
            </el-menu-item>
            <el-sub-menu index="1" default-opened>
              <template #title>
                <el-icon><chat-dot-round /></el-icon>
                <span>历史记录</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

            <el-menu-item index="3" disabled>
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="flex flex-col">
          <div class="flex">
            <main
              class="flex-1 items-center max-w-4xl py-4 px-4"
              v-loading="loading"
            >
              <div
                v-for="(result, index) in results"
                :key="index"
                class="mb-6 p-6 bg-white rounded-xl shadow-lg min-w-full transition-transform duration-300 hover:shadow-xl hover:scale-105"
              >
                <h2 class="text-xl font-semibold text-blue-700">
                  <a
                    :href="result.link"
                    target="_blank"
                    class="hover-underline-animation"
                    >{{ result.title }}</a
                  >
                </h2>
                <p class="text-gray-800 mt-2 break-all">
                  {{ result.content + "..." }}
                </p>
                <p class="text-green-600 mt-2 break-all">{{ result.link }}</p>
              </div>
            </main>
          </div>
            <div class="fixed inset-x-0 bottom-10" style="width: 50vw; transform: translateX(50%)">
            <SearchBox
              class="flex-grow bottom-20 mx-4"
              v-model="query"
              @search="fetchResults"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
import SearchBox from "../components/SearchBox.vue";

const route = useRoute();
const query = ref((route.query.query as string) || "");
const results = ref<SearchResult[]>([]);
const loading = ref(false);

import { Search, Setting, ChatDotRound } from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

interface SearchResult {
  content: string;
  link: string;
  title: string;
}

const goBack = () => {
  console.log("go back");
};

const fetchResults = async () => {
  if (!query.value) return;
  loading.value = true;
  try {
    const response = await axios.get<SearchResult[]>(
      `https://api.devso.fun/search?q=${query.value}`
    );
    results.value = response.data;
    ElMessage.success("搜索结果更新");
  } catch (error) {
    ElMessage.error(`错误`);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.query.query,
  (newQuery) => {
    query.value = newQuery as string;
    fetchResults(); // 更新搜索结果
  }
);

fetchResults();
</script>

<style scoped>
.rainbow {
  background: linear-gradient(to right, #60a5fa, #34d399, #8b5cf6);
  background-clip: text;
  color: transparent;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #3490dc;
  text-decoration: none;
}

.hover-underline-animation::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #3490dc;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
