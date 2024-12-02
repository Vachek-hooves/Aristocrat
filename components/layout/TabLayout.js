import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/color'

const TabLayout = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default TabLayout

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.main
  }
})
