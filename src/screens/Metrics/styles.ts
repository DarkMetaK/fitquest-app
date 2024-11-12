import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 16,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  section: {
    width: '100%',
    gap: 12,
  },

  topDivider: {
    paddingTop: 16,
    borderTopWidth: 2,
    borderColor: themes.COLORS.GRAY_2,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.XL,
    color: themes.COLORS.GRAY_12,
  },

  metrics: {
    flexDirection: 'column',
    gap: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  metricItem: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    borderRadius: 8,

    backgroundColor: themes.COLORS.WHITE,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metricValue: {
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  metricTitle: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_12,
  },

  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.RED_3,
  },
})
