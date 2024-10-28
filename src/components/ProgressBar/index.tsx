import Material from '@expo/vector-icons/MaterialIcons'
import { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import themes from '@/themes'

import { styles } from './styles'

interface ProgressBarProps {
  totalSteps: number
  currentStep: number
  onBackPress?: () => void
}

export function ProgressBar({
  totalSteps,
  currentStep,
  onBackPress,
}: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  const sharedProgress = useSharedValue(percentage)
  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(percentage, { duration: 700 })
  }, [currentStep, percentage, sharedProgress])

  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity
          onPress={onBackPress}
          accessibilityLabel="Previous Step"
        >
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      )}

      <View style={styles.track}>
        <Animated.View
          style={[styles.progress, progressBarStyle]}
          testID="progressTrack"
        />
      </View>
    </View>
  )
}
