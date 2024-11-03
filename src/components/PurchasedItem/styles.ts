import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    padding: 16,
    gap: 4,

    backgroundColor: themes.COLORS.WHITE,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  dateText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_8,
  },

  priceText: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.RED_3,
  },
})
