import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { CustomerDetails, getCustomerDetails } from '@/api/get-customer-details'
import { Calendar } from '@/components/Calendar'
import { Header } from '@/components/Header'
import { Skeleton } from '@/components/Skeleton'
import { getMetrics } from '@/libs/async-storage/metrics'
import themes from '@/themes'

import { styles } from './styles'

export function Metrics() {
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)
  const [metrics, setMetrics] = useState<Pick<
    CustomerDetails,
    'totalWorkouts' | 'totalCalories' | 'totalExercises' | 'highestStreak'
  > | null>()

  const {
    data: fetchedMetrics,
    isLoading: isFetchingMetrics,
    error,
  } = useQuery({
    queryKey: ['metadata'],
    queryFn: getCustomerDetails,
    staleTime: Infinity,
    enabled: !metrics && !isLoadingMetrics,
  })

  useFocusEffect(
    useCallback(() => {
      async function loadMetricsStorage() {
        setIsLoadingMetrics(true)

        const storagedMetrics = await getMetrics()

        if (storagedMetrics) {
          setMetrics(storagedMetrics)
        }

        setIsLoadingMetrics(false)
      }

      loadMetricsStorage()
    }, []),
  )

  useEffect(() => {
    if (fetchedMetrics) {
      setMetrics(fetchedMetrics.customer)
    }
  }, [fetchedMetrics])

  return (
    <>
      <Header />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Estatísticas</Text>
          </View>

          <View style={styles.metrics}>
            <View style={styles.row}>
              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  {isLoadingMetrics || isFetchingMetrics ? (
                    <Skeleton style={{ maxWidth: 24, height: 16 }} />
                  ) : (
                    !error && (
                      <Text style={styles.metricValue}>
                        {metrics?.totalWorkouts}
                      </Text>
                    )
                  )}

                  <MaterialCommunityIcons
                    name="trophy"
                    size={20}
                    color={themes.COLORS.YELLOW_6}
                  />
                </View>
                <Text style={styles.metricTitle}>Treinos concluídos</Text>
              </View>

              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  {isLoadingMetrics || isFetchingMetrics ? (
                    <Skeleton style={{ maxWidth: 24, height: 16 }} />
                  ) : (
                    !error && (
                      <Text style={styles.metricValue}>
                        {metrics?.totalExercises}
                      </Text>
                    )
                  )}
                  <MaterialCommunityIcons
                    name="weight-lifter"
                    size={20}
                    color={themes.COLORS.BLUE_6}
                  />
                </View>
                <Text style={styles.metricTitle}>Exercícios realizados</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  {isLoadingMetrics || isFetchingMetrics ? (
                    <Skeleton style={{ maxWidth: 24, height: 16 }} />
                  ) : (
                    !error && (
                      <Text style={styles.metricValue}>
                        {metrics?.totalCalories}
                      </Text>
                    )
                  )}
                  <MaterialCommunityIcons
                    name="heart"
                    size={20}
                    color={themes.COLORS.GREEN_6}
                  />
                </View>
                <Text style={styles.metricTitle}>Calorias queimadas</Text>
              </View>

              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  {isLoadingMetrics || isFetchingMetrics ? (
                    <Skeleton style={{ maxWidth: 24, height: 16 }} />
                  ) : (
                    !error && (
                      <Text style={styles.metricValue}>
                        {metrics?.highestStreak}
                      </Text>
                    )
                  )}
                  <MaterialCommunityIcons
                    name="fire"
                    size={20}
                    color={themes.COLORS.ORANGE_6}
                  />
                </View>
                <Text style={styles.metricTitle}>
                  Maior sequência adquirida
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Sequências de treino</Text>
          </View>

          <Calendar />
        </View>
      </ScrollView>
    </>
  )
}
