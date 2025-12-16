<template>
  <form @submit.prevent="submit">
    <div class="grid" style="gap: 12px">
      <div class="grid grid-2">
        <div>
          <label class="small">Date</label>
          <input class="input" type="date" v-model="form.date" required />
        </div>
        <div>
          <label class="small">Title</label>
          <input
            class="input"
            :class="{ 'input-error': errors.title }"
            v-model="form.title"
            placeholder="Push / Pull / Legs"
            required
            @input="errors.title = null"
          />
          <p v-show="errors.title" class="error-message small">{{ errors.title }}</p>
        </div>
      </div>

      <div>
        <label class="small">Notes</label>
        <textarea class="input" rows="2" v-model="form.notes" placeholder="Optional"></textarea>
      </div>

      <div class="row" style="justify-content: space-between">
        <strong>Exercises</strong>
        <button class="btn" type="button" @click="addExercise">+ Add Exercise</button>
      </div>

      <div v-for="(e, idx) in form.exercises" :key="idx" class="card">
        <div class="grid grid-2">
          <input class="input" v-model="e.name" placeholder="Exercise name" required />
          <div class="row" style="gap: 8px">
            <input
              class="input"
              type="text"
              min="1"
              v-model="e.sets"
              style="width: 50px"
              title="Sets"
            />
            <span class="small">Sets</span>
            <input
              class="input"
              type="text"
              min="1"
              v-model="e.reps"
              style="width: 50px"
              title="Reps"
            />
            <span class="small">Reps</span>
            <input
              class="input"
              type="text"
              min="0"
              v-model="e.weight"
              style="width: 50px"
              title="Weight (kg)"
            />
            <span class="small">kg</span>
            <button class="btn ghost" type="button" @click="removeExercise(idx)">Remove</button>
          </div>
        </div>
      </div>

      <button class="btn">{{ form.id ? 'Update Workout' : 'Save Workout' }}</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue' // Добавляем watch
import { useWorkoutStore } from '../stores/workoutStore'

// Добавляем пропс для приема начальных данных (для режима редактирования)
const props = defineProps({
  initialData: {
    type: Object,
    default: null, // По умолчанию null, если это форма создания
  },
})

const emit = defineEmits(['saved'])
// Добавляем updateWorkout
const { addWorkout, updateWorkout } = useWorkoutStore()

// Определяем базовое/пустое состояние формы
const baseForm = {
  date: new Date().toISOString().slice(0, 10),
  title: '',
  notes: '',
  exercises: [{ name: '', sets: 3, reps: 10, weight: 0 }],
}

// Устанавливаем реактивное состояние формы: либо данные из пропса, либо базовое состояние
const form = reactive(props.initialData ? JSON.parse(JSON.stringify(props.initialData)) : baseForm)

const errors = reactive({
  title: null,
})

function addExercise() {
  form.exercises.push({ name: '', sets: 3, reps: 10, weight: 0 })
}
function removeExercise(i) {
  form.exercises.splice(i, 1)
}

function validateForm() {
  errors.title = null
  let isValid = true

  if (form.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long.'
    isValid = false
  }

  return isValid
}

function submit() {
  if (!validateForm()) {
    return
  }

  let id
  const dataToSave = JSON.parse(JSON.stringify(form))

  // КЛЮЧЕВАЯ ЛОГИКА: Режим Редактирования (если есть ID)
  if (dataToSave.id) {
    updateWorkout(dataToSave) // Вызываем действие обновления
    id = dataToSave.id
  } else {
    // Режим Создания
    id = addWorkout(dataToSave)
    // Сброс формы (только для режима создания)
    Object.assign(form, baseForm)
  }

  // Перенаправляем на страницу деталей
  emit('saved', id)
}
</script>

<style scoped>
/* ... (стили остаются прежними) ... */
</style>
