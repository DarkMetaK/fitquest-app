import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: '1/1',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: themes.COLORS.GRAY_3,
    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
    backgroundColor: themes.COLORS.WHITE,
  },

  icon: {
    position: 'absolute',
    top: -6,
    right: -4,
    zIndex: 100,
  },

  text: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_12,
  },
})
