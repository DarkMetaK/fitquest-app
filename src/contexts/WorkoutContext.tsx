import { createContext, ReactNode, useState } from 'react'

interface Exercise {
  id: string
  name: string
  duration: number
  demonstrationUrl: string
  audioUrl?: string
  videoUrl?: string
}

interface WorkoutContextProps {
  activeWorkoutId: string
  exercises: Exercise[]
  completedExercises: Exercise[]
  currentExercise: Exercise | null
  currentExerciseIndex: number
  intervalDuration: number | null
  startWorkout: (workoutId: string) => void
  completeExercise: () => void
  returnToPreviousExercise: () => void
  increaseIntervalDuration: () => void
  finishInterval: () => void
  finishWorkout: () => void
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

  const currentExercise = exercises[currentExerciseIndex] || null

  async function startWorkout(workoutId: string) {
    setActiveWorkoutId(workoutId)
    setCurrentExerciseIndex(0)
    setIntervalDuration(null)
    setCompletedExercises([])

    // TODO: fetch exercises
    setExercises([
      {
        id: '1',
        name: 'Jumping Jacks',
        duration: 30,
        demonstrationUrl:
          'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
      },
      {
        id: '2',
        name: 'Push-ups',
        duration: 60,
        demonstrationUrl:
          'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
      },
    ])
  }

  async function completeExercise() {
    const currentExercise = exercises[currentExerciseIndex]

    setCompletedExercises([...completedExercises, currentExercise])
    setCurrentExerciseIndex(currentExerciseIndex + 1)
    setIntervalDuration(30)
  }

  async function returnToPreviousExercise() {
    setCurrentExerciseIndex(currentExerciseIndex - 1)
    finishInterval()
  }

  async function increaseIntervalDuration() {
    if (intervalDuration !== null) {
      setIntervalDuration(intervalDuration + 20)
    }
  }

  async function finishInterval() {
    setIntervalDuration(0)
  }

  async function finishWorkout() {
    // TODO: send completed exercises to the server
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
        increaseIntervalDuration,
        finishInterval,
        finishWorkout,
      }}
    >
      {children}
    </workoutContext.Provider>
  )
}
