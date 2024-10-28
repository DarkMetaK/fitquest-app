import Material from '@expo/vector-icons/MaterialIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

const signInSchema = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório.' })
    .email({ message: 'E-mail inválido.' }),
  password: z
    .string({ message: 'Senha é obrigatório.' })
    .trim()
    .min(1, { message: 'Senha é obrigatório.' }),
})

type SignInForm = z.infer<typeof signInSchema>

export function SignIn() {
  const { handleSignIn } = useAuth()
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignInForm({ email, password }: SignInForm) {
    try {
      await handleSignIn(email, password, () => {
        navigation.navigate('metadata')
      })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message === 'Invalid credentials.'
          ? 'Credenciais inválidas.'
          : error.message
        : 'Erro no servidor, tente novamente mais tarde.'

      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: title,
        button: 'Fechar',
      })

      console.log(error)
    }
  }

  const shouldDisableButton = isSubmitting

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('welcome')}
          disabled={shouldDisableButton}
        >
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>

        <Text style={styles.title}>Acessar conta</Text>
      </View>

      <KeyboardAwareScrollView
        extraHeight={100}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 24,
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.form}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="E-mail"
                  iconName="email"
                  keyboardType="email-address"
                  error={errors.email?.message}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Senha"
                  iconName="lock"
                  secureTextEntry
                  error={errors.password?.message}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
              name="password"
            />
          </View>

          <View style={styles.btnContainer}>
            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignInForm)}
              disabled={shouldDisableButton}
              isLoading={isSubmitting}
            />
            <Button
              title="Não possuo cadastro"
              variant="secondary"
              onPress={() => navigation.navigate('sign-up')}
              disabled={shouldDisableButton}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
