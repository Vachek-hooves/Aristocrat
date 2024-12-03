import {StyleSheet, Text, View} from 'react-native';
import { colors } from '../../constants/color';

const StackLaout = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default StackLaout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
});
