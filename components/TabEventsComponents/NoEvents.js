import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NoEvents = () => {
  return (
    <View style={styles.container}>
      <Icon name="null" size={100} color="#8E8E93" />
      <Text style={styles.text}>No events found</Text>
    </View>
  )
}

export default NoEvents

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})