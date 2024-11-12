import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { GetCustomerRaffleTicket } from '@/api/get-customer-raffle-ticket'
import { Crystal } from '@/components/Icon'
import { Loading } from '@/components/Loading'
import themes from '@/themes'

import { styles } from './styles'

export function Receipt() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as { id: string }

  const {
    data: ticket,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ticket', params.id],
    queryFn: () => GetCustomerRaffleTicket({ ticketId: params.id }),
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: ticket?.ticket.bannerUrl.replace(
              'http://localhost:3333',
              String(process.env.EXPO_PUBLIC_API_URL),
            ),
          }}
          style={styles.banner}
          alt=""
          resizeMode="cover"
        />

        <View style={[styles.banner, styles.overlay]} />

        <View style={styles.codeContainer}>
          {/* <Image
            source={{
              uri: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTFRaX872E1iX4jlcXwLY01J-fRIap_Bnveev0X5UgEGtUHrSALgmbenlDAx3cryQFr',
            }}
            style={styles.qrCode}
            alt=""
            resizeMode="cover"
          /> */}

          <View style={styles.qrCode}>
            <QRCode value={ticket?.ticket.id} size={220} />
          </View>

          <Text style={styles.code}>{ticket?.ticket.id}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{ticket?.ticket.name}</Text>

          <Text style={styles.description}>{ticket?.ticket.description}</Text>

          <View style={styles.priceContainer}>
            <View style={styles.row}>
              <Text style={styles.price}>- {ticket?.ticket.price}</Text>
              <Crystal size={20} color={themes.COLORS.RED_3} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
