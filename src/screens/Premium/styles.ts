import { StyleSheet } from 'react-native'

import themes from '@/themes'

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: themes.COLORS.GRAY_2,
    backgroundColor: themes.COLORS.WHITE,
  },

  container: {
    flexGrow: 1,

    backgroundColor: themes.COLORS.GRAY_1,
  },

  imgContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    maxWidth: 312,
    width: '100%',
    fontFamily: themes.FONT_FAMILY.BOLD,
    fontSize: themes.FONT_SIZE['3XL'],
    color: themes.COLORS.GRAY_12,
    lineHeight: 40,
    textAlign: 'center',
  },

  content: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 12,
    backgroundColor: themes.COLORS.WHITE,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
  },

  list: {
    gap: 16,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  itemText: {
    flex: 1,
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
    color: themes.COLORS.GRAY_12,
  },

  priceDetails: {
    paddingTop: 12,
    borderTopWidth: 2,
    borderColor: themes.COLORS.GRAY_2,
    gap: 16,
  },

  priceContainer: {
    padding: 16,
    borderWidth: 2,
    borderColor: themes.COLORS.YELLOW_8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceText: {
    fontFamily: themes.FONT_FAMILY.REGULAR,
    fontSize: themes.FONT_SIZE.MD,
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
