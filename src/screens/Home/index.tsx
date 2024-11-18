import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { fetchActiveChallenges } from '@/api/fetch-active-challenges'
import { getCustomerActiveBundle } from '@/api/get-customer-active-bundle'
import { BundleItem } from '@/components/BundleItem'
import { Button } from '@/components/Button'
import { Challenge } from '@/components/Challenge'
import { Header } from '@/components/Header'
import { Skeleton } from '@/components/Skeleton'
import { Walking } from '@/components/Walking'
import themes from '@/themes'

import { styles } from './styles'

export function Home() {
  const navigation = useNavigation()

  const {
    data: activeBundle,
    isLoading: isLoadingBundle,
    error: activeBundleError,
  } = useQuery({
    queryKey: ['activeBundle'],
    queryFn: getCustomerActiveBundle,
    staleTime: Infinity,
  })

  const {
    data: availableChallenges,
    isLoading: isLoadingChallenges,
    error: challengesError,
  } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchActiveChallenges,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })

  return (
    <>
      <Header />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Plano Atual</Text>

            <TouchableOpacity
              style={styles.seeAllContainer}
              onPress={() =>
                navigation.navigate('stack', { screen: 'premium' })
              }
            >
              <Text style={styles.seeAll}>Ver todos</Text>
              <Material
                name="chevron-right"
                size={14}
                color={themes.COLORS.GREEN_8}
              />
            </TouchableOpacity>
          </View>

          {isLoadingBundle || activeBundleError ? (
            <Skeleton style={{ width: '100%', height: 208 }} />
          ) : activeBundle?.activeBundle ? (
            <BundleItem
              bannerUrl={activeBundle.activeBundle.bannerUrl.replace(
                'http://localhost:3333',
                String(process.env.EXPO_PUBLIC_API_URL),
              )}
              levelsAmount={activeBundle.activeBundle.workouts.length}
              completedLevels={
                activeBundle.activeBundle.finishedWorkoutsIds.length
              }
              title={activeBundle.activeBundle.name}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum plano ativo</Text>
              <Button title="Escolher plano" />
            </View>
          )}
        </View>

        <View style={[styles.section, styles.topDivider]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Desafios Diários</Text>
          </View>

          {isLoadingChallenges || challengesError ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, gap: 20 }}
            >
              <Skeleton style={{ width: 230, height: 120 }} />
              <Skeleton style={{ width: 230, height: 120 }} />
            </ScrollView>
          ) : (
            <FlatList
              data={availableChallenges?.challenges}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Challenge
                  id={item.id}
                  title={item.name}
                  bannerUrl={item.bannerUrl.replace(
                    'http://localhost:3333',
                    String(process.env.EXPO_PUBLIC_API_URL),
                  )}
                  exercisesAmount={item.stepsAmount}
                  availableCurrency={item.availableCurrency}
                  premiumCurrency={item.availableCurrency * 1.5}
                  isFinished={false}
                />
              )}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Nenhum desafio disponível
                  </Text>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, gap: 20 }}
            />
          )}

          <View style={styles.walking}>
            <Walking
              availableCurrency={20}
              premiumCurrency={10}
              stepsGoal={6000}
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}
