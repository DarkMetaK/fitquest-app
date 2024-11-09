import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.COLORS.GRAY_1,
  },

  header: {
    height: 160,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.WHITE,
  },

  content: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,

    flexDirection: 'row',
    gap: 16,
  },

  workouts: {
    flex: 1,
    marginLeft: 32,
    paddingLeft: 32,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    borderColor: themes.COLORS.GRAY_7,
    gap: 16,
  },

  unchecked: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: themes.COLORS.GREEN_6,
    position: 'absolute',
    left: -44,

    backgroundColor: themes.COLORS.WHITE,
  },
})
