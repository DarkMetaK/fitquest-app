import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  imgContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  subtitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_8,
    textAlign: 'center',
  },

  btnContainer: {
    width: '100%',
    marginTop: 'auto',
    gap: 16,
  },
})
