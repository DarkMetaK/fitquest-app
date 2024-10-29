import Material from '@expo/vector-icons/MaterialIcons'
import { useEffect, useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useWorkout } from '@/hooks/useWorkout'
import themes from '@/themes'

import { styles } from './styles'

interface ActiveExerciseProps {
  name: string
  duration: number
  demonstrationUrl: string
  audioUrl?: string
  videoUrl?: string
}

export function ActiveExercise({
  name,
  duration,
  demonstrationUrl,
}: ActiveExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [remainingTime, setRemainingTime] = useState(duration)
  const timer = useRef<NodeJS.Timeout>()

  const { completeExercise } = useWorkout()
  const insets = useSafeAreaInsets()

  useEffect(() => {
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
  }, [completeExercise])

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: demonstrationUrl }}
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

            <TouchableOpacity style={styles.demonstrationButton}>
              <Material name="videocam" size={20} color={themes.COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.timer}>{remainingTime}</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Material
              name="skip-previous"
              size={32}
              color={themes.COLORS.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handlePlayPause}
          >
            <Material name="pause" size={32} color={themes.COLORS.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Material name="skip-next" size={32} color={themes.COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
