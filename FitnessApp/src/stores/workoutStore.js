
import { defineStore } from 'pinia'
import { computed, ref } from 'vue' 
import { useLocalStorage } from '../composables/useLocalStorage' 


const seed = () => ([
  {
    id: 'w_'+Date.now(),
    date: new Date().toISOString().slice(0,10),
    title: 'Push Day',
    notes: 'Example data. You can delete this.',
    exercises: [
      { name:'Bench Press', sets:3, reps:8, weight:60 },
      { name:'Incline DB Press', sets:3, reps:10, weight:22.5 }
    ]
  }
])
const uid = (p='w') => `${p}_${Math.random().toString(36).slice(2,8)}`


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
  function deleteWorkout(id){
    const i = workouts.value.findIndex(w => w.id === id)
    if (i !== -1) workouts.value.splice(i,1)
  }
  function getWorkout(id){
    return workouts.value.find(w => w.id === id)
  }
  
  
  async function fetchDailyQuote() {
    quoteLoading.value = true;
    quoteError.value = null;

    try {
      const response = await fetch('https://api.quotable.io/random?tags=motivational|fitness');
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      quote.value = {
        content: data.content,
        author: data.author || 'Unknown'
      };
      
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      quoteError.value = 'Failed to load quote. Please check your connection.';
      
    } finally {
      quoteLoading.value = false;
    }
  }


  return {
    workouts, 
    totalWorkouts,
    addWorkout,
    deleteWorkout,
    getWorkout,
    quote,
    quoteLoading,
    quoteError,
    fetchDailyQuote
  }
})