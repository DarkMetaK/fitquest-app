import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.COLORS.GRAY_1,
  },

  header: {
    flexGrow: 1,
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

  content: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_8,
  },

  infoContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  exercises: {
    flexGrow: 1,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderColor: themes.COLORS.GRAY_2,
    gap: 16,
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
})
