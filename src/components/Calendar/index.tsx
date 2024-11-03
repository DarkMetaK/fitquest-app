import Material from '@expo/vector-icons/MaterialIcons'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import themes from '@/themes'
import { capitalizeString } from '@/utils/capitalize-string'

import { CalendarDay } from '../CalendarDay'
import { styles } from './styles'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const dateMonth = capitalizeString(currentDate.format('MMMM'))
  const dateYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')
    const lastWeekDay = daysInMonthArray[daysInMonthArray.length - 1].get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return daysInMonthArray[daysInMonthArray.length - (i + 1)].add(
        i + (i + 1),
        'day',
      )
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled: date.endOf('day').isBefore(new Date()),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = []

    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7))
    }

    return calendarWeeks.map((weekDays, index) => {
      return { weekDays, week: index + 1 }
    })
  }, [currentDate])

  function handleNextMonth() {
    setCurrentDate((state) => state.add(1, 'month'))
  }

  function handlePreviousMonth() {
    setCurrentDate((state) => state.subtract(1, 'month'))
  }

  return (
    <View style={styles.container}>
      <View style={styles.goalContainer}>
        <Text style={styles.title}>Meta Semanal</Text>

        <Text style={styles.title}>3/4</Text>
      </View>

      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>
            <Text>
              {dateMonth} {dateYear}
            </Text>
          </Text>

          <View style={styles.calendarActions}>
            <TouchableOpacity onPress={handlePreviousMonth}>
              <Material
                name="chevron-left"
                size={20}
                color={themes.COLORS.GRAY_12}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNextMonth}>
              <Material
                name="chevron-right"
                size={20}
                color={themes.COLORS.GRAY_12}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarBody}>
          {calendarWeeks.map(({ weekDays, week }) => (
            <View key={week} style={styles.calendarWeek}>
              {weekDays.map(({ date, disabled }) => (
                <CalendarDay
                  key={date.toString()}
                  status="regular"
                  date={date.toDate()}
                  disabled={disabled}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
