<!-- src/App.vue -->
<template>
  <header class="app">
    <div class="container row" style="justify-content:space-between;padding:24px 24px">
      <router-link to="/" class="brand">
        <img :src="logo" alt="Fitness Log" class="brand-logo" />
        <span>Fitness Log</span>
      </router-link>

      <nav class="row" style="gap:16px">
        <router-link to="/" class="nav">Home</router-link>
        <router-link to="/workouts" class="nav">Workouts</router-link>
        <router-link to="/workouts/create" class="nav">Create</router-link>
      </nav>
    </div>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
import logo from './assets/fitness-logo.png'  // <— твой PNG
</script>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  letter-spacing: .3px;
  text-decoration: none;          
}
.brand:visited { text-decoration: none; }
.brand-logo {
  width: 48px;                    
  height: 48px;
  object-fit: contain;
  display: block;
}
</style>
