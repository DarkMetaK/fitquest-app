import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

import { getCurrentCustomer } from '@/api/get-current-customer'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Skeleton } from '@/components/Skeleton'
import { useAuth } from '@/hooks/useAuth'
import themes from '@/themes'

import { styles } from './styles'

export function Profile() {
  const { handleSignOut } = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentCustomer,
    staleTime: Infinity,
  })

  function handleConfirmLogout() {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      showIndicator: false,
      title: 'Sair',
      textBody: 'Tem certeza que deseja deslogar do aplicativo?',
      button: 'Sair',
      closeOnButtonTap: true,
      onPressButton: () => handleSignOut(),
    })
  }

  return (
    <>
      <Header />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          {isLoading || error ? (
            <Skeleton style={{ width: 120, height: 16 }} />
          ) : (
            <Text style={styles.name}>{data?.customer.name}</Text>
          )}
          <Text style={styles.text}>Membro desde: 12/08/2024</Text>

          <Button
            title="Editar"
            icon="edit"
            variant="secondary"
            style={{ width: 'auto' }}
            disabled
          />
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <MaterialCommunity
              name="target"
              size={24}
              color={themes.COLORS.GRAY_12}
            />
            <Text style={styles.optionTxt}>Objetivos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunity
              name="fire"
              size={24}
              color={themes.COLORS.GRAY_12}
            />
            <Text style={styles.optionTxt}>Metas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunity
              name="bell"
              size={24}
              color={themes.COLORS.GRAY_12}
            />
            <Text style={styles.optionTxt}>Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunity
              name="cog"
              size={24}
              color={themes.COLORS.GRAY_12}
            />
            <Text style={styles.optionTxt}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleConfirmLogout}>
            <MaterialCommunity
              name="exit-to-app"
              size={24}
              color={themes.COLORS.GRAY_12}
            />
            <Text style={styles.optionTxt}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}
