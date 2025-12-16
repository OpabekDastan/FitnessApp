
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkoutForm from '../WorkoutForm.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useWorkoutStore } from '@/stores/workoutStore' 


vi.mock('../../stores/workoutStore', () => ({
  useWorkoutStore: () => ({ 
    addWorkout: vi.fn(() => 'new_id_123'),
    
    deleteWorkout: vi.fn(),
    getWorkout: vi.fn(),
    workouts: { value: [] },
  })
}))


describe('WorkoutForm.vue Tests', () => {
  beforeEach(() => {
    
    setActivePinia(createPinia())
  })
  
  
  it('1. shows error message if Title is too short on submission', async () => {
    const wrapper = mount(WorkoutForm)
    
    
    await wrapper.find('input[placeholder="Push / Pull / Legs"]').setValue('A')
    
    
    await wrapper.find('form').trigger('submit.prevent')
    
    
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toContain('at least 3 characters long')
  })

  
  it('2. emits "saved" event after successful validation and submission', async () => {
    const wrapper = mount(WorkoutForm)
    
    
    await wrapper.find('input[type="date"]').setValue('2025-12-17')
    await wrapper.find('input[placeholder="Push / Pull / Legs"]').setValue('Full Body Workout')
    
    
    await wrapper.find('form').trigger('submit.prevent')
    
    
    expect(wrapper.emitted().saved).toBeTruthy()
  
    expect(wrapper.emitted().saved[0]).toEqual(['new_id_123'])
  })
})