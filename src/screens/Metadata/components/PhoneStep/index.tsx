import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { z } from 'zod'

import { verifyPhoneAvailability } from '@/api/verify-phone-availability'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import {
  getUserMetadata,
  saveUserMetadata,
} from '@/libs/async-storage/metadata'
import { AppError } from '@/utils/AppError'

import { styles } from './styles'

interface PhoneStepProps {
  onChangeStep: () => void
}

const phoneValidationSchema = z.object({
  phone: z
    .string({ message: 'Telefone é obrigatório.' })
    .regex(/\d{2} \d{4,5}-\d{4}$/, { message: 'Telefone inválido.' }),
})

type PhoneValidationSchema = z.infer<typeof phoneValidationSchema>

export function PhoneStep({ onChangeStep }: PhoneStepProps) {
  const [storedPhone, setStoredPhone] = useState<string | undefined>()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<PhoneValidationSchema>({
    resolver: zodResolver(phoneValidationSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      phone: '',
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: verifyPhoneAvailability,
    onSuccess: async () => {
      await saveUserMetadata({ phone: getValues('phone') })
      onChangeStep()
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

  useEffect(() => {
    async function fetchStoredPhone() {
      const { phone } = await getUserMetadata()

      if (phone) {
        setValue('phone', phone)
        setStoredPhone(phone)
      }
    }

    fetchStoredPhone()
  }, [setValue])

  async function handlePhoneValidation(data: PhoneValidationSchema) {
    if (storedPhone && storedPhone === data.phone) {
      onChangeStep()
      return
    }

    await mutateAsync({ phone: data.phone })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Só mais algumas informações!</Text>
          <Text style={styles.subtitle}>
            Seu número de telefone é essencial para garantir a segurança da sua
            conta.
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        <View>
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
        </View>

        <Button
          title="Enviar código"
          onPress={handleSubmit(handlePhoneValidation)}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </View>
    </>
  )
}
