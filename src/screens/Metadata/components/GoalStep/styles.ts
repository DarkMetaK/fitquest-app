import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 32,
  },

  textContainer: {
    width: '100%',
    gap: 8,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
    textTransform: 'uppercase',
  },

  subtitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_8,
  },

  form: {
    flex: 1,
    gap: 16,
  },

  option: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themes.COLORS.GRAY_2,
    padding: 16,
    gap: 20,
    backgroundColor: themes.COLORS.WHITE,
  },

  optionText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_6,
  },
})
