import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getRaffle } from '@/api/get-raffle'
import { Button } from '@/components/Button'
import { Counter } from '@/components/Counter'
import { Crystal } from '@/components/Icon'
import { Skeleton } from '@/components/Skeleton'
import themes from '@/themes'

import { styles } from './styles'

export function Raffle() {
  const [amount, setAmount] = useState(0)

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as { id: string }

  const {
    data: raffle,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['raffle', params.id],
    queryFn: () => getRaffle({ raffleId: params.id }),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })

  function handleShowDrawInfo() {
    Dialog.show({
      type: ALERT_TYPE.PRIMARY,
      showIndicator: false,
      title: 'Data do sorteio',
      textBody: `O sorteio será realizado no dia ${dayjs(raffle?.raffle.expiresAt).format('DD/MM/YYYY')}.`,
      button: 'Fechar',
    })
  }

  function handleShowPremiumInfo() {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      showIndicator: false,
      title: 'Exclusivo para premium',
      textBody: 'Este sorteio é exclusivo para usuários premium.',
      button: 'Fechar',
    })
  }

  function handleShowQuotaInfo() {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      showIndicator: false,
      title: 'Limite conta gratuita',
      textBody: 'Assine o plano premium para ter acesso a cupons ilimitados.',
      button: 'Fechar',
    })
  }

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {isLoading ? (
          <Skeleton style={{ width: '100%', height: 208 }} />
        ) : (
          <Image
            source={{
              uri: raffle?.raffle.bannerUrl.replace(
                'http://localhost:3333',
                String(process.env.EXPO_PUBLIC_API_URL),
              ),
            }}
            style={styles.banner}
            alt=""
            resizeMode="cover"
          />
        )}

        <View style={styles.row}>
          <TouchableOpacity style={styles.tag} onPress={handleShowDrawInfo}>
            <Material
              name="calendar-month"
              size={24}
              color={themes.COLORS.GREEN_6}
            />

            {isLoading ? (
              <Skeleton style={{ maxWidth: 24, height: 16 }} />
            ) : (
              <Text style={styles.tagText}>
                {dayjs(raffle?.raffle.expiresAt).format('DD/MM/YYYY')}
              </Text>
            )}
          </TouchableOpacity>

          {raffle?.raffle.isPremium && (
            <TouchableOpacity
              style={[
                styles.tag,
                {
                  backgroundColor: themes.COLORS.YELLOW_8,
                  alignSelf: 'stretch',
                },
              ]}
              onPress={handleShowPremiumInfo}
            >
              <Text style={[styles.tagText, { color: themes.COLORS.WHITE }]}>
                Premium
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          {isLoading ? (
            <Skeleton style={{ height: 20 }} />
          ) : (
            <Text style={styles.title}>{raffle?.raffle.name}</Text>
          )}

          {isLoading ? (
            <Skeleton style={{ height: 40 }} />
          ) : (
            <Text style={styles.description}>{raffle?.raffle.description}</Text>
          )}

          <View style={styles.priceContainer}>
            <View style={styles.row}>
              <Crystal size={20} color={themes.COLORS.BLUE_6} />
              {isLoading ? (
                <Skeleton style={{ maxWidth: 24, height: 20 }} />
              ) : (
                <Text style={styles.price}>{raffle?.raffle.price}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.row} onPress={handleShowQuotaInfo}>
              <Text style={styles.remaining}>3 cupons disponíveis</Text>
              <Material
                name="question-mark"
                size={12}
                color={themes.COLORS.GRAY_9}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Counter
          value={amount}
          onIncrement={() => setAmount(amount + 1)}
          onDecrement={() => setAmount(amount - 1)}
          max={3}
        />

        <Button title="Trocar" style={{ width: '50%' }} />
      </View>
    </>
  )
}
