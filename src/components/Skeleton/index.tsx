import { ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './styles'

export function Skeleton({ style, ...props }: ViewProps) {
  const opacity = useSharedValue(0.5)

  opacity.value = withRepeat(
    withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true,
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View
      style={[styles.container, animatedStyle, style]}
      {...props}
    />
  )
}
