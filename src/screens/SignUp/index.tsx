import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import themes from '@/themes'

import { styles } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const signUpSchema = z
  .object({
    name: z
      .string({ message: 'Nome é obrigatório.' })
      .trim()
      .min(1, { message: 'Nome é obrigatório.' }),
    email: z
      .string({ message: 'E-mail é obrigatório.' })
      .email({ message: 'E-mail inválido.' }),
    phone: z
      .string({ message: 'Telefone é obrigatório.' })
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Telefone inválido.' }),
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

export function SignUp() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const shouldDisableButton = isSubmitting

  async function handleSignUp(data: SignUpForm) {
    console.log(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('welcome')}
          disabled={shouldDisableButton}
        >
          <Material name="arrow-back" size={24} color={themes.COLORS.GRAY_12} />
        </TouchableOpacity>

        <Text style={styles.title}>Criar conta</Text>
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
                  placeholder="Nome"
                  iconName="person"
                  error={errors.name?.message}
                  value={field.value}
                  onChangeText={field.onChange}
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
                  placeholder="Telefone"
                  iconName="phone"
                  error={errors.phone?.message}
                  prefix="+55"
                  mask="phone"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
              name="phone"
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
                />
              )}
              name="confirmPassword"
            />
          </View>

          <View style={styles.btnContainer}>
            <Button
              title="Criar Conta"
              onPress={handleSubmit(handleSignUp)}
              disabled={shouldDisableButton}
              isLoading={isSubmitting}
            />
            <Button
              title="Já possuo cadastro"
              variant="secondary"
              onPress={() => navigation.navigate('sign-in')}
              disabled={shouldDisableButton}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
