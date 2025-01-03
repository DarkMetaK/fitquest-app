import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: themes.COLORS.GRAY_2,
    backgroundColor: themes.COLORS.WHITE,
  },

  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  banner: {
    width: '100%',
    height: 208,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },

  tag: {
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    backgroundColor: themes.COLORS.WHITE,
  },

  tagText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    lineHeight: 18,
    color: themes.COLORS.GRAY_12,
  },

  content: {
    flex: 1,
    width: '100%',
    paddingVertical: 32,
    gap: 16,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
  },

  description: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_8,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  price: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.BLUE_6,
  },

  remaining: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_9,
  },

  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
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
