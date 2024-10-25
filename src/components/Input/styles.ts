import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 4,
  },

  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themes.COLORS.WHITE,
    backgroundColor: themes.COLORS.WHITE,
  },

  icon: {
    paddingLeft: 8,
  },

  input: {
    padding: 16,
    paddingLeft: 8,
    flex: 1,
  },

  error: {
    color: themes.COLORS.RED_3,
    fontSize: themes.FONT_SIZE.XS,
  },
})
