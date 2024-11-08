import Material from '@expo/vector-icons/MaterialIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { SafeAreaView } from 'react-native-safe-area-context'

import { fetchBundles } from '@/api/fetch-bundles'
import { GetCustomerActiveBundleResponse } from '@/api/get-customer-active-bundle'
import { subscribeBundle } from '@/api/subscribe-bundle'
import { Button } from '@/components/Button'
import { Skeleton } from '@/components/Skeleton'
import {
  getUserBundleInfo,
  saveUserBundleInfo,
  UserBundleInfo,
} from '@/libs/async-storage/bundle'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

export function AllBundles() {
  const [bundleStorage, setBundleStorage] = useState<UserBundleInfo>({})
  const navigation = useNavigation()

  const queryClient = useQueryClient()

  useFocusEffect(() => {
    async function loadBundleStorage() {
      const storage = await getUserBundleInfo()

      setBundleStorage(storage)
    }

    loadBundleStorage()
  })

  const {
    data: availableBundles,
    isLoading,
    error: bundlesError,
  } = useQuery({
    queryKey: ['bundles'],
    queryFn: fetchBundles,
    refetchInterval: 1000 * 60 * 60 * 1, // 1 hour
  })

  const { mutateAsync: subscribeBundleFn, isPending: isSubmitting } =
    useMutation({
      mutationFn: subscribeBundle,
      onMutate: async ({ bundleId }) => {
        await saveUserBundleInfo({ subscribedBundleId: bundleId })

        await queryClient.invalidateQueries({ queryKey: ['activeBundle'] })

        const cached =
          queryClient.getQueryData<GetCustomerActiveBundleResponse>([
            'activeBundle',
          ])

        if (cached) {
          queryClient.setQueryData<GetCustomerActiveBundleResponse>(
            ['activeBundle'],
            {
              activeBundle:
                availableBundles?.bundles.find(
                  (bundle) => bundle.id === bundleId,
                ) ?? null,
            },
          )
        }

        navigation.navigate('stack', {
          screen: 'bundle',
          params: { id: bundleId },
        })
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

  function handleShowPremiumInfo() {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      showIndicator: false,
      title: 'Plano Premium',
      textBody: 'Plano exclusivo para usuários premium.',
      button: 'Fechar',
    })
  }

  async function handleSubscribeBundle(bundleId: string) {
    await subscribeBundleFn({ bundleId })
  }

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

      {isLoading ? (
        <Skeleton style={{ flex: 1, width: '100%' }} />
      ) : !bundlesError ? (
        <FlatList
          data={availableBundles?.bundles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bundleItem}>
              <View style={styles.bundleHeader}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.contentText}>
                  {item.workouts.length} treinos
                </Text>
              </View>

              <Image
                source={{
                  uri: item.bannerUrl.replace(
                    'http://localhost:3333',
                    String(process.env.EXPO_PUBLIC_API_URL),
                  ),
                }}
                alt=""
                style={styles.bundleBanner}
                resizeMode="cover"
              />

              <Text style={styles.contentText}>{item.description}</Text>

              <Button
                title={
                  item.isPremium
                    ? 'Exclusivo Premium'
                    : bundleStorage.subscribedBundleId === item.id
                      ? 'Em Andamento'
                      : 'Iniciar'
                }
                variant={
                  item.isPremium || bundleStorage.subscribedBundleId === item.id
                    ? 'secondary'
                    : 'primary'
                }
                onPress={
                  item.isPremium
                    ? handleShowPremiumInfo
                    : () => handleSubscribeBundle(item.id)
                }
                disabled={
                  isSubmitting || bundleStorage.subscribedBundleId === item.id
                }
                isLoading={isSubmitting}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.error}>Falha ao buscar os planos</Text>
      )}
    </SafeAreaView>
  )
}
