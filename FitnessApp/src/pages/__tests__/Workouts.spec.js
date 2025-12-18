import { ref } from 'vue' 
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Заглушки для дочерних компонентов
const globalStubs = {
  WorkoutCard: true, 
  'router-link': true 
}

describe('Workouts.vue Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('1. displays "No workouts yet" message when list is empty', async () => {
    await vi.doMock('../../stores/workoutStore', () => ({
        useWorkoutStore: () => ({ 
            workouts: ref([]), 
            deleteWorkout: vi.fn(),
        })
    }))
    
    const { default: WorkoutsComponent } = await import('../Workouts.vue')
    const wrapper = mount(WorkoutsComponent, { global: { stubs: globalStubs } });

    expect(wrapper.find('p.small').text()).toContain('No workouts yet.')
  })

  
  it('2. updates search query when user types in filter input', async () => {
    const { default: WorkoutsComponent } = await import('../Workouts.vue')
    const wrapper = mount(WorkoutsComponent, { global: { stubs: globalStubs } });
    
    const input = wrapper.find('input[placeholder*="Filter"]')
    await input.setValue('Legs')
    
    
    expect(input.element.value).toBe('Legs')
  })
})