import Material from '@expo/vector-icons/MaterialIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { createCustomer } from '@/api/create-customer'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
import { AuthRoutes } from '@/routes/auth.routes'
import themes from '@/themes'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

const signUpSchema = z
  .object({
    name: z
      .string({ message: 'Nome é obrigatório.' })
      .trim()
      .min(1, { message: 'Nome é obrigatório.' }),
    email: z
      .string({ message: 'E-mail é obrigatório.' })
      .email({ message: 'E-mail inválido.' }),
    password: z
      .string({ message: 'Senha é obrigatória.' })
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres.' }),
    confirmPassword: z
      .string({ message: 'Confirmação de senha é obrigatória.' })
      .min(6, { message: 'As senha não coincidem.' }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: 'custom',
        message: 'As senha não coincidem.',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpForm = z.infer<typeof signUpSchema>

type SignUpProps = NativeStackScreenProps<AuthRoutes, 'sign-up'>

export function SignUp({ navigation }: SignUpProps) {
  const { handleSignIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setFocus,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    shouldFocusError: false,
  })

  const { mutateAsync } = useMutation({
    mutationFn: createCustomer,
    onSuccess: async () => {
      try {
        await handleSignIn(getValues('email'), getValues('password'), () => {
          navigation.navigate('metadata')
        })
      } catch (error) {
        console.log(error)
        navigation.navigate('sign-in')
      }
    },
    onError: (error) => {
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

  async function handleSignUp({ name, email, password }: SignUpForm) {
    await mutateAsync({ name, email, password })
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
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>
          Seja bem vindo! Para criar sua conta precisamos de alguns dados
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
                  placeholder="Nome"
                  iconName="person"
                  error={errors.name?.message}
                  value={field.value}
                  onChangeText={field.onChange}
                  ref={field.ref}
                  onSubmitEditing={() => setFocus('email')}
                  returnKeyType="next"
                />
              )}
              name="name"
            />

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
                  onSubmitEditing={() => setFocus('confirmPassword')}
                  returnKeyType="next"
                />
              )}
              name="password"
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Confirmar senha"
                  iconName="lock"
                  secureTextEntry
                  error={errors.confirmPassword?.message}
                  value={field.value}
                  onChangeText={field.onChange}
                  ref={field.ref}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
              name="confirmPassword"
            />
          </View>

          <View style={styles.btnContainer}>
            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignUp)}
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

            <View style={styles.signIn}>
              <Text style={styles.signInText}>Já possui cadastro? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('sign-in')}>
                <Text style={styles.textHighlight}>Realize login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
