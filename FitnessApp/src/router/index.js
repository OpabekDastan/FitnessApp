import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Workouts from '../pages/Workouts.vue'
import WorkoutDetail from '../pages/WorkoutDetail.vue'
import CreateWorkout from '../pages/CreateWorkout.vue' 

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/workouts', name: 'workouts', component: Workouts },
  { path: '/workouts/create', name: 'create-workout', component: CreateWorkout }, 
  { path: '/workouts/:id', name: 'workout-detail', component: WorkoutDetail, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(){ return { top: 0 } }
})
