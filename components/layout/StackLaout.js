import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { colors } from '../../constants/color';

const StackLaout = ({children}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

      {children}
      </SafeAreaView>
    </View>
  )
}

export default StackLaout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  safeArea:{
    flex:1
  }
});
