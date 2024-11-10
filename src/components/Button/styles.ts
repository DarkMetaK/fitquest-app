import { StyleSheet } from 'react-native'

import themes from '@/themes'

interface ButtonStylesProps {
  variant: 'primary' | 'secondary' | 'oauth'
  size: 'small' | 'medium'
}

const sizes = {
  small: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: themes.FONT_SIZE.SM,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: themes.FONT_SIZE.MD,
  },
}

export const createStyles = ({ variant, size }: ButtonStylesProps) => {
  const isPrimary = variant === 'primary'
  const isOAuth = variant === 'oauth'

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: sizes[size].paddingVertical,
      paddingHorizontal: sizes[size].paddingHorizontal,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: isPrimary ? 'transparent' : themes.COLORS.GRAY_3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,

      backgroundColor: isPrimary ? themes.COLORS.GREEN_6 : 'transparent',
    },

    title: {
      fontFamily: isOAuth
        ? themes.FONT_FAMILY.REGULAR
        : themes.FONT_FAMILY.MEDIUM,
      fontSize: sizes[size].fontSize,
      color: isPrimary
        ? themes.COLORS.WHITE
        : isOAuth
          ? themes.COLORS.GRAY_12
          : themes.COLORS.GREEN_6,
      textTransform: 'uppercase',
    },
  })
}
