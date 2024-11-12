import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TicketDTO } from '@/api/dtos/ticketDTO'
import {
  fetchCurrentCustomerRaffles,
  FetchCurrentCustomerRafflesResponse,
} from '@/api/fetch-current-customer-raffles'
import {
  getCustomerDetails,
  GetCustomerDetailsResponse,
} from '@/api/get-customer-details'
import { getRaffle } from '@/api/get-raffle'
import { purchaseRaffleTickets } from '@/api/purchase-raffle-tickets'
import { Button } from '@/components/Button'
import { Counter } from '@/components/Counter'
import { Crystal } from '@/components/Icon'
import { Skeleton } from '@/components/Skeleton'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

export function Raffle() {
  const [amount, setAmount] = useState(0)

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()
  const queryClient = useQueryClient()

  const params = route.params as { id: string }

  const {
    data: raffle,
    isLoading: isLoadingRaffle,
    error: raffleError,
  } = useQuery({
    queryKey: ['raffle', params.id],
    queryFn: () => getRaffle({ raffleId: params.id }),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })

  const {
    data: adquiredRaffles,
    isLoading: isLoadingAdquiredRaffles,
    error: adquiredRafflesError,
  } = useQuery({
    queryKey: ['raffles-history', params.id],
    queryFn: () =>
      fetchCurrentCustomerRaffles({
        raffleId: params.id,
      }),
    staleTime: Infinity,
  })

  const { data: customer, isLoading: isFetchingCustomer } = useQuery({
    queryKey: ['metadata'],
    queryFn: getCustomerDetails,
    staleTime: Infinity,
  })

  const { mutateAsync: purchaseRaffleFn, isPending: isSubmitting } =
    useMutation({
      mutationFn: purchaseRaffleTickets,
      onSuccess: async ({ tickets }) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso',
          textBody: 'Cupons adquiridos com sucesso. Boa sorte!',
          button: 'Fechar',
        })

        await updateCache(tickets)
      },
      onError(error) {
        const isAppError = error instanceof AppError

        const title = isAppError
          ? error.message
          : 'Erro no servidor, tente novamente mais tarde.'

        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: title,
          button: 'Fechar',
        })

        console.log(error)
      },
    })

  async function updateCache(newTickets: TicketDTO[]) {
    queryClient.invalidateQueries({ queryKey: ['raffles-history', 'metadata'] })

    const cachedAdquiredTickets =
      queryClient.getQueryData<FetchCurrentCustomerRafflesResponse>([
        'raffles-history',
        params.id,
      ])

    if (cachedAdquiredTickets) {
      console.log(cachedAdquiredTickets)

      queryClient.setQueryData<FetchCurrentCustomerRafflesResponse>(
        ['raffles-history', params.id],
        {
          tickets: [...newTickets, ...cachedAdquiredTickets.tickets],
        },
      )
    }

    const cachedTickets =
      queryClient.getQueryData<FetchCurrentCustomerRafflesResponse>([
        'raffles-history',
      ])

    if (cachedTickets) {
      queryClient.setQueryData<FetchCurrentCustomerRafflesResponse>(
        ['raffles-history'],
        {
          tickets: [...newTickets, ...cachedTickets.tickets],
        },
      )
    }

    const cachedMetadata = queryClient.getQueryData<GetCustomerDetailsResponse>(
      ['metadata'],
    )

    if (cachedMetadata) {
      queryClient.setQueryData<GetCustomerDetailsResponse>(['metadata'], {
        customer: {
          ...cachedMetadata.customer,
          currencyAmount:
            cachedMetadata.customer.currencyAmount -
            amount * raffle!.raffle.price,
        },
      })
    }
  }

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

  const userIsPremium =
    customer?.customer.premiumExpiresAt &&
    dayjs().isBefore(dayjs(customer?.customer.premiumExpiresAt))

  const allowedToPurchase = !raffle?.raffle.isPremium || userIsPremium

  const disableButton =
    isLoadingRaffle ||
    isLoadingAdquiredRaffles ||
    isFetchingCustomer ||
    isSubmitting ||
    !allowedToPurchase ||
    !!raffleError ||
    !!adquiredRafflesError ||
    amount === 0

  const AVAILABLE_QUOTA =
    raffle?.raffle.isPremium || userIsPremium
      ? 99
      : (raffle?.raffle.freeTierQuota || 0) -
        (adquiredRaffles?.tickets.length || 0)

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {isLoadingRaffle ? (
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

            {isLoadingRaffle ? (
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
          {isLoadingRaffle ? (
            <Skeleton style={{ height: 20 }} />
          ) : (
            <Text style={styles.title}>{raffle?.raffle.name}</Text>
          )}

          {isLoadingRaffle ? (
            <Skeleton style={{ height: 40 }} />
          ) : (
            <Text style={styles.description}>{raffle?.raffle.description}</Text>
          )}

          <View style={styles.priceContainer}>
            <View style={styles.row}>
              <Crystal size={20} color={themes.COLORS.BLUE_6} />
              {isLoadingRaffle ? (
                <Skeleton style={{ maxWidth: 24, height: 20 }} />
              ) : (
                <Text style={styles.price}>{raffle?.raffle.price}</Text>
              )}
            </View>

            {(!raffle?.raffle.isPremium || userIsPremium) && (
              <TouchableOpacity
                style={styles.row}
                onPress={handleShowQuotaInfo}
              >
                <Text style={styles.remaining}>
                  {AVAILABLE_QUOTA} cupons disponíveis
                </Text>
                <Material
                  name="question-mark"
                  size={12}
                  color={themes.COLORS.GRAY_9}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Counter
          value={amount}
          onIncrement={() => setAmount(amount + 1)}
          onDecrement={() => setAmount(amount - 1)}
          max={AVAILABLE_QUOTA}
        />

        <Button
          title={allowedToPurchase ? 'Comprar' : 'Premium'}
          style={{ width: '50%', opacity: disableButton ? 0.5 : 1 }}
          onPress={async () =>
            await purchaseRaffleFn({ raffleId: params.id, amount })
          }
          disabled={disableButton}
          isLoading={isSubmitting}
        />
      </View>
    </>
  )
}
