import { defineStore } from 'pinia'
import { computed, ref } from 'vue' 
import { useLocalStorage } from '../composables/useLocalStorage' 



export const useWorkoutStore = defineStore('workouts', () => {
  
  const workouts = useLocalStorage('fw_workouts', seed())
  
  
  const quote = ref(null)
  const quoteLoading = ref(false)
  const quoteError = ref(null)

  
  const totalWorkouts = computed(() => workouts.value.length)
  
  
  function addWorkout(w){
   
  }
  function deleteWorkout(id){
    
  }
  function getWorkout(id){
   
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