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
    position: 'relative',

    backgroundColor: themes.COLORS.GRAY_1,
  },

  banner: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    position: 'relative',
    alignItems: 'center',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  codeContainer: {
    marginTop: -120,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
  },

  qrCode: {
    width: 220,
    height: 220,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: themes.COLORS.GREEN_6,
  },

  code: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_9,
    textAlign: 'center',
  },

  content: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: '100%',
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
    color: themes.COLORS.RED_3,
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
