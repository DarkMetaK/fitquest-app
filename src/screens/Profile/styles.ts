import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 16,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  hero: {
    gap: 8,
    alignItems: 'flex-start',
  },

  name: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
    lineHeight: 24,
  },

  text: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_9,
  },

  optionsContainer: {
    borderTopWidth: 2,
    borderTopColor: themes.COLORS.GRAY_2,
    paddingVertical: 16,
    gap: 16,
  },

  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themes.COLORS.GRAY_2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: themes.COLORS.WHITE,
  },

  optionTxt: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.LG,
    color: themes.COLORS.GRAY_9,
    lineHeight: 24,
  },

  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.RED_3,
  },
})
