import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import premiumImg from '@/assets/premium-img.png'
import { Button } from '@/components/Button'
import themes from '@/themes'

import { styles } from './styles'

export function Premium() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={premiumImg} alt="" resizeMode="cover" />
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Assinatura Premium</Text>
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

          <View style={styles.priceDetails}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>Plano Anual</Text>
              <Text style={styles.priceText}>R$ 240,00</Text>
            </View>

            <Button
              title="Assinar"
              style={{ backgroundColor: themes.COLORS.YELLOW_8 }}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}
