<template>
  <section class="grid" style="gap:20px">
    <div class="card">
      <h2 style="margin:0 0 8px">Welcome 👋</h2>
      <p class="small">For your motivation</p>
      
      <div v-if="quoteLoading" class="quote-box center" style="padding:1rem; border:1px solid var(--border)">
        <p class="small">Loading daily quote...</p>
      </div>
      
      <div v-else-if="quoteError" class="quote-box danger" style="padding:1rem">
        <p class="small" style="color:var(--danger)">⚠️ Error: {{ quoteError }}</p>
      </div>

      <div v-else-if="quote" class="quote-box" style="margin-top: 15px;">
        <blockquote class="lead" style="margin:0; border-left: 3px solid var(--accent); padding-left: 10px;">
          "{{ quote.content }}"
        </blockquote>
        <footer class="small" style="text-align: right; margin-top: 5px;">— {{ quote.author }}</footer>
      </div>

      <div class="row" style="gap:10px; margin-top:20px">
        <router-link class="btn" to="/workouts">Go to Workouts</router-link>
        <router-link class="btn ghost" to="/workouts/create">Create Workout</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue' 
import { storeToRefs } from 'pinia'
import { useWorkoutStore } from '../stores/workoutStore'

const store = useWorkoutStore()

const { quote, quoteLoading, quoteError } = storeToRefs(store)
const { fetchDailyQuote } = store


onMounted(() => {
  
  fetchDailyQuote()
})
</script>

<style scoped>

.quote-box.danger {
  background: color-mix(in srgb, var(--danger) 10%, transparent);
  border-radius: 12px;
}
</style>