import { StyleSheet } from 'react-native'

import themes from '@/themes'

interface ButtonStylesProps {
  variant: 'primary' | 'secondary'
}

export const createStyles = ({ variant }: ButtonStylesProps) => {
  const isPrimary = variant === 'primary'

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: isPrimary ? 'transparent' : themes.COLORS.GRAY_3,
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: isPrimary ? themes.COLORS.GREEN_6 : 'transparent',
    },

    title: {
      fontFamily: themes.FONT_FAMILY.MEDIUM,
      fontSize: themes.FONT_SIZE.MD,
      color: isPrimary ? themes.COLORS.WHITE : themes.COLORS.GREEN_6,
      textTransform: 'uppercase',
    },
  })
}
