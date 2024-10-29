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
    alignItems: 'flex-end',
  },

  demonstration: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },

  demonstrationBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  demonstrationButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: themes.COLORS.GRAY_6,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
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

    backgroundColor: themes.COLORS.WHITE,
  },

  controls: {
    width: '100%',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,

    backgroundColor: themes.COLORS.GREEN_6,
  },

  controlButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
})
