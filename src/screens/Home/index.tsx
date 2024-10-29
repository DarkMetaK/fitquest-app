import Material from '@expo/vector-icons/MaterialIcons'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { BundleItem } from '@/components/BundleItem'
import { Challenge } from '@/components/Challenge'
import { Header } from '@/components/Header'
import { Walking } from '@/components/Walking'
import themes from '@/themes'

import { styles } from './styles'

export function Home() {
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
            <Challenge
              title="Desafio de Flexibilidade"
              bannerUrl="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
              estimatedTime={5}
              availableCurrency={20}
              premiumCurrency={10}
            />

            <Challenge
              title="Desafio de Flexibilidade"
              bannerUrl="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
              estimatedTime={5}
              availableCurrency={20}
              premiumCurrency={10}
            />
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
