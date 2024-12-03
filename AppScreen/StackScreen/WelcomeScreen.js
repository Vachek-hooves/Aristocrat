import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {welcomeData} from '../../data/appWelcomeData';
import {useState, useEffect} from 'react';
import {colors} from '../../constants/color';

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

  // console.log(thisWelcomeData);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={thisWelcomeData.image} style={styles.image} />
        <Text style={styles.title}> {thisWelcomeData.title}</Text>
        <Text style={styles.description}> {thisWelcomeData.text}</Text>
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
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    alignContent: 'center',
    paddingBottom: 100,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
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
    backgroundColor: colors.pagination,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.pagination,
    width: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  btnContainer: {
    padding: 20,
    backgroundColor: colors.gray,
    marginHorizontal: 20,
    borderRadius: 100,
  },
  button: {
    backgroundColor: colors.pagination,
    padding: 10,
    borderRadius: 100,
    width: '30%',
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
