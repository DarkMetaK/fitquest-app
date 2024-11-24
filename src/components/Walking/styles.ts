import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    gap: 12,

    backgroundColor: themes.COLORS.WHITE,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.LG,
    color: themes.COLORS.GREEN_8,
  },

  text: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.XS,
    color: themes.COLORS.GRAY_12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  currencyText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.BLUE_6,
  },

  progress: {
    gap: 4,
  },

  progressText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_12,
  },
})
