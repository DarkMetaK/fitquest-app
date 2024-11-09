import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImage from '@/assets/logo.png'
import decorationImage from '@/assets/welcome-img.png'
import { Button } from '@/components/Button'
import { AuthRoutes } from '@/routes/auth.routes'

import { styles } from './styles'

type WelcomeProps = NativeStackScreenProps<AuthRoutes, 'welcome'>

export function Welcome({ navigation }: WelcomeProps) {
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
        <Button
          title="Criar Conta"
          onPress={() => {
            navigation.navigate('sign-up')
          }}
        />
        <Button
          title="Já possuo cadastro"
          variant="secondary"
          onPress={() => {
            navigation.navigate('sign-in')
          }}
        />
      </View>
    </SafeAreaView>
  )
}
