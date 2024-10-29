import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { ExerciseItem } from '@/components/ExerciseItem'
import { Crystal } from '@/components/Icon'
import themes from '@/themes'

import { styles } from './styles'

export function Workout() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[
          styles.header,
          { paddingTop: insets.top + 16, height: 160 + insets.top },
        ]}
        source={{
          uri: 'https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg',
        }}
        resizeMode="cover"
        alt=""
      >
        <View
          style={[
            styles.header,
            styles.overlay,
            { paddingTop: insets.top + 16, height: 160 + insets.top },
          ]}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={24} color={themes.COLORS.WHITE} />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Dia 1</Text>
          <Text style={styles.subtitle}>Treino iniciantes</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Material
                name="access-time"
                size={16}
                color={themes.COLORS.GREEN_6}
              />
              <Text style={styles.subtitle}>7 min</Text>
            </View>

            <View style={styles.infoItem}>
              <Material
                name="local-fire-department"
                size={16}
                color={themes.COLORS.ORANGE_6}
              />
              <Text style={styles.subtitle}>52.4 kcal</Text>
            </View>

            <View style={styles.infoItem}>
              <Crystal size={16} color={themes.COLORS.BLUE_6} />
              <Text style={styles.subtitle}>10 cristais</Text>
            </View>
          </View>
        </View>

        <View style={styles.exercises}>
          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />

          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />

          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />

          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />

          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />

          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />

          <ExerciseItem
            name="Postura do gato e da vaca sentada"
            duration="0:50"
            imageURL="https://alexandrebento.com.br/wp-content/uploads/2023/03/pilates.jpg"
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="Iniciar treino"
          onPress={() => navigation.navigate('exercise', { id: 'any' })}
        />
      </View>
    </View>
  )
}
