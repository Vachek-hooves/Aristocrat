import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { colors } from '../../constants/color'

const TabLayout = ({children}) => {
  return (
    <SafeAreaView style={styles.container}> 
      {children}
    </SafeAreaView>
  ) 
}

export default TabLayout

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.main
  }
})
