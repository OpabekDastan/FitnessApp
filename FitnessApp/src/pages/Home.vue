<template>
  <section class="grid" style="gap:20px">
    <div class="card">
      <h2 style="margin:0 0 8px">Welcome 👋</h2>
      <p class="small">Log your workouts and review details.</p>
      <div class="row" style="gap:10px; margin-top:10px">
        <router-link class="btn" to="/workouts">Go to Workouts</router-link>
        <router-link class="btn ghost" to="/workouts/create">Create Workout</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
