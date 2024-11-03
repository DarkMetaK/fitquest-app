import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ScrollView, Text, View } from 'react-native'

import { Calendar } from '@/components/Calendar'
import { Header } from '@/components/Header'
import themes from '@/themes'

import { styles } from './styles'

export function Metrics() {
  return (
    <>
      <Header />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Estatísticas</Text>
          </View>

          <View style={styles.metrics}>
            <View style={styles.row}>
              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricValue}>10</Text>
                  <MaterialCommunityIcons
                    name="trophy"
                    size={20}
                    color={themes.COLORS.YELLOW_6}
                  />
                </View>
                <Text style={styles.metricTitle}>Treinos concluídos</Text>
              </View>

              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricValue}>30</Text>
                  <MaterialCommunityIcons
                    name="weight-lifter"
                    size={20}
                    color={themes.COLORS.BLUE_6}
                  />
                </View>
                <Text style={styles.metricTitle}>Exercícios realizados</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricValue}>1520</Text>
                  <MaterialCommunityIcons
                    name="heart"
                    size={20}
                    color={themes.COLORS.GREEN_6}
                  />
                </View>
                <Text style={styles.metricTitle}>Calorias queimadas</Text>
              </View>

              <View style={styles.metricItem}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricValue}>15</Text>
                  <MaterialCommunityIcons
                    name="fire"
                    size={20}
                    color={themes.COLORS.ORANGE_6}
                  />
                </View>
                <Text style={styles.metricTitle}>
                  Maior sequência adquirida
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Sequências de treino</Text>
          </View>

          <Calendar />
        </View>
      </ScrollView>
    </>
  )
}
