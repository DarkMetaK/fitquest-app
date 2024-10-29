import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.COLORS.GRAY_1,
  },

  header: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: themes.COLORS.GRAY_2,
    alignItems: 'center',
    gap: 12,

    backgroundColor: themes.COLORS.WHITE,
  },

  headerText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },
})
