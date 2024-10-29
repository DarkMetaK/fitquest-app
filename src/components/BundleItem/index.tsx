import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { ImageBackground, Pressable, Text, View } from 'react-native'

import themes from '@/themes'

import { ProgressBar } from '../ProgressBar'
import { styles } from './styles'

interface BundleProps {
  title: string
  levelsAmount: number
  bannerUrl: string
}

export function BundleItem({ bannerUrl, title, levelsAmount }: BundleProps) {
  const navigation = useNavigation()

  function handleBundleDetails() {
    navigation.navigate('bundle', { id: '1' })
  }

  return (
    <ImageBackground
      source={{ uri: bannerUrl }}
      style={styles.container}
      resizeMode="cover"
    >
      <Pressable style={styles.content} onPress={handleBundleDetails}>
        <View style={styles.contentHeader}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Material
            name="arrow-circle-right"
            size={24}
            color={themes.COLORS.GREEN_6}
          />
        </View>

        <View style={styles.progress}>
          <Text style={styles.level}>{`0/${levelsAmount} fases`}</Text>
          <ProgressBar totalSteps={30} currentStep={1} />
        </View>
      </Pressable>
    </ImageBackground>
  )
}
