import { useNavigation } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { createContext, ReactNode, useState } from 'react'

import { completeWorkout } from '@/api/complete-workout'
import { GetCustomerActiveBundleResponse } from '@/api/get-customer-active-bundle'
import {
  getCustomerDetails,
  GetCustomerDetailsResponse,
} from '@/api/get-customer-details'
import {
  getCurrentBundleInfo,
  saveCurrentBundleInfo,
} from '@/libs/async-storage/current-bundle'
import { saveMetrics } from '@/libs/async-storage/metrics'
import { savePendingFinishedWorkout } from '@/libs/async-storage/pending-finished-workouts'

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
  completeExercise: () => Promise<void>
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
  const queryClient = useQueryClient()

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
      await updateCache()
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

  async function updateCache() {
    await queryClient.invalidateQueries({
      queryKey: ['activities', 'metadata', 'activeBundle'],
    })

    const storagedBundle = await getCurrentBundleInfo()

    if (storagedBundle) {
      const bundleWorkout = storagedBundle.workouts.find(
        (workout) => workout.id === activeWorkoutId,
      )

      if (bundleWorkout) {
        if (!storagedBundle.finishedWorkoutsIds.includes(activeWorkoutId)) {
          storagedBundle.finishedWorkoutsIds.push(activeWorkoutId)

          await saveCurrentBundleInfo(storagedBundle)

          const cachedBundle =
            queryClient.getQueryData<GetCustomerActiveBundleResponse>([
              'activeBundle',
            ])

          if (cachedBundle) {
            queryClient.setQueryData<GetCustomerActiveBundleResponse>(
              ['activeBundle'],
              {
                activeBundle: cachedBundle.activeBundle
                  ? {
                      ...cachedBundle.activeBundle,
                      finishedWorkoutsIds: storagedBundle.finishedWorkoutsIds,
                    }
                  : null,
              },
            )
          }
        }
      }
    }

    const {
      customer: {
        highestStreak,
        currencyAmount,
        experienceAmount,
        totalCalories,
        totalExercises,
        totalWorkouts,
        premiumExpiresAt,
      },
    } = await getCustomerDetails()

    await saveMetrics({
      highestStreak,
      currencyAmount,
      experienceAmount,
      totalCalories,
      totalExercises,
      totalWorkouts,
      premiumExpiresAt,
    })

    const cached = queryClient.getQueryData<GetCustomerDetailsResponse>([
      'metadata',
    ])

    if (cached) {
      queryClient.setQueryData<GetCustomerDetailsResponse>(['metadata'], {
        customer: {
          ...cached.customer,
          highestStreak,
          currencyAmount,
          experienceAmount,
          totalCalories,
          totalExercises,
          totalWorkouts,
        },
      })
    }
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
