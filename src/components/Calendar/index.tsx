import Material from '@expo/vector-icons/MaterialIcons'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { getActivitiesHistory } from '@/api/get-activities-history'
import themes from '@/themes'
import { capitalizeString } from '@/utils/capitalize-string'

import { CalendarDay } from '../CalendarDay'
import { Skeleton } from '../Skeleton'
import { styles } from './styles'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const dateMonth = capitalizeString(currentDate.format('MMMM'))
  const dateYear = currentDate.format('YYYY')
  const formattedDate = currentDate.format('YYYY-MM-DD')

  const {
    data: activitiesHistory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['activities', formattedDate],
    queryFn: () => getActivitiesHistory({ from: formattedDate }),
    refetchInterval: 1000 * 60 * 1, // 1 hour
    enabled:
      currentDate.isBefore(new Date(), 'date') ||
      currentDate.isSame(new Date(), 'date'),
  })

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
          disabled: false,
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

  if (isLoading) {
    return <Skeleton style={{ width: '100%', height: 280 }} />
  }

  return (
    <View style={styles.container}>
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

        {error && <Text style={styles.error}>Falha ao atualizar dados</Text>}
        <View style={styles.calendarBody}>
          {calendarWeeks.map(({ weekDays, week }) => (
            <View key={week} style={styles.calendarWeek}>
              {weekDays.map(({ date, disabled }) => (
                <CalendarDay
                  key={date.toString()}
                  status={
                    activitiesHistory?.activities.data.find((activity) => {
                      return dayjs(activity.date).isSame(date, 'date')
                    })?.activityType
                  }
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
