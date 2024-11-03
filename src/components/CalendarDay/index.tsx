import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'
import { Text, View } from 'react-native'

import themes from '@/themes'

import { styles } from './styles'

interface CalendarDayProps {
  date: Date
  status?: 'regular' | 'rest' | 'streak'
  disabled: boolean
}

const statusIcon: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> =
  {
    rest: 'sleep',
    streak: 'fire',
  }

export function CalendarDay({
  date,
  status = 'regular',
  disabled,
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
      {status !== 'regular' && (
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={statusIcon[status]}
            size={16}
            color={
              status === 'streak'
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
