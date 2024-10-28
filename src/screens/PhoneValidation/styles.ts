import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  form: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
})
