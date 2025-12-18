<template>
  <section class="grid center" style="min-height: 80vh;">
    <div class="card" style="width: 100%; max-width: 400px;">
      <h2 style="margin-top: 0">{{ isLoginMode ? 'Login' : 'Register' }}</h2>
      <p class="small">
        {{ isLoginMode ? 'Welcome back! Please enter your details.' : 'Create an account to start tracking.' }}
      </p>
      
      <form @submit.prevent="handleSubmit" class="grid" style="gap: 15px;">
        <div class="field">
          <label>Username</label>
          <input 
            class="input" 
            v-model="form.username" 
            placeholder="Enter username" 
            required 
          />
        </div>
        <div class="field">
          <label>Password</label>
          <input 
            class="input" 
            type="password" 
            v-model="form.password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <p v-if="errorMessage" class="small" style="color: var(--danger)">
          {{ errorMessage }}
        </p>

        <button class="btn" type="submit">
          {{ isLoginMode ? 'Sign In' : 'Create Account' }}
        </button>
      </form>

      <hr />
      
      <div class="center">
        <button class="btn ghost small" @click="toggleMode">
          {{ isLoginMode ? 'Need an account? Register' : 'Already have an account? Login' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()

const isLoginMode = ref(true)
const errorMessage = ref('')
const form = reactive({
  username: '',
  password: ''
})

function toggleMode() {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ''
}

function handleSubmit() {
  errorMessage.value = ''

  if (isLoginMode.value) {
    // Логика входа
    const result = auth.login(form.username, form.password)
    if (result.success) {
      router.push('/')
    } else {
      errorMessage.value = result.message
    }
  } else {
    // Логика регистрации
    const result = auth.register(form.username, form.password)
    if (result.success) {
      alert('Registration successful! Now you can login.')
      isLoginMode.value = true
    } else {
      errorMessage.value = result.message
    }
  }
}
</script>