import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
  },

  form: {
    width: '100%',
    gap: 16,
  },

  btnContainer: {
    width: '100%',
    gap: 16,
  },
})
