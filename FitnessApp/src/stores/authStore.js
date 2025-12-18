import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'








export const useAuthStore = defineStore('auth', () => {

    



  // Список всех зарегистрированных пользователей
  const registeredUsers = useLocalStorage('fw_registered_users', [])
  // Текущая сессия (кто вошел)
  const currentUser = useLocalStorage('fw_current_session', null)

  const isAuthenticated = computed(() => !!currentUser.value)

  function register(username, password) {
    const exists = registeredUsers.value.find(u => u.username === username)
    if (exists) return { success: false, message: 'User already exists' }

    const newUser = { 
      username, 
      password, // В реальном приложении здесь должен быть хэш
      favorites: [] 
    }
    registeredUsers.value.push(newUser)
    return { success: true }
  }

  function login(username, password) {
    const user = registeredUsers.value.find(
      u => u.username === username && u.password === password
    )

    if (user) {
      currentUser.value = user
      return { success: true }
    }
    return { success: false, message: 'Invalid username or password' }
  }

  function logout() {
    currentUser.value = null
  }

  function updateProfile(data) {
    if (currentUser.value) {
      // Обновляем в текущей сессии
      currentUser.value = { ...currentUser.value, ...data }
      
      // Обновляем в общем списке пользователей (чтобы данные сохранились)
      const index = registeredUsers.value.findIndex(u => u.username === currentUser.value.username)
      if (index !== -1) {
        registeredUsers.value[index] = { ...registeredUsers.value[index], ...data }
      }
    }
  }

  return {
    user: currentUser,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile
  }
})