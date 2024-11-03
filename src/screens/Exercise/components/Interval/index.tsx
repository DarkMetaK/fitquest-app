import { useEffect, useRef, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { useWorkout } from '@/hooks/useWorkout'
import { convertSecondsToTime } from '@/utils/time-converter'

import { styles } from './styles'

export function Interval() {
  const { finishInterval, intervalDuration } = useWorkout()

  const [remainingTime, setRemainingTime] = useState(intervalDuration!)
  const timer = useRef<NodeJS.Timeout>()

  const insets = useSafeAreaInsets()

  useEffect(() => {
    timer.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 0) {
          clearInterval(timer.current)
          finishInterval()
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [finishInterval])

  function handleIncreaseTime() {
    setRemainingTime((prev) => prev + 20)
  }

  function handleSkip() {
    clearInterval(timer.current)
    finishInterval()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.demonstration}
            alt=""
          />

          <View>
            <Text style={styles.nextTitle}>Próximo</Text>
            <Text style={styles.nextExercise}>
              Postura do gato e da vaca sentada
            </Text>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.rest}>Descanso</Text>
          <Text style={styles.timer}>
            {convertSecondsToTime(remainingTime)}
          </Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="+20s"
          variant="secondary"
          style={{ flex: 1 }}
          onPress={handleIncreaseTime}
        />
        <Button title="Pular" style={{ flex: 1 }} onPress={handleSkip} />
      </View>
    </View>
  )
}
