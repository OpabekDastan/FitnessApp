<!-- <template>
  <article class="card" :class="{ 'card-heavy': isHeavy }">
    <div class="row" style="justify-content:space-between">
      <div>
        <h3 style="margin:0">{{ workout.title }}</h3>
        <div class="small">{{ workout.date }}</div>
      </div>
      <div class="row" style="gap:8px">

        

        
        <router-link class="btn ghost" :to="{name:'edit-workout', params:{id:workout.id}}">Edit</router-link> 
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
import { computed } from 'vue'
import { defineProps } from 'vue'



const props = defineProps({ workout: Object })

const isFavorite = computed(() => auth.user?.favorites?.includes(props.workout.id))

function toggleFav() {
  let favs = [...(auth.user.favorites || [])]
  const idx = favs.indexOf(props.workout.id)
  if (idx > -1) favs.splice(idx, 1)
  else favs.push(props.workout.id)
  auth.updateProfile({ favorites: favs })
}

const isHeavy = computed(() => {
  return props.workout.exercises.some(e => e.weight >= 50)
})
</script>

<style scoped>
.card-heavy {
  border-color: var(--accent); 
  box-shadow: 0 0 10px rgba(43, 208, 127, 0.5); 
}
</style> -->
<template>
  <article class="card" :class="{ 'card-heavy': isHeavy }">
    <div class="row" style="justify-content:space-between">
      <div>
        <h3 style="margin:0">{{ workout.title }}</h3>
        <div class="small">{{ workout.date }}</div>
      </div>
      <div class="row" style="gap:8px">
      
        
        <router-link class="btn ghost" :to="{name:'edit-workout', params:{id:workout.id}}">Edit</router-link> 
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
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'

const props = defineProps({ workout: Object })
const auth = useAuthStore()



const isHeavy = computed(() => {
  return props.workout.exercises.some(e => e.weight >= 50)
})
</script>