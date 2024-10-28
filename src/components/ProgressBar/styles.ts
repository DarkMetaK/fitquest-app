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
    position: 'relative',

    backgroundColor: themes.COLORS.GREEN_6,
  },

  trackIcon: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: themes.COLORS.GREEN_6,
    zIndex: 100,
    position: 'absolute',
    right: -8,
    bottom: -8,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: themes.COLORS.WHITE,
  },
})
