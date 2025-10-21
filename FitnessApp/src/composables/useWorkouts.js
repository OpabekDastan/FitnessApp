import { useLocalStorage } from './useLocalStorage'

const seed = () => ([
  {
    id: 'w_'+Date.now(),
    date: new Date().toISOString().slice(0,10),
    title: 'Push Day',
    notes: '',
    exercises: [
      { name:'Bench Press', sets:3, reps:8, weight:60 },
      { name:'Incline DB Press', sets:3, reps:10, weight:22.5 }
    ]
  }
])

const workouts = useLocalStorage('fw_workouts', seed())

function uid(p='w'){ return `${p}_${Math.random().toString(36).slice(2,8)}` }

export function useWorkouts(){
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
  return { workouts, addWorkout, deleteWorkout, getWorkout }
}
