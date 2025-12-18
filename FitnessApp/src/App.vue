<!-- 

<template>
  <header class="app">
    <div class="container row" style="justify-content:space-between;padding:24px 24px">
      <router-link to="/" class="brand">
        <img :src="logo" alt="Fitness Log" class="brand-logo" />
        <span>Fitness Log</span>
      </router-link>

      <nav v-if="auth.isAuthenticated" class="row" style="gap:16px">
       
        <router-link to="/" class="nav">Home</router-link>
        <router-link to="/workouts" class="nav">Workouts</router-link>
        <router-link to="/workouts/create" class="nav">Create</router-link>
      
        <button class="btn ghost" @click="handleLogout" style="padding: 0.4rem 0.8rem"><span class="small" style="margin-right: 1px; color: var(--accent-2)">
          👤 {{ auth.user?.username }}
        </span> Logout</button>
        
      </nav>
    </div>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
import logo from './assets/fitness-logo.png' 
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
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
.brand-logo {
  width: 48px;                    
  height: 48px;
  object-fit: contain;
  display: block;
}
</style>
 -->


 <template>
  <header class="app">
    <div class="container row" style="justify-content:space-between;padding:24px 24px">
      <router-link to="/" class="brand">
        <img :src="logo" alt="Fitness Log" class="brand-logo" />
        <span>Fitness Log</span>
      </router-link>

      <nav v-if="auth.isAuthenticated" class="row" style="gap:16px">
        
        <router-link to="/" class="nav">Home</router-link>
        <router-link to="/workouts" class="nav">Workouts</router-link>
        <router-link to="/workouts/create" class="nav">Create</router-link>
        <router-link to="/tutorials" class="nav">Tutorials</router-link>
      
        <button class="btn ghost" @click="handleLogout" style="padding: 0.4rem 0.8rem">
          <span class="small" style="margin-right: 1px; color: var(--accent-2)">
            👤 {{ auth.user?.username }}
          </span> Logout
        </button>
        
      </nav>
    </div>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
import logo from './assets/fitness-logo.png' 
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'



const auth = useAuthStore()
const router = useRouter()








function handleLogout() {
  auth.logout()
  router.push('/login')
}
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
.brand-logo {
  width: 48px;                    
  height: 48px;
  object-fit: contain;
  display: block;
}
</style>