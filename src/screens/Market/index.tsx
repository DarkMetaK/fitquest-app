import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { Header } from '@/components/Header'
import { PurchasedItem } from '@/components/PurchasedItem'
import { RaffleItem } from '@/components/RaffleItem'
import themes from '@/themes'

import { styles } from './styles'

const PURCHASE_HISTORY = [
  {
    id: '1',
    title: 'Kit Suplementos Growth',
    date: new Date('2024-12-31'),
    amount: 1,
    type: 'raffle',
    price: 10,
  },
  {
    id: '2',
    title: 'iPhone 13',
    date: new Date('2024-12-31'),
    amount: 2,
    type: 'raffle',
    price: 20,
  },
]

const AVAILABLE_RAFFLES = [
  {
    id: '1',
    title: 'Kit Suplementos Growth',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwPpDdMb-GhzJG8GtONjBgAneg0KdvjBbrw&s',
    expiresAt: new Date('2024-12-31'),
    isPremium: false,
  },
  {
    id: '2',
    title: 'iPhone 13',
    bannerUrl:
      'https://a-static.mlcdn.com.br/800x560/apple-iphone-13-128gb-estelar-tela-61-12mp/magazineluiza/234661900/d9bb81423a4ca9e0208bb75ee64fdf29.jpg',
    expiresAt: new Date('2024-12-31'),
    isPremium: true,
  },
]

export function Market() {
  const navigation = useNavigation()

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Rifas</Text>
          </View>

          <FlatList
            data={AVAILABLE_RAFFLES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RaffleItem
                id={item.id}
                title={item.title}
                bannerUrl={item.bannerUrl}
                expiresAt={item.expiresAt}
                isPremium={item.isPremium}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhuma rifa disponível</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, gap: 16 }}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Seu Histórico</Text>

            <TouchableOpacity
              style={styles.seeAllContainer}
              onPress={() =>
                navigation.navigate('stack', { screen: 'allBundles' })
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

          <FlatList
            data={PURCHASE_HISTORY}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PurchasedItem
                id={item.id}
                title={item.title}
                date={item.date}
                amount={item.amount}
                price={item.price}
                type={item.type}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhuma rifa disponível</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, gap: 16 }}
          />
        </View>
      </View>
    </>
  )
}
