import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },

  imageContainer: {
    gap: 16,
  },

  demonstration: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },

  nextTitle: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  nextExercise: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  rest: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE['2XL'],
    lineHeight: themes.FONT_SIZE['2XL'] + 4,
    height: themes.FONT_SIZE['2XL'] + 4,
    color: themes.COLORS.GRAY_12,
  },

  timer: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE['4XL'],
    lineHeight: themes.FONT_SIZE['4XL'] + 6,
    height: themes.FONT_SIZE['4XL'] + 6,
    color: themes.COLORS.GRAY_12,
    marginBottom: 0,
    padding: 0,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
    textAlign: 'center',
  },

  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 2,
    borderTopColor: themes.COLORS.GRAY_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,

    backgroundColor: themes.COLORS.WHITE,
  },
})
