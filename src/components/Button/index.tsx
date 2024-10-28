import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { createStyles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium'
  isLoading?: boolean
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  style: customStyle,
  ...rest
}: ButtonProps) {
  const styles = createStyles({ variant, size })

  return (
    <TouchableOpacity style={[styles.container, customStyle]} {...rest}>
      {isLoading ? (
        <ActivityIndicator size={24} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
