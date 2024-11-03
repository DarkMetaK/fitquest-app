import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import themes from '@/themes'

import { styles } from './styles'

const AVAILABLE_BUNDLES = [
  {
    id: '1',
    bannerUrl:
      'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
    title: 'Iniciante',
    description:
      'Plano clássico projetado para ser amigável com iniciantes e para melhorar a força do seu core e criar um corpo tonificado.',
    isPremium: false,
    workoutsAmount: 30,
  },
  {
    id: '2',
    bannerUrl:
      'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
    title: 'Intermediário',
    description:
      'Plano clássico projetado para ser amigável com iniciantes e para melhorar a força do seu core e criar um corpo tonificado.',
    isPremium: true,
    workoutsAmount: 30,
  },
  {
    id: '3',
    bannerUrl:
      'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
    title: 'Avançado',
    description:
      'Plano clássico projetado para ser amigável com iniciantes e para melhorar a força do seu core e criar um corpo tonificado.',
    isPremium: true,
    workoutsAmount: 30,
  },
]

export function AllBundles() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('tabs', { screen: 'home' })}
        >
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
        <Text style={styles.title}>Todos os Planos</Text>
      </View>

      <FlatList
        data={AVAILABLE_BUNDLES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bundleItem}>
            <View style={styles.bundleHeader}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.contentText}>
                {item.workoutsAmount} treinos
              </Text>
            </View>

            <Image
              source={{ uri: item.bannerUrl }}
              alt=""
              style={styles.bundleBanner}
              resizeMode="cover"
            />

            <Text style={styles.contentText}>{item.description}</Text>

            <Button
              title={item.isPremium ? 'Exclusivo Premium' : 'Iniciar'}
              variant={item.isPremium ? 'secondary' : 'primary'}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
