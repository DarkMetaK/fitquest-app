import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  text: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE['4XL'],
    color: themes.COLORS.GRAY_12,
  },

  selector: {
    backgroundColor: themes.COLORS.GRAY_2,
  },

  label: {
    position: 'absolute',
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
    right: 24,
  },
})
