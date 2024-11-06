import { useNavigation } from '@react-navigation/native'
import { createContext, ReactNode, useState } from 'react'

import { completeWorkout } from '@/api/complete-workout'
import { savePendingFinishedWorkout } from '@/libs/async-storage/pending-finished-workouts'
import { queryClient } from '@/libs/react-query'

interface Exercise {
  id: string
  name: string
  duration: number
  repetitions?: number | null
  demonstrationUrl: string
  audioUrl?: string | null
  videoUrl?: string | null
}

interface WorkoutContextProps {
  activeWorkoutId: string
  exercises: Exercise[]
  completedExercises: Exercise[]
  currentExercise: Exercise | null
  currentExerciseIndex: number
  intervalDuration: number | null
  startWorkout: (props: { workoutId: string; exercises: Exercise[] }) => void
  completeExercise: () => void
  returnToPreviousExercise: () => void
  finishInterval: () => void
  finishWorkout: () => void
  clearWorkout: () => void
}

interface WorkoutContextProviderProps {
  children: ReactNode
}

export const workoutContext = createContext({} as WorkoutContextProps)

export function WorkoutContextProvider({
  children,
}: WorkoutContextProviderProps) {
  const [activeWorkoutId, setActiveWorkoutId] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [completedExercises, setCompletedExercises] = useState<Exercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [intervalDuration, setIntervalDuration] = useState<number | null>(null)

  const { navigate } = useNavigation()

  const currentExercise = exercises[currentExerciseIndex] || null

  async function startWorkout({
    workoutId,
    exercises,
  }: {
    workoutId: string
    exercises: Exercise[]
  }) {
    setActiveWorkoutId(workoutId)
    setCurrentExerciseIndex(0)
    setIntervalDuration(null)
    setCompletedExercises([])

    setExercises(exercises)
  }

  async function completeExercise() {
    if (currentExerciseIndex + 1 === exercises.length) {
      await finishWorkout()
      return
    }

    const currentExercise = exercises[currentExerciseIndex]

    setCompletedExercises([...completedExercises, currentExercise])
    setCurrentExerciseIndex(currentExerciseIndex + 1)
    setIntervalDuration(30)
  }

  async function returnToPreviousExercise() {
    setCurrentExerciseIndex(currentExerciseIndex - 1)
    setCompletedExercises(completedExercises.slice(0, -1))
    finishInterval()
  }

  async function finishInterval() {
    setIntervalDuration(0)
  }

  async function finishWorkout() {
    try {
      await completeWorkout({ workoutId: activeWorkoutId })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    } catch (error) {
      await savePendingFinishedWorkout({ workoutId: activeWorkoutId })
      console.log(error)
    }

    navigate('stack', { screen: 'finishedWorkout' })
    clearWorkout()
  }

  function clearWorkout() {
    setActiveWorkoutId('')
    setExercises([])
    setCompletedExercises([])
    setCurrentExerciseIndex(0)
    setIntervalDuration(null)
  }

  return (
    <workoutContext.Provider
      value={{
        activeWorkoutId,
        exercises,
        completedExercises,
        currentExercise,
        currentExerciseIndex,
        intervalDuration,
        startWorkout,
        completeExercise,
        returnToPreviousExercise,
        finishInterval,
        finishWorkout,
        clearWorkout,
      }}
    >
      {children}
    </workoutContext.Provider>
  )
}
