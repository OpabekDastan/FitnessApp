<template>
  <section class="grid" style="gap:20px">
    <div v-if="workout" class="card">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Edit Workout: {{ workout.title }}</h2>
        <router-link class="btn ghost" :to="{ name: 'workout-detail', params: { id } }">Cancel</router-link>
      </div>
      <hr />
      
      <WorkoutForm :initialData="workout" @saved="goToDetail" />

    </div>

    <div v-else class="card center" style="min-height: 50vh; text-align: center;">
        <h2 style="margin-top: 0;">Workout not found</h2>
        <p class="lead">The workout you are trying to edit does not exist.</p>
        <router-link class="btn" to="/workouts">Go to Workouts</router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkoutStore } from '../stores/workoutStore'
import WorkoutForm from '../components/WorkoutForm.vue'


const props = defineProps({
    id: String 
})

const router = useRouter()
const store = useWorkoutStore()


const workout = computed(() => store.getWorkout(props.id))

function goToDetail(id){
  
  router.push({ name: 'workout-detail', params: { id } })
}
</script>

<style scoped>

</style>