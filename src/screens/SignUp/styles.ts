import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },

  hero: {
    gap: 12,
    marginBottom: 32,
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
  },

  subtitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_9,
  },

  form: {
    width: '100%',
    gap: 16,
  },

  btnContainer: {
    width: '100%',
    gap: 16,
  },

  separator: {
    width: '100%',
    height: 2,
    backgroundColor: themes.COLORS.GRAY_2,
    marginVertical: 8,
  },

  signIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  textHighlight: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GREEN_6,
  },
})
