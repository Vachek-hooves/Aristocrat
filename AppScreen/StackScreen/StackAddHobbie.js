import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import StackLayout from '../../components/layout/StackLaout';
import StackHeader from '../../components/Header/StackHeader';
import {useAppContext} from '../../appStore/context';
import {Hobbies} from '../../data/hobbieTypes';

const StackAddHobbie = ({navigation}) => {
  const {addHobby,hobbies} = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  console.log(hobbies);

  const isDisabled = !title || !description || !selectedType;

  const handleSubmit = () => {
    if (isDisabled) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newHobby = {
      id: Date.now().toString(),
      title,
      description,
      type: selectedType,
    };
    console.log(newHobby);
    addHobby(newHobby);
    Alert.alert('Success', 'Hobby added successfully');
    setTitle('');
    setDescription('');
    setSelectedType('');
    navigation.navigate('TabNavigation',{screen:'TabHobbiesScreen'});
  };

  return (
    <StackLayout>
      <StackHeader title={'Add Hobby'} />
      <View style={styles.container}>
        <View style={styles.form}>
          <ScrollView
            horizontal
            style={styles.typeSelector}
            showsHorizontalScrollIndicator={false}>
            {Hobbies.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeButton,
                  selectedType === type && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType(type)}>
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === type && styles.selectedTypeButtonText,
                  ]}>
                  {type.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Hobby Title"
            placeholderTextColor="#8E8E93"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Hobby Description"
            placeholderTextColor="#8E8E93"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          disabled={isDisabled}
          style={[styles.submitButton, {opacity: isDisabled ? 0.5 : 1}]}
          onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Hobby</Text>
        </TouchableOpacity>
      </View>
    </StackLayout>
  );
};

export default StackAddHobbie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    // flex: 1,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8E8E93',
    marginRight: 8,
  },
  selectedTypeButton: {
    backgroundColor: '#0A84FF',
  },
  typeButtonText: {
    color: '#8E8E93',
  },
  selectedTypeButtonText: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 16,
    marginBottom: 16,
  },
  multilineInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#0A84FF',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
