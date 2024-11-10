import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import GoogleSvg from '@/assets/google.svg'

import { createStyles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary' | 'oauth'
  size?: 'small' | 'medium'
  isLoading?: boolean
  provider?: 'google'
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  style: customStyle,
  provider,
  ...rest
}: ButtonProps) {
  const styles = createStyles({ variant, size })

  return (
    <TouchableOpacity style={[styles.container, customStyle]} {...rest}>
      {isLoading ? (
        <ActivityIndicator size={24} />
      ) : (
        <>
          {provider && <GoogleSvg width={24} height={24} />}
          <Text style={styles.title}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}
