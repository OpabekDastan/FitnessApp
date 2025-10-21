<template>
  <section class="grid" style="gap:20px">
    <div class="card">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">Your Workouts</h2>
        <div class="row" style="gap:8px">
          <input class="input" v-model="q" placeholder="Filter by title or exercise…" />
          <router-link class="btn" to="/workouts/create">+ New</router-link>
        </div>
      </div>
      <hr />
      <div class="grid">
        <WorkoutCard
          v-for="w in filtered"
          :key="w.id"
          :workout="w"
          @delete="deleteWorkout"
        />
      </div>
      <p v-if="filtered.length===0" class="small">No workouts yet. Click “New” to add one 💪</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWorkouts } from '../composables/useWorkouts'
import WorkoutCard from '../components/WorkoutCard.vue'

const { workouts, deleteWorkout } = useWorkouts()
const q = ref('')

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return workouts.value
  return workouts.value.filter(w =>
    w.title.toLowerCase().includes(term) ||
    w.exercises.some(e => e.name.toLowerCase().includes(term))
  )
})
</script>
