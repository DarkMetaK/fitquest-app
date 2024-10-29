import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    gap: 20,

    backgroundColor: themes.COLORS.GRAY_2,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },

  content: {
    flex: 1,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  subtitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_9,
  },
})
