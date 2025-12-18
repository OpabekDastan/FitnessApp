import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkoutForm from '../WorkoutForm.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('../../stores/workoutStore', () => ({
  useWorkoutStore: () => ({ 
    addWorkout: vi.fn(() => 'new_id_123'),
    workouts: { value: [] },
  })
}))

describe('WorkoutForm.vue Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('1. shows error if Title is too short', async () => {
    const wrapper = mount(WorkoutForm)
    await wrapper.find('input[placeholder*="Push"]').setValue('A')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.find('.error-message').text()).toContain('at least 3 characters')
  })

  it('2. emits "saved" on success', async () => {
    const wrapper = mount(WorkoutForm)
    await wrapper.find('input[type="date"]').setValue('2025-12-17')
    await wrapper.find('input[placeholder*="Push"]').setValue('Full Body')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted().saved).toBeTruthy()
  })

  
  it('3. has a submit button', () => {
  const wrapper = mount(WorkoutForm)
  
  
  const submitBtn = wrapper.find('button.btn') 
  expect(submitBtn.exists()).toBe(true)
})
})