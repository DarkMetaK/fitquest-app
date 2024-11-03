import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: 230,
    gap: 8,
    position: 'relative',
  },

  bannerImg: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

  content: {
    width: '100%',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  expiration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  expirationDate: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GREEN_8,
  },

  premiumTag: {
    position: 'absolute',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: 8,
    left: 8,
    backgroundColor: themes.COLORS.YELLOW_8,
  },

  premiumTagText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.WHITE,
  },
})
