import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native'

import { createStyles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function Button({
  title,
  variant = 'primary',
  isLoading = false,
  style: customStyle,
  ...rest
}: ButtonProps) {
  const styles = createStyles({ variant })

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
