import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getWorkout } from '@/api/get-workout'
import { Button } from '@/components/Button'
import { ExerciseItem } from '@/components/ExerciseItem'
import { Crystal } from '@/components/Icon'
import { Loading } from '@/components/Loading'
import { useWorkout } from '@/hooks/useWorkout'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'
import { convertSecondsToTime } from '@/utils/time-converter'

import { styles } from './styles'

export function Workout() {
  const { startWorkout } = useWorkout()

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as {
    id: string
    isFinished?: boolean
    description?: string
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['workout', params.id],
    queryFn: () => getWorkout({ id: params.id }),
    refetchInterval: 1000 * 60 * 60 * 1, // 1 hour
  })

  function handleStartWorkout() {
    startWorkout({
      workoutId: params.id,
      exercises: data!.workout.steps.map((step) => {
        return {
          id: step.exerciseId,
          name: step.name,
          duration: step.duration || 50,
          repetitions: step.repetitions,
          demonstrationUrl: step.demonstrationUrl,
          audioUrl: step.audioUrl,
          videoUrl: step.videoUrl,
        }
      }),
    })
    navigation.navigate('stack', {
      screen: 'exercise',
    })
  }

  if (isLoading) {
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

  if (params.isFinished) {
    Dialog.show({
      type: ALERT_TYPE.INFO,
      title: 'Treino já finalizado',
      showIndicator: false,
      textBody:
        'Você já finalizou este treino, não será possível obter mais cristais ao finalizá-lo novamente.',
      button: 'Fechar',
    })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[
          styles.header,
          { paddingTop: insets.top + 16, height: 160 + insets.top },
        ]}
        source={{
          uri: data?.workout.bannerUrl.replace(
            'http://localhost:3333',
            String(process.env.EXPO_PUBLIC_API_URL),
          ),
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
      </ImageBackground>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>{data?.workout.name}</Text>
          <Text style={styles.subtitle}>
            {params.description ||
              (data?.workout.expiresAt &&
                `Complete este desafio até:\n${dayjs(data.workout.expiresAt).format('DD/MM/YYYY [às] HH:MM')}`) ||
              'Aprimore sua saúde e vitalidade com esses exercícios'}
          </Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Material
                name="access-time"
                size={16}
                color={themes.COLORS.GREEN_6}
              />
              <Text style={styles.subtitle}>
                {convertSecondsToTime(data?.workout.estimatedTime || 0)}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Material
                name="local-fire-department"
                size={16}
                color={themes.COLORS.ORANGE_6}
              />
              <Text style={styles.subtitle}>
                {data?.workout.estimatedCalories} kcal
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Crystal
                size={16}
                color={
                  params.isFinished
                    ? themes.COLORS.GRAY_8
                    : themes.COLORS.BLUE_6
                }
              />
              <Text
                style={[
                  styles.subtitle,
                  params.isFinished && {
                    color: themes.COLORS.GRAY_8,
                    textDecorationLine: 'line-through',
                  },
                ]}
              >
                {data?.workout.availableCurrency} cristais
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.exercises}>
          {data?.workout.steps.map((step) => (
            <ExerciseItem
              key={step.exerciseId}
              name={step.name}
              duration={step.duration || 50}
              repetitions={step.repetitions}
              imageURL={
                step.previewUrl?.replace(
                  'http://localhost:3333',
                  String(process.env.EXPO_PUBLIC_API_URL),
                ) || ''
              }
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button title="Iniciar treino" onPress={handleStartWorkout} />
      </View>
    </View>
  )
}
