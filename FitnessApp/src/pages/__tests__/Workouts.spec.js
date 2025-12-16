
import { ref } from 'vue' 
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Workouts from '../Workouts.vue'
import { createPinia, setActivePinia } from 'pinia'


const globalStubs = {
  WorkoutCard: true, 
  'router-link': true 
}


const mockWorkoutsData = [
  { id: 'w1', title: 'Cardio', exercises: [{ name: 'Run', weight: 0 }] },
  { id: 'w2', title: 'Legs', exercises: [{ name: 'Squat', weight: 80 }] },
];

describe('Workouts.vue Tests', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia())
   
    vi.clearAllMocks()
    vi.resetModules()
  })
  
  it('2. displays "No workouts yet" message when list is empty', async () => {
    
    
    await vi.doMock('../../stores/workoutStore', () => ({
        useWorkoutStore: () => ({ 
            workouts: ref([]), 
            deleteWorkout: vi.fn(),
        })
    }))
    
   
    const { default: WorkoutsComponent } = await import('../Workouts.vue')
    
    const wrapper = mount(WorkoutsComponent, {
        global: { stubs: globalStubs }
    });


    expect(wrapper.find('p.small').text()).toContain('No workouts yet.')
  
    expect(wrapper.findAll('workoutcard-stub').length).toBe(0)
  })
})