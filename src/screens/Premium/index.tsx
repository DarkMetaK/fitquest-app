import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import premiumImg from '@/assets/premium-img.png'
import PremiumStar from '@/assets/premium-star.svg'
import { Button } from '@/components/Button'
import themes from '@/themes'

import { styles } from './styles'

export function Premium() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  // const {
  //   data: ticket,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['ticket', params.id],
  //   queryFn: () => GetCustomerRaffleTicket({ ticketId: params.id }),
  // })

  // if (isLoading) {
  //   return <Loading />
  // }

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Image source={premiumImg} alt="" resizeMode="cover" />

          <Text style={styles.title}>Assinatura Premium</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.icon}>
            <PremiumStar width={64} height={64} />
          </View>

          <View style={styles.list}>
            <View style={styles.item}>
              <Material name="check" size={24} color={themes.COLORS.YELLOW_8} />
              <Text style={styles.itemText}>
                Acesso a treinos exclusivos e sorteios especiais.
              </Text>
            </View>

            <View style={styles.item}>
              <Material name="check" size={24} color={themes.COLORS.YELLOW_8} />
              <Text style={styles.itemText}>
                Participação ilimitada em sorteios usando cupons.
              </Text>
            </View>

            <View style={styles.item}>
              <Material name="check" size={24} color={themes.COLORS.YELLOW_8} />
              <Text style={styles.itemText}>
                Receba recompensas 1,5 vezes maiores.
              </Text>
            </View>

            <View style={styles.item}>
              <Material name="check" size={24} color={themes.COLORS.YELLOW_8} />
              <Text style={styles.itemText}>
                Experiência livre de anúncios.
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Plano Anual</Text>
            <Text style={styles.priceText}>R$ 180,00</Text>
          </View>

          <Button
            title="Assinar"
            style={{ backgroundColor: themes.COLORS.YELLOW_8 }}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </>
  )
}
