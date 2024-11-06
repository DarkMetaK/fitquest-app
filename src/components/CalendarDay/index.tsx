import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'
import { Text, View } from 'react-native'

import themes from '@/themes'

import { styles } from './styles'

interface CalendarDayProps {
  date: Date
  status?: 'STREAK' | 'INACTIVE' | 'REST'
  disabled?: boolean
}

const statusIcon: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> =
  {
    REST: 'sleep',
    STREAK: 'fire',
  }

export function CalendarDay({
  date,
  status = 'INACTIVE',
  disabled = false,
}: CalendarDayProps) {
  return (
    <View
      style={[
        styles.container,
        disabled && {
          borderColor: themes.COLORS.GRAY_3,
          backgroundColor: themes.COLORS.GRAY_1,
        },
      ]}
      testID="container"
    >
      {status !== 'INACTIVE' && (
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={statusIcon[status]}
            size={16}
            color={
              status === 'STREAK'
                ? themes.COLORS.ORANGE_6
                : themes.COLORS.BLUE_6
            }
            testID="icon"
          />
        </View>
      )}

      <Text style={[styles.text, disabled && { color: themes.COLORS.GRAY_7 }]}>
        {dayjs(date).get('date')}
      </Text>
    </View>
  )
}
