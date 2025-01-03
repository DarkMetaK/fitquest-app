import Material from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import * as Linking from 'expo-linking'
import { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useWorkout } from '@/hooks/useWorkout'
import themes from '@/themes'
import { convertSecondsToTime } from '@/utils/time-converter'

import { styles } from './styles'

interface ActiveExerciseProps {
  name: string
  duration: number
  repetitions?: number | null
  demonstrationUrl: string
  audioUrl?: string | null
  videoUrl?: string | null
}

export function ActiveExercise({
  name,
  duration,
  repetitions,
  demonstrationUrl,
  videoUrl,
}: ActiveExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [remainingTime, setRemainingTime] = useState(duration)
  const [loading, setLoading] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  const {
    exercises,
    completedExercises,
    completeExercise,
    currentExerciseIndex,
    returnToPreviousExercise,
  } = useWorkout()
  const insets = useSafeAreaInsets()

  const hasPreviousExercise = completedExercises.length > 0
  const hasNextExercise = currentExerciseIndex < exercises.length

  useEffect(() => {
    if (repetitions) {
      return
    }

    setRemainingTime(duration)
    setIsPlaying(true)

    timer.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 0) {
          clearInterval(timer.current)
          completeExercise()
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [completeExercise, duration, repetitions])

  function handlePlayPause() {
    const currentlyPlaying = isPlaying
    setIsPlaying(!currentlyPlaying)

    if (currentlyPlaying) {
      clearInterval(timer.current)
    } else {
      timer.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 0) {
            clearInterval(timer.current)
            return 0
          }

          return prev - 1
        })
      }, 1000)
    }
  }

  async function handleSkip() {
    setLoading(true)

    clearInterval(timer.current)

    await completeExercise()

    setLoading(false)
  }

  function handleBackPress() {
    if (completedExercises.length > 0) {
      clearInterval(timer.current)
      returnToPreviousExercise()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: demonstrationUrl.replace(
                'http://localhost:3333',
                String(process.env.EXPO_PUBLIC_API_URL),
              ),
            }}
            style={styles.demonstration}
            alt=""
          />

          <View style={styles.demonstrationBtnContainer}>
            <TouchableOpacity style={styles.demonstrationButton}>
              <Material
                name="volume-up"
                size={20}
                color={themes.COLORS.WHITE}
              />
            </TouchableOpacity>

            {videoUrl && (
              <TouchableOpacity
                style={styles.demonstrationButton}
                onPress={() => Linking.openURL(videoUrl)}
              >
                <Material
                  name="videocam"
                  size={20}
                  color={themes.COLORS.WHITE}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.main}>
          {repetitions ? (
            <View style={styles.repetitions}>
              <Text style={styles.timer}>{repetitions}</Text>
              <Text style={styles.repetitionsText}>Repetições</Text>
            </View>
          ) : (
            <Text style={styles.timer}>
              {convertSecondsToTime(remainingTime)}
            </Text>
          )}
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleBackPress}
            disabled={!hasPreviousExercise || loading}
          >
            <Material
              name="skip-previous"
              size={32}
              color={
                hasPreviousExercise ? themes.COLORS.WHITE : themes.COLORS.GRAY_6
              }
            />
          </TouchableOpacity>

          {!repetitions && (
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePlayPause}
              disabled={loading}
            >
              <Material
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={32}
                color={themes.COLORS.WHITE}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleSkip}
            disabled={!hasNextExercise || loading}
          >
            <Material
              name={repetitions ? 'check' : 'skip-next'}
              size={32}
              color={
                hasNextExercise ? themes.COLORS.WHITE : themes.COLORS.GRAY_6
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
