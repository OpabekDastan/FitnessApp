import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkoutCard from '../WorkoutCard.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('WorkoutCard.vue Tests', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockWorkout = {
    id: 'w_abc123',
    date: '2025-12-17',
    title: 'Test Workout',
    exercises: [{ name: 'Squats', sets: 5, reps: 5, weight: 70 }]
  }

  it('1. applies "card-heavy" class when weight is >= 50kg', () => {
    const wrapper = mount(WorkoutCard, {
      props: { workout: mockWorkout },
      global: { stubs: { 'router-link': true } }
    })
    expect(wrapper.classes()).toContain('card-heavy')
  })
  
  it('2. emits "delete" event with ID when Delete button is clicked', async () => {
    const wrapper = mount(WorkoutCard, {
      props: { workout: mockWorkout },
      global: { stubs: { 'router-link': true } }
    })
    await wrapper.find('button.ghost').trigger('click')
    expect(wrapper.emitted().delete[0]).toEqual(['w_abc123'])
  })

  // НОВЫЙ ТЕСТ: Проверка отображения заголовка
  it('3. renders the correct workout title', () => {
    const wrapper = mount(WorkoutCard, {
      props: { workout: mockWorkout },
      global: { stubs: { 'router-link': true } }
    })
    expect(wrapper.text()).toContain('Test Workout')
  })
})