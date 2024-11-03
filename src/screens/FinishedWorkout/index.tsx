import { StackActions, useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { BackHandler, Text, View } from 'react-native'

import { Stars } from '@/components/Stars'

import { Button } from '../../components/Button'
import { styles } from './styles'

export function FinishedWorkout() {
  const navigation = useNavigation()
  const popAction = StackActions.pop(2)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.dispatch(popAction)
        return true
      },
    )

    return () => backHandler.remove()
  })

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Stars />

        <Text style={styles.title}>Treino Concluido</Text>
      </View>

      <Button
        title="Continuar"
        onPress={() => navigation.dispatch(popAction)}
      />
    </View>
  )
}
