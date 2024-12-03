import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../appStore/context';

const StackAddEvent = ({route}) => {
  const {eventType} = route.params;
  const navigation = useNavigation();
  const {saveEvent} = useAppContext();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [description, setDescription] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (day) => {
    setDate(day.dateString);
    setShowCalendar(false);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
        if (!title || !date || !time || !location || !dressCode || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const formData = {
      id: Date.now().toString(),
      type: eventType,
      title: title,
      date: date,
      time: time,
      location: location,
      dressCode: dressCode,
      description: description,
    };
   

    saveEvent(formData);
    navigation.navigate('TabNavigation', { screen: 'TabEventsScreen' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back" size={24} color="#0A84FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Event</Text>
      </View>

      <ScrollView 
        style={styles.form}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#8E8E93"
              value={title}
              onChangeText={setTitle}
              editable={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <TouchableOpacity 
            style={styles.input}
            onPress={() => {
              Keyboard.dismiss();
              setShowCalendar(true);
            }}
          >
            <View style={styles.inputWithIcon}>
              <Icon name="calendar-outline" size={20} color="#8E8E93" />
              <Text style={styles.inputText}>
                {date || '30.11.2024'}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="20:00"
              placeholderTextColor="#8E8E93"
              value={time}
              onChangeText={setTime}
              editable={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Place"
              placeholderTextColor="#8E8E93"
              value={location}
              onChangeText={setLocation}
              editable={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Dress Code"
              placeholderTextColor="#8E8E93"
              value={dressCode}
              onChangeText={setDressCode}
              editable={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Description"
              placeholderTextColor="#8E8E93"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              editable={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleSubmit}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
              theme={{
                backgroundColor: '#1C1C1E',
                calendarBackground: '#1C1C1E',
                textSectionTitleColor: '#FFFFFF',
                selectedDayBackgroundColor: '#0A84FF',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#0A84FF',
                dayTextColor: '#FFFFFF',
                monthTextColor: '#FFFFFF',
              }}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default StackAddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: '#0A84FF',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#1C1C1E',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  closeButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
