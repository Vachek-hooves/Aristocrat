import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import TodayDate from '../UI/TodayDate';

const TabHeader = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Text style={styles.dateText}><TodayDate/></Text>
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

});
