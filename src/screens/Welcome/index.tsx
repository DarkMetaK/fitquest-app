import { View, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import decorationImage from '@/assets/welcome-img.png'
import logoImage from '@/assets/logo.png'

import { styles } from './styles'
import { Button } from '@/components/Button'

export function Welcome() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={decorationImage} alt="" />
        <Image source={logoImage} alt="" />

        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <Button title="Criar Conta" onPress={() => {}} />
        <Button title="Já possuo cadastro" variant="secondary" />
      </View>
    </SafeAreaView>
  )
}
