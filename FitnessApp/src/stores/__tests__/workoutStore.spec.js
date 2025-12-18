import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWorkoutStore } from '../workoutStore'

const mockWorkouts = [
    { id: 'w_test01', title: 'Initial A', exercises: [] }
];

vi.mock('../../composables/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => ({ value: mockWorkouts }))
}))


global.fetch = vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ 
      content: 'Test Advice from API', 
      author: 'Test Author' 
    }),
}));

describe('Pinia Workout Store Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('1. correctly retrieves a workout by its ID', () => {
    const store = useWorkoutStore()
    const workout = store.getWorkout('w_test01')
    expect(workout.title).toBe('Initial A')
  })

  it('2. handles API fetch success and updates quote state', async () => {
    const store = useWorkoutStore()
    await store.fetchDailyQuote() 
    
    expect(store.quoteLoading).toBe(false)
    
    expect(store.quote.content).toBe('Test Advice from API')
  })

  
  it('3. adds a new workout to the list', () => {
  const store = useWorkoutStore()
  
  
  const initialCount = store.workouts.value.length 
  
  store.addWorkout({ title: 'New Gym Session', exercises: [] })
  
  expect(store.workouts.value.length).toBe(initialCount + 1)
  expect(store.workouts.value[0].title).toBe('New Gym Session')
})
})