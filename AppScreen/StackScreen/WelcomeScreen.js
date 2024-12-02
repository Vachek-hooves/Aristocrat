import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {welcomeData} from '../../data/appWelcomeData';
import {useState, useEffect} from 'react';

const WelcomeScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < welcomeData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('TabNavigation');
    }
  };


  const thisWelcomeData = welcomeData[currentIndex];

  console.log(thisWelcomeData);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text> {thisWelcomeData.title}</Text>
        <Text> {thisWelcomeData.text}</Text>
        <Image source={thisWelcomeData.image} style={styles.image} />
      </View>

      <View style={styles.paginationContainer}>
        {welcomeData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* buttons */}

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6F4D7B',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'black',
    width: 24,
  },
});
