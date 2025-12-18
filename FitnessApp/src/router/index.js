import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },

  { path: '/workouts', name: 'workouts-list', component: () => import('../pages/Workouts.vue') },

  {
    path: '/workouts/create',
    name: 'create-workout',
    component: () => import('../pages/CreateWorkout.vue'),
  },

  {
    path: '/workouts/edit/:id',
    name: 'edit-workout',
    component: () => import('../pages/EditWorkout.vue'),
    props: true,
  },

  {
    path: '/workouts/:id',
    name: 'workout-detail',
    component: () => import('../pages/WorkoutDetail.vue'),
    props: true,
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../pages/NotFound.vue') },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.name === 'workout-detail' && !to.params.id) {
    return next({ name: 'workouts-list' })
  }
  next()
})


export default router
