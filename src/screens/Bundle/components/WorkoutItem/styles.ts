import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: themes.COLORS.GREEN_6,
    borderRadius: 8,
    padding: 12,
    gap: 8,

    backgroundColor: themes.COLORS.GRAY_2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.LG,
    color: themes.COLORS.GRAY_12,
  },

  infoText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_9,
  },

  currency: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  currencyText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.BLUE_6,
  },
})
