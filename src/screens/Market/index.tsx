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

import { fetchAvailableRaffles } from '@/api/fetch-available-raffles'
import { fetchCurrentCustomerRaffles } from '@/api/fetch-current-customer-raffles'
import { Header } from '@/components/Header'
import { PurchasedItem } from '@/components/PurchasedItem'
import { RaffleItem } from '@/components/RaffleItem'
import { Skeleton } from '@/components/Skeleton'
import themes from '@/themes'

import { styles } from './styles'

export function Market() {
  const navigation = useNavigation()

  const {
    data: raffles,
    isLoading: isLoadingRaffles,
    error: rafflesError,
  } = useQuery({
    queryKey: ['available-raffles'],
    queryFn: fetchAvailableRaffles,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })

  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useQuery({
    queryKey: ['raffles-history'],
    queryFn: () => fetchCurrentCustomerRaffles({}),
  })

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Sorteios</Text>
          </View>

          {isLoadingRaffles || rafflesError ? (
            <>
              {rafflesError && (
                <Text style={styles.error}>Falha ao buscar sorteios.</Text>
              )}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, gap: 16 }}
              >
                <Skeleton style={{ width: 230, height: 164 }} />
                <Skeleton style={{ width: 230, height: 164 }} />
              </ScrollView>
            </>
          ) : (
            <FlatList
              data={raffles?.raffles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RaffleItem
                  id={item.id}
                  title={item.name}
                  bannerUrl={item.bannerUrl.replace(
                    'http://localhost:3333',
                    String(process.env.EXPO_PUBLIC_API_URL),
                  )}
                  expiresAt={item.expiresAt}
                  isPremium={item.isPremium}
                />
              )}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Nenhuma sorteio disponível.
                  </Text>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, gap: 16 }}
            />
          )}
        </View>

        <View style={[styles.section, { flexGrow: 1 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Seu Histórico</Text>

            <TouchableOpacity
              style={styles.seeAllContainer}
              onPress={() =>
                navigation.navigate('stack', { screen: 'allBundles' })
              }
            >
              <Text style={styles.seeAll}>Ver tudo</Text>
              <Material
                name="chevron-right"
                size={14}
                color={themes.COLORS.GREEN_8}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            {isLoadingHistory || historyError ? (
              <>
                {historyError && (
                  <Text style={styles.error}>Falha ao buscar histórico.</Text>
                )}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, gap: 16 }}
                >
                  <Skeleton style={{ width: '100%', height: 96 }} />
                  <Skeleton style={{ width: '100%', height: 96 }} />
                  <Skeleton style={{ width: '100%', height: 96 }} />
                </ScrollView>
              </>
            ) : (
              <FlatList
                data={history?.tickets.splice(0, 5)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PurchasedItem
                    id={item.id}
                    title={item.name}
                    date={item.purchasedAt}
                    amount={1}
                    price={item.price}
                    type="raffle"
                  />
                )}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      Nenhuma compra encontrada
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, gap: 16 }}
              />
            )}
          </View>
        </View>
      </View>
    </>
  )
}
