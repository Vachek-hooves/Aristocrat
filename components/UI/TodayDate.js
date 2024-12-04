import {Text, StyleSheet, View} from 'react-native';

const TodayDate = () => {
  const getCurrentDate = () => {
    const date = new Date();
    return date
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
      })
      .split('/')
      .join('.');
  };
  return <Text style={styles.dateText}>{getCurrentDate()}</Text>;
};

export default TodayDate;

const styles = StyleSheet.create({
  dateText: {
    fontSize: 16,
    color: '#0A84FF',
  },
});
