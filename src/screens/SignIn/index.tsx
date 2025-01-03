import Material from '@expo/vector-icons/MaterialIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
import { AuthRoutes } from '@/routes/auth.routes'
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

type SignInProps = NativeStackScreenProps<AuthRoutes, 'sign-in'>

export function SignIn({ navigation }: SignInProps) {
  const { handleSignIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: false,
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
      </View>

      <View style={styles.hero}>
        <Text style={styles.title}>Acessar conta</Text>
        <Text style={styles.subtitle}>
          Seja bem vindo de volta! Nós sentimos sua falta
        </Text>
      </View>

      <KeyboardAwareScrollView
        extraHeight={100}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 32,
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
                  ref={field.ref}
                  onSubmitEditing={() => setFocus('password')}
                  returnKeyType="next"
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
                  ref={field.ref}
                  onSubmitEditing={handleSubmit(handleSignInForm)}
                  returnKeyType="send"
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

            {/* <View style={styles.separator} />

            <Button
              title="Continuar com Google"
              variant="oauth"
              disabled={shouldDisableButton}
              provider="google"
              style={{}}
            /> */}

            <View style={styles.signUp}>
              <Text style={styles.signUpText}>Não possui conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('sign-up')}>
                <Text style={styles.textHighlight}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
