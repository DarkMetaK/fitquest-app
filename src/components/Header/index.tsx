import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getCustomerDetails } from '@/api/get-customer-details'
import themes from '@/themes'

import { Crown, Crystal } from '../Icon'
import { Skeleton } from '../Skeleton'
import { styles } from './styles'

export function Header() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const {
    data: customerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['metadata'],
    queryFn: getCustomerDetails,
    staleTime: Infinity,
  })

  const isPremium =
    customerData?.customer.premiumExpiresAt &&
    dayjs().isBefore(dayjs(customerData?.customer.premiumExpiresAt))

  function handleNavigatePremium() {
    navigation.navigate('stack', { screen: 'premium' })
  }

  return (
    <View style={[styles.container, { paddingTop: 16 + insets.top }]}>
      <View style={styles.item}>
        {isLoading ? (
          <Skeleton style={{ maxWidth: 64, height: 16 }} />
        ) : !error ? (
          <>
            <Crystal color={themes.COLORS.BLUE_6} />
            <Text style={styles.currency}>
              {customerData?.customer.currencyAmount}
            </Text>
          </>
        ) : (
          <Text style={styles.error}>Falha ao atualizar dados</Text>
        )}
      </View>

      {isLoading ? (
        <Skeleton style={{ maxWidth: 64, height: 16 }} />
      ) : (
        !error &&
        !isPremium && (
          <TouchableOpacity style={styles.item} onPress={handleNavigatePremium}>
            <Crown color={themes.COLORS.YELLOW_6} />
            <Text style={styles.premium}>Premium</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  )
}
