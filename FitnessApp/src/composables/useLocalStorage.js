import { ref, watch } from 'vue'

export function useLocalStorage(key, initial){
  const saved = localStorage.getItem(key)
  const state = ref(saved ? JSON.parse(saved) : initial)
  watch(state, v => localStorage.setItem(key, JSON.stringify(v)), { deep:true })
  return state
}
