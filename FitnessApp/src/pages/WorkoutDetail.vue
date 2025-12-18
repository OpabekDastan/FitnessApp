<template>
  <section class="grid" style="gap:20px">
    <div v-if="workout" class="grid grid-2">
      <div class="card">
        <div class="row" style="justify-content:space-between">
          <div>
            <h2 style="margin:0">{{ workout.title }}</h2>
            <div class="small">{{ workout.date }}</div>
          </div>
          <div class="row" style="gap:8px">
            <router-link class="btn ghost" to="/workouts">Back</router-link>
            <router-link class="btn" to="/workouts/create">New</router-link>
          </div>
        </div>
        <hr />
        <p class="small" v-if="workout.notes">{{ workout.notes }}</p>
        <ul style="margin:0; padding-left:18px">
          <li v-for="(e,i) in workout.exercises" :key="i" class="small">
            {{ e.name }} — {{ e.sets }}×{{ e.reps }} @ {{ e.weight }} kg
          </li>
        </ul>
      </div>

      <RestTimer />
    </div>

    <div v-else class="card">
      <p>No workout found.</p>
      <router-link class="btn" to="/workouts">Back</router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkoutStore } from '../stores/workoutStore' 

import RestTimer from '../components/RestTimer.vue' 

const { getWorkout } = useWorkoutStore() 
const route = useRoute()
const workout = ref(null)

function load(){
  workout.value = getWorkout(route.params.id) || null
}
watch(() => route.params.id, load, { immediate: true })
</script>