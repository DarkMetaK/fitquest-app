import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getCustomerActiveBundle } from '@/api/get-customer-active-bundle'
import { Loading } from '@/components/Loading'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'

import { WorkoutItem } from './components/WorkoutItem'
import { styles } from './styles'

export function Bundle() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const { data, isLoading, error } = useQuery({
    queryKey: ['activeBundle'],
    queryFn: getCustomerActiveBundle,
    staleTime: Infinity,
  })

  if (isLoading || !data?.activeBundle) {
    return <Loading />
  }

  if (error) {
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

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[
          styles.header,
          { paddingTop: insets.top + 16, height: 160 + insets.top },
        ]}
        source={{
          uri: 'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
        }}
        resizeMode="cover"
        alt=""
      >
        <View
          style={[
            styles.header,
            styles.overlay,
            { paddingTop: insets.top + 16, height: 160 + insets.top },
          ]}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.WHITE} />
        </TouchableOpacity>

        <Text style={styles.title}>{data.activeBundle.name}</Text>
      </ImageBackground>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.workouts}>
          {data.activeBundle.workouts.map((workout) => {
            const isFinished = data.activeBundle!.finishedWorkoutsIds.includes(
              workout.id,
            )

            return (
              <View
                key={workout.id}
                style={{ position: 'relative', justifyContent: 'center' }}
              >
                <WorkoutItem
                  id={workout.id}
                  title={workout.name}
                  availableCurrency={workout.availableCurrency}
                  exercisesAmount={workout.stepsAmount}
                  isFinished={isFinished}
                />

                {isFinished ? (
                  <Material
                    name="check"
                    size={24}
                    color={themes.COLORS.GREEN_6}
                    style={styles.unchecked}
                  />
                ) : (
                  <View style={styles.unchecked} />
                )}
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
