
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWorkoutStore } from '../workoutStore'
import { ref } from 'vue' 



const mockWorkouts = [
    { id: 'w_test01', title: 'Initial A', exercises: [] },
    { id: 'w_test02', title: 'Initial B', exercises: [] }
];
vi.mock('../../composables/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => ({ 
    value: mockWorkouts 
  }))
}))


global.fetch = vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ slip: { advice: 'Test Advice from API' } }),
}));


describe('Pinia Workout Store Tests (2 Stable Tests)', () => {
  beforeEach(() => {

    setActivePinia(createPinia())

    vi.clearAllMocks()
    vi.resetModules()
  })


  it('1. GETTER: correctly retrieves a workout by its ID', () => {
    const store = useWorkoutStore()

    const workout = store.getWorkout('w_test01')
    expect(workout).toBeDefined() 
    expect(workout.title).toBe('Initial A')
    
 
    expect(store.getWorkout('w_none')).toBeUndefined()
  })


  it('2. ASYNC ACTION: handles API fetch success and updates quote state', async () => {
    const store = useWorkoutStore()
    await store.fetchDailyQuote() 
    
    expect(store.quoteLoading).toBe(false)
    expect(store.quote.content).toBe('Test Advice from API')
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})