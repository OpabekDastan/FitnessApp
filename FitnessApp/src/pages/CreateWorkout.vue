<template>
  <section class="grid" style="gap:20px">
    <div class="card">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Create Workout</h2>
        <router-link class="btn ghost" to="/workouts">Back</router-link>
      </div>
      <hr />
      <WorkoutForm @saved="goToDetail" />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import WorkoutForm from '../components/WorkoutForm.vue'

const router = useRouter()
function goToDetail(id){
  router.push({ name: 'workout-detail', params: { id } })
}
</script>
