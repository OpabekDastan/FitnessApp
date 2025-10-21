<template>
  <header class="wrap">
    <div class="container row" style="justify-content:space-between;padding:14px 24px">
      <router-link to="/" class="brand">🏋️ Fitness Log</router-link>
      <nav class="row" style="gap:16px">
        <router-link to="/" class="nav">Home</router-link>
        <router-link to="/workouts" class="nav">Workouts</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.wrap{position:sticky;top:0;z-index:10;background:rgba(10,15,25,.7);backdrop-filter:blur(6px);border-bottom:1px solid #1f2937}
.brand{font-weight:800;letter-spacing:.3px}
.nav{color:var(--text);opacity:.9}
.nav.router-link-active{color:var(--accent)}
</style>
