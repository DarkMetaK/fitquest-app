import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: 230,
    gap: 8,
  },

  bannerImg: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

  content: {
    width: '100%',
    flexDirection: 'row',
  },

  text: {
    flex: 1,
    justifyContent: 'space-between',
  },

  title: {
    maxWidth: 180,
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  currency: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  currencyText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.BLUE_6,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  infoText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_9,
  },

  premium: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
})
