<template>
  <form @submit.prevent="submit">
    <div class="grid" style="gap:12px">
      <div class="grid grid-2">
        <div>
          <label class="small">Date</label>
          <input class="input" type="date" v-model="form.date" required />
        </div>
        <div>
          <label class="small">Title</label>
          <input class="input" v-model="form.title" placeholder="Push / Pull / Legs" required />
        </div>
      </div>

      <div>
        <label class="small">Notes</label>
        <textarea class="input" rows="2" v-model="form.notes" placeholder="Optional"></textarea>
      </div>

      <div class="row" style="justify-content:space-between">
        <strong>Exercises</strong>
        <button class="btn" type="button" @click="addExercise">+ Add Exercise</button>
      </div>

      <div v-for="(e, idx) in form.exercises" :key="idx" class="card">
        <div class="grid grid-2">
          <input class="input" v-model="e.name" placeholder="Exercise name" required />
          <div class="row" style="gap:8px">
            <input class="input" type="number" min="1" v-model.number="e.sets" placeholder="Sets" required />
            <input class="input" type="number" min="1" v-model.number="e.reps" placeholder="Reps" required />
            <input class="input" type="number" min="0" step="0.5" v-model.number="e.weight" placeholder="Weight (kg)" />
            <button class="btn ghost" type="button" @click="removeExercise(idx)">Remove</button>
          </div>
        </div>
      </div>

      <button class="btn">Save Workout</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useWorkouts } from '../composables/useWorkouts'

const emit = defineEmits(['saved'])
const { addWorkout } = useWorkouts()

const form = reactive({
  date: new Date().toISOString().slice(0,10),
  title: '',
  notes: '',
  exercises: [{ name:'', sets:3, reps:10, weight:0 }]
})

function addExercise(){
  form.exercises.push({ name:'', sets:3, reps:10, weight:0 })
}
function removeExercise(i){
  form.exercises.splice(i,1)
}
function submit(){
  const id = addWorkout(JSON.parse(JSON.stringify(form)))
  emit('saved', id)
  // reset
  form.title = ''
  form.notes = ''
  form.exercises = [{ name:'', sets:3, reps:10, weight:0 }]
}
</script>
