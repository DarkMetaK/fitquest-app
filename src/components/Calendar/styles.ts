import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },

  goalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.GRAY_12,
  },

  calendar: {
    width: '100%',
    borderRadius: 8,
    gap: 8,
    padding: 16,

    backgroundColor: themes.COLORS.WHITE,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  calendarHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  calendarTitle: {
    fontFamily: themes.FONT_FAMILY.MEDIUM,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  calendarBody: {
    width: '100%',
    gap: 8,
  },

  calendarActions: {
    flexDirection: 'row',
    gap: 8,
  },

  calendarWeek: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  error: {
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,

    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.SM,
    color: themes.COLORS.WHITE,
    backgroundColor: themes.COLORS.RED_3,
  },
})
