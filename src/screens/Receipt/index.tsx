import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Crystal } from '@/components/Icon'
import themes from '@/themes'

import { styles } from './styles'

export function Receipt() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as { id: string }

  // const {
  //   data: raffle,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['raffle', params.id],
  //   queryFn: () => getRaffle({ raffleId: params.id }),
  //   staleTime: 1000 * 60 * 60 * 24, // 1 day
  // })

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300' }}
          style={styles.banner}
          alt=""
          resizeMode="cover"
        />

        <View style={[styles.banner, styles.overlay]} />

        <View style={styles.codeContainer}>
          <Image
            source={{
              uri: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTFRaX872E1iX4jlcXwLY01J-fRIap_Bnveev0X5UgEGtUHrSALgmbenlDAx3cryQFr',
            }}
            style={styles.qrCode}
            alt=""
            resizeMode="cover"
          />

          <Text style={styles.code}>1acf1a00-fe05-4799-9ec9-e16dffd8d758</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Máquina de Costura Singer</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            aliquet, quam ac ultricies malesuada, nunc orci fermentum dolor, nec
            ultrices orci nisl at turpis.
          </Text>

          <View style={styles.priceContainer}>
            <View style={styles.row}>
              <Text style={styles.price}>- 20</Text>
              <Crystal size={20} color={themes.COLORS.RED_3} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
