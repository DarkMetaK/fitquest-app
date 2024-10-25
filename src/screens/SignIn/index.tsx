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

const signUpSchema = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório.' })
    .email({ message: 'E-mail inválido.' }),
  password: z.string({ message: 'Senha é obrigatória.' }),
})

type SignUpForm = z.infer<typeof signUpSchema>

export function SignIn() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const shouldDisableButton = isSubmitting

  async function handleSignIn(data: SignUpForm) {
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
              onPress={handleSubmit(handleSignIn)}
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
