import { ref } from 'vue';
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';

interface ApiOptions {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    data: any;
}

export function useApi(options: ApiOptions) {
    const loading = ref(false);
    const result = ref<any>(null);
    const error = ref<any>(null);
    let loadingInstance: any;

    const callApi = async () => {
        loadingInstance = ElLoading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        try {
            const response = await axios({
                method: options.method || 'get',
                url: options.url,
                data: options.data
            });
            result.value = response.data;
        } catch (err) {
            error.value = err;
            ElMessage.error("请求错误, ${err}");
        } finally {
            loading.value = false;
            loadingInstance.close();
        }
    }

    callApi();

    return {
        loading,
        result,
        error
    };
}