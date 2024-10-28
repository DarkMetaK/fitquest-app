import { Text, View } from 'react-native'
import WheelPickerLib from 'react-native-wheely'

import { styles } from './styles'

interface WheelPickerProps {
  options: string[]
  selectedIndex: number
  label?: string
  onChange: (index: number) => void
}

export function WheelPicker({
  options,
  selectedIndex,
  label,
  onChange,
}: WheelPickerProps) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <WheelPickerLib
        options={options}
        selectedIndex={selectedIndex}
        onChange={onChange}
        itemHeight={96}
        itemTextStyle={styles.text}
        selectedIndicatorStyle={styles.selector}
        flatListProps={{ testID: 'wheelPicker' }}
        containerStyle={{ flex: 1 }}
      />

      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  )
}
