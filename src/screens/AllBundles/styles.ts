import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flex: 1,
    backgroundColor: themes.COLORS.GRAY_1,
  },

  header: {
    paddingBottom: 16,
    borderColor: themes.COLORS.GRAY_2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
  },

  contentContainer: {
    flexGrow: 1,
  },

  bundleItem: {
    flex: 1,
    gap: 16,
  },

  bundleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contentText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_8,
  },

  bundleBanner: {
    width: '100%',
    height: 208,
    borderRadius: 8,
    overflow: 'hidden',
  },

  separator: {
    width: '100%',
    height: 2,
    backgroundColor: themes.COLORS.GRAY_2,
    marginVertical: 16,
  },
})
