import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  track: {
    flex: 1,
    height: 8,
    borderRadius: 8,

    backgroundColor: themes.COLORS.GRAY_4,
  },

  progress: {
    height: 8,
    borderRadius: 8,

    backgroundColor: themes.COLORS.GREEN_6,
  },
})
