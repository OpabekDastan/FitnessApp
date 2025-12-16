// src/stores/workoutStore.js (Полная исправленная версия с ZenQuotes API)
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'

// СЛУЖЕБНЫЕ ФУНКЦИИ
const seed = () => [
  {
    id: 'w_' + Date.now(),
    date: new Date().toISOString().slice(0, 10),
    title: 'Push Day',
    notes: 'Example data. You can delete this.',
    exercises: [
      { name: 'Bench Press', sets: 3, reps: 8, weight: 60 },
      { name: 'Incline DB Press', sets: 3, reps: 10, weight: 22.5 },
    ],
  },
]
const uid = (p = 'w') => `${p}_${Math.random().toString(36).slice(2, 8)}`

export const useWorkoutStore = defineStore('workouts', () => {
  // STATE: Workouts
  const workouts = useLocalStorage('fw_workouts', seed())

  // STATE: API (для цитат)
  const quote = ref(null)
  const quoteLoading = ref(false)
  const quoteError = ref(null)

  // GETTERS
  const totalWorkouts = computed(() => workouts.value.length)

  // ACTIONS: Работа с тренировками
  function addWorkout(w) {
    const item = { id: uid('w'), ...w }
    workouts.value.unshift(item)
    return item.id
  }
  function deleteWorkout(id) {
    const i = workouts.value.findIndex((w) => w.id === id)
    if (i !== -1) workouts.value.splice(i, 1)
  }
  function getWorkout(id) {
    return workouts.value.find((w) => w.id === id)
  }

  // ACTIONS: API (ZenQuotes)
  async function fetchDailyQuote() {
    quoteLoading.value = true
    quoteError.value = null

    try {
      // Используем Advice Slip API
      const response = await fetch('https://api.adviceslip.com/advice'); 
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const data = await response.json(); 
      const advice = data.slip.advice;
      
      // Advice Slip API не имеет автора, устанавливаем его вручную
      quote.value = {
        content: advice, 
        author: 'Very clever someone'
      };
    } catch (error) {
      console.error('Failed to fetch quote:', error)
      quoteError.value = 'Failed to load quote. Please check your connection.'
    } finally {
      quoteLoading.value = false
    }
  }

  // ЭКСПОРТ
  return {
    workouts,
    totalWorkouts,
    addWorkout,
    deleteWorkout,
    getWorkout,
    quote,
    quoteLoading,
    quoteError,
    fetchDailyQuote,
  }
})
