import { View, TextInput, Text, TextInputProps } from 'react-native'
import Material from '@expo/vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text'

import { styles } from './styles'
import themes from '@/themes'

interface InputProps extends TextInputProps {
  iconName?: keyof typeof Material.glyphMap
  error?: string
  prefix?: string
  mask?: 'phone'
}

export function Input({
  iconName,
  error,
  prefix,
  mask,
  style: customStyle,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {iconName && (
          <View style={styles.icon}>
            <Material name={iconName} size={24} color={themes.COLORS.GRAY_8} />
          </View>
        )}

        {prefix && <Text>{prefix}</Text>}

        {mask === 'phone' ? (
          <TextInputMask
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            style={[styles.input, customStyle]}
            placeholderTextColor={themes.COLORS.GRAY_8}
            {...rest}
          />
        ) : (
          <TextInput
            style={[styles.input, customStyle]}
            placeholderTextColor={themes.COLORS.GRAY_8}
            {...rest}
          />
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}
