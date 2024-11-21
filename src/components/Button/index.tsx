import Material from '@expo/vector-icons/MaterialIcons'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import GoogleSvg from '@/assets/google.svg'
import themes from '@/themes'

import { createStyles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary' | 'oauth'
  size?: 'small' | 'medium'
  isLoading?: boolean
  provider?: 'google'
  icon?: keyof typeof Material.glyphMap
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  style: customStyle,
  provider,
  icon,
  disabled,
  ...rest
}: ButtonProps) {
  const styles = createStyles({ variant, size })

  return (
    <TouchableOpacity
      style={[styles.container, customStyle, disabled && { opacity: 0.6 }]}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size={24} />
      ) : (
        <>
          {provider && <GoogleSvg width={24} height={24} />}
          <Text
            style={[styles.title, disabled && { color: themes.COLORS.GRAY_9 }]}
          >
            {title}
          </Text>
          {icon && (
            <Material
              name={icon}
              size={20}
              color={disabled ? themes.COLORS.GRAY_9 : themes.COLORS.GREEN_6}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  )
}
