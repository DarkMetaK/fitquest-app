import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 32,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  section: {
    width: '100%',
    gap: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
  },

  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  seeAll: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GREEN_8,
  },

  walking: {
    width: '100%',
    marginTop: 4,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: themes.COLORS.GRAY_2,
  },
})