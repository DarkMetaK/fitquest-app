import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 32,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE['3XL'],
    color: themes.COLORS.GRAY_12,
  },
})
