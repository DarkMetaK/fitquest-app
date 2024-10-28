import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 90,
  },

  textContainer: {
    width: '100%',
    gap: 8,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
    textTransform: 'uppercase',
  },

  subtitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_8,
  },
})
