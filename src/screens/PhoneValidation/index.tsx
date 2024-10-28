import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { verifyPhoneAvailability } from '@/api/verify-phone-availability'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

const phoneValidationSchema = z.object({
  phone: z
    .string({ message: 'Telefone é obrigatório.' })
    .regex(/\d{2} \d{4,5}-\d{4}$/, { message: 'Telefone inválido.' }),
})

type PhoneValidationSchema = z.infer<typeof phoneValidationSchema>

export function PhoneValidation() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneValidationSchema>({
    resolver: zodResolver(phoneValidationSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      phone: '',
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: verifyPhoneAvailability,
    onSuccess: () => {
      navigation.navigate('metadata')
    },
    onError: (error) => {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Erro no servidor.'

      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: title,
        button: 'Fechar',
      })

      console.log(error)
    },
  })

  async function handlePhoneValidation({ phone }: PhoneValidationSchema) {
    await mutateAsync({ phone })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Telefone"
              iconName="phone"
              prefix="+55"
              mask="phone"
              error={errors.phone?.message}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="phone"
        />

        <Button
          title="Enviar código"
          onPress={handleSubmit(handlePhoneValidation)}
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{ width: 'auto' }}
        />
      </View>
    </SafeAreaView>
  )
}
