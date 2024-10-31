import Material from '@expo/vector-icons/MaterialIcons'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { getActiveChallenges } from '@/api/get-active-challenges'
import { BundleItem } from '@/components/BundleItem'
import { Challenge } from '@/components/Challenge'
import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { Walking } from '@/components/Walking'
import themes from '@/themes'

import { styles } from './styles'

export function Home() {
  const {
    data: availableChallenges,
    isLoading: isLoadingChallenges,
    error: challengesError,
  } = useQuery({
    queryKey: ['challenges'],
    queryFn: getActiveChallenges,
    refetchInterval: 1000 * 60 * 1, // 5 minutes
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

            <TouchableOpacity style={styles.seeAllContainer}>
              <Text style={styles.seeAll}>Ver todos</Text>
              <Material
                name="chevron-right"
                size={14}
                color={themes.COLORS.GREEN_8}
              />
            </TouchableOpacity>
          </View>

          <BundleItem
            bannerUrl="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
            levelsAmount={30}
            title="Iniciante"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Desafios Diários</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, gap: 20 }}
          >
            {isLoadingChallenges ? (
              <Loading />
            ) : challengesError ? (
              <Text>Erro buscando desafios</Text>
            ) : (
              availableChallenges!.challenges.map((challenge) => (
                <Challenge
                  key={challenge.id}
                  title={challenge.name}
                  bannerUrl={challenge.bannerUrl.replace(
                    'http://localhost:3333',
                    String(process.env.EXPO_PUBLIC_API_URL),
                  )}
                  estimatedTime={5}
                  availableCurrency={challenge.availableCurrency}
                  premiumCurrency={challenge.availableCurrency * 1.5}
                />
              ))
            )}
          </ScrollView>

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
