import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function initState() {
  return {
    isCollapse: false,
  }
}
export const useAllDateState = defineStore('main', () => {
  const state = ref(initState());
  const setIsCollapse = () => {
    state.value.isCollapse = !state.value.isCollapse
  }
  return { state, setIsCollapse }
},
  {
    persist: true,
  },
)
// 引入持久化插件
