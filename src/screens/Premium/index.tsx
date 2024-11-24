import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  getCustomerDetails,
  GetCustomerDetailsResponse,
} from '@/api/get-customer-details'
import { subscribePremium } from '@/api/subscribe-premium'
import premiumImg from '@/assets/premium-img.png'
import { Button } from '@/components/Button'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

export function Premium() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  const { data: customer, isLoading: isFetchingCustomer } = useQuery({
    queryKey: ['metadata'],
    queryFn: getCustomerDetails,
    staleTime: Infinity,
  })

  const { mutateAsync: subscribePremiumFn, isPending: isSubmitting } =
    useMutation({
      mutationFn: subscribePremium,
      onMutate: async () => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso!',
          showIndicator: false,
          textBody: 'Assinatura premium realizada com sucesso.',
          button: 'Fechar',
        })

        await updateCache()
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

  async function updateCache() {
    await queryClient.invalidateQueries({
      queryKey: ['metadata'],
    })

    const cachedMetadata = queryClient.getQueryData<GetCustomerDetailsResponse>(
      ['metadata'],
    )

    if (cachedMetadata) {
      queryClient.setQueryData<GetCustomerDetailsResponse>(['metadata'], {
        customer: {
          ...cachedMetadata.customer,
          premiumExpiresAt: dayjs().add(12, 'month').toDate(),
        },
      })
    }
  }

  async function handleSubscribePremium() {
    if (
      customer?.customer.premiumExpiresAt &&
      dayjs().isBefore(dayjs(customer?.customer.premiumExpiresAt))
    ) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Assinatura ativa',
        textBody: `Você já possui uma assinatura premium ativa até ${dayjs(customer?.customer.premiumExpiresAt).format('DD/MM/YYYY')}.`,
        button: 'Fechar',
      })
    }

    await subscribePremiumFn()
  }

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
              onPress={handleSubscribePremium}
              disabled={isSubmitting || isFetchingCustomer}
              isLoading={isSubmitting || isFetchingCustomer}
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}
