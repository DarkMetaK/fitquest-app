import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'

import { createStyles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
}

export function Button({
  title,
  variant = 'primary',
  style: customStyle,
  ...rest
}: ButtonProps) {
  const styles = createStyles({ variant })

  return (
    <TouchableOpacity style={[styles.container, customStyle]} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
