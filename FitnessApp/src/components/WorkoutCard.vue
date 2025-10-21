<template>
  <article class="card">
    <div class="row" style="justify-content:space-between">
      <div>
        <h3 style="margin:0">{{ workout.title }}</h3>
        <div class="small">{{ workout.date }}</div>
      </div>
      <div class="row" style="gap:8px">
        <router-link class="btn ghost" :to="{name:'workout-detail', params:{id:workout.id}}">Open</router-link>
        <button class="btn ghost" @click="$emit('delete', workout.id)">Delete</button>
      </div>
    </div>
    <hr />
    <ul style="margin:0; padding-left:18px">
      <li v-for="(e,i) in workout.exercises" :key="i" class="small">
        {{ e.name }} — {{ e.sets }}×{{ e.reps }} @ {{ e.weight }} kg
      </li>
    </ul>
  </article>
</template>

<script setup>
defineProps({ workout: Object })
</script>
