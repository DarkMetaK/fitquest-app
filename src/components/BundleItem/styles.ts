import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    height: 208,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  content: {
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

  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.LG,
    color: themes.COLORS.GREEN_8,
  },

  progress: {
    width: '100%',
    gap: 4,
  },

  level: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.XS,
    color: themes.COLORS.GRAY_12,
  },
})
