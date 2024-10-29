import { useContext } from 'react'

import { workoutContext } from '@/contexts/WorkoutContext'

export function useWorkout() {
  const context = useContext(workoutContext)

  return context
}
