import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'


const seed = () => [
  
  
]
const uid = (p = 'w') => `${p}_${Math.random().toString(36).slice(2, 8)}`

export const useWorkoutStore = defineStore('workouts', () => {

  const workouts = useLocalStorage('fw_workouts', seed())


  const quote = ref(null)
  const quoteLoading = ref(false)
  const quoteError = ref(null)

  const totalWorkouts = computed(() => workouts.value.length)

  function addWorkout(w){
  const item = { id: uid('w'), ...w }

  workouts.value.unshift(item) 
  return item.id
}

  function updateWorkout(updatedWorkout) {
    const index = workouts.value.findIndex(w => w.id === updatedWorkout.id);
    if (index !== -1) {
      
      workouts.value[index] = updatedWorkout; 
    }
  }
  function deleteWorkout(id) {
    const i = workouts.value.findIndex((w) => w.id === id)
    if (i !== -1) workouts.value.splice(i, 1)
  }
  function getWorkout(id) {
    return workouts.value.find((w) => w.id === id)
  }


  async function fetchDailyQuote() {
    quoteLoading.value = true
    quoteError.value = null

    try {
    
    const response = await fetch('https://api.quotable.io/random?tags=sports'); 
    
    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }
    
    const data = await response.json(); 
    quote.value = {
      content: data.content, 
      author: data.author
    };
  } catch (error) {
   
    quoteError.value = 'Не удалось загрузить мотивацию. Но ты всё равно иди тренируйся!'
  } finally {
    quoteLoading.value = false
  }
  }


  return {
    workouts,
    totalWorkouts,
    updateWorkout,
    addWorkout,
    deleteWorkout,
    getWorkout,
    quote,
    quoteLoading,
    quoteError,
    fetchDailyQuote,
  }
})
