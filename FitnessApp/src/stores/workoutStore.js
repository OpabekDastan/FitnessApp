import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage' 


const seed = () => ([
  {
    id: 'w_'+Date.now(),
    date: new Date().toISOString().slice(0,10),
    title: 'Example Workout',
    notes: 'This is a seeded workout item.',
    exercises: [
      { name:'Squats', sets:3, reps:8, weight:80 },
      { name:'Deadlift', sets:3, reps:5, weight:120 }
    ]
  }
])

const uid = (p='w') => `${p}_${Math.random().toString(36).slice(2,8)}`

//pinia store
export const useWorkoutStore = defineStore('workouts', () => {

  const workouts = useLocalStorage('fw_workouts', seed())

 
  const totalWorkouts = computed(() => workouts.value.length) 
  
  
  
  /**
   * @param {Object} w - 
   */
  function addWorkout(w){ 
    const item = { id: uid('w'), ...w }
    workouts.value.unshift(item)
    return item.id
  }
  
  /**
   * 
   * @param {string} id 
   */
  function deleteWorkout(id){ 
    const i = workouts.value.findIndex(w => w.id === id)
    if (i !== -1) workouts.value.splice(i,1)
  }
  
  /**
   * @param {string} id - 
   * @returns {Object | undefined}
   */
  function getWorkout(id){
    return workouts.value.find(w => w.id === id)
  }

  
  return {
    
    workouts, 
    
    totalWorkouts,
    
    addWorkout,
    deleteWorkout,
    getWorkout
  }
})