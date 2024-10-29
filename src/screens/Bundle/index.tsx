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

import themes from '@/themes'

import { WorkoutItem } from './components/WorkoutItem'
import { styles } from './styles'

export function Bundle() {
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

        <Text style={styles.title}>Treino Iniciante</Text>
      </ImageBackground>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.workouts}>
          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 1"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 2"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 3"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 4"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 5"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 6"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>

          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <WorkoutItem
              title="Dia 7"
              availableCurrency={10}
              estimatedTime={30}
              exercisesAmount={5}
            />

            <View style={styles.unchecked} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
