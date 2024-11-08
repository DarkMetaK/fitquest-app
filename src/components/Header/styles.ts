import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: themes.COLORS.GRAY_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: themes.COLORS.WHITE,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  currency: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.BLUE_6,
  },

  premium: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.YELLOW_6,
    textTransform: 'uppercase',
  },

  error: {
    borderRadius: 8,
    paddingHorizontal: 12,

    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.WHITE,
    backgroundColor: themes.COLORS.RED_3,
  },
})
