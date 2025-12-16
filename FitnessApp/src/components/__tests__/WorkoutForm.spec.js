// src/components/__tests__/WorkoutForm.spec.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkoutForm from '../WorkoutForm.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useWorkoutStore } from '@/stores/workoutStore' // Использовать алиас @ или обновить путь

// Мокаем Pinia Store, чтобы не запускать реальную логику
vi.mock('../../stores/workoutStore', () => ({
  useWorkoutStore: () => ({ 
    addWorkout: vi.fn(() => 'new_id_123'),
    // Мокаем все остальные функции стора, чтобы они не вызывали ошибок
    deleteWorkout: vi.fn(),
    getWorkout: vi.fn(),
    workouts: { value: [] },
  })
}))


describe('WorkoutForm.vue Tests', () => {
  beforeEach(() => {
    // Активируем Pinia для теста
    setActivePinia(createPinia())
  })
  
  // ТЕСТ 1: Проверка пользовательской валидации заголовка
  it('1. shows error message if Title is too short on submission', async () => {
    const wrapper = mount(WorkoutForm)
    
    // Вводим слишком короткий заголовок
    await wrapper.find('input[placeholder="Push / Pull / Legs"]').setValue('A')
    
    // Симулируем отправку формы
    await wrapper.find('form').trigger('submit.prevent')
    
    // Проверяем, что сообщение об ошибке отображается
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toContain('at least 3 characters long')
  })

  // ТЕСТ 2: Проверка события "saved" при успешной отправке
  it('2. emits "saved" event after successful validation and submission', async () => {
    const wrapper = mount(WorkoutForm)
    
    // Устанавливаем валидные данные
    await wrapper.find('input[type="date"]').setValue('2025-12-17')
    await wrapper.find('input[placeholder="Push / Pull / Legs"]').setValue('Full Body Workout')
    
    // Симулируем отправку формы
    await wrapper.find('form').trigger('submit.prevent')
    
    // Проверяем, что событие 'saved' было сгенерировано
    expect(wrapper.emitted().saved).toBeTruthy()
    // Проверяем, что событие передало ID, который вернул мок Pinia Store
    expect(wrapper.emitted().saved[0]).toEqual(['new_id_123'])
  })
})