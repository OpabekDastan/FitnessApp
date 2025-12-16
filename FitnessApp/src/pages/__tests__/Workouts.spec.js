// src/pages/__tests__/Workouts.spec.js (ФИНАЛЬНАЯ ИСПРАВЛЕННАЯ ВЕРСИЯ)
import { ref } from 'vue' // Импортируем ref
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Workouts from '../Workouts.vue'
import { createPinia, setActivePinia } from 'pinia'

// Заглушка для дочерних компонентов и роутера
const globalStubs = {
  WorkoutCard: true, 
  'router-link': true 
}

// Тестовые данные
const mockWorkoutsData = [
  { id: 'w1', title: 'Cardio', exercises: [{ name: 'Run', weight: 0 }] },
  { id: 'w2', title: 'Legs', exercises: [{ name: 'Squat', weight: 80 }] },
];

describe('Workouts.vue Tests', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia())
    // Очищаем и сбрасываем моки перед каждым тестом
    vi.clearAllMocks()
    vi.resetModules()
  })
  // ТЕСТ 2: Проверка состояния "No workouts yet" (Должен видеть 0 элементов)
  it('2. displays "No workouts yet" message when list is empty', async () => {
    
    // 1. Динамически мокируем Pinia Store для этого теста: возвращаем 0 элементов
    await vi.doMock('../../stores/workoutStore', () => ({
        useWorkoutStore: () => ({ 
            workouts: ref([]), // Имитируем пустой список
            deleteWorkout: vi.fn(),
        })
    }))
    
    // 2. Динамически импортируем компонент Workouts.vue, чтобы он использовал новый мок
    const { default: WorkoutsComponent } = await import('../Workouts.vue')
    
    const wrapper = mount(WorkoutsComponent, {
        global: { stubs: globalStubs }
    });

    // Проверяем, что сообщение отображается
    expect(wrapper.find('p.small').text()).toContain('No workouts yet.')
    // Проверяем, что карточки не отображаются
    expect(wrapper.findAll('workoutcard-stub').length).toBe(0)
  })
})