import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Events} from '../../data/events';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const StackCreateEvent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigation = useNavigation();

  const eventColors = {
    Meeting: '#FF9F0A',
    Supper: '#0A84FF',
    Party: '#BF5AF2',
    Conference: '#FF453A',
    Seminar: '#32D74B',
    Training: '#64D2FF',
    Wedding: '#BF5AF2',
    Birthday: '#FF453A',
    Exhibition: '#FF9F0A',
    Concert: '#0A84FF',
  };

  const handleNext = () => {
    if (selectedEvent) {
      // Navigate to next screen with selected event
      console.log('Selected event:', selectedEvent);
      // navigation.navigate('StackAddEvent', {eventType: selectedEvent});
      // navigation.navigate('NextScreen', { eventType: selectedEvent });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#0A84FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Event</Text>
      </View>

      <Text style={styles.sectionTitle}>Type of event</Text>

      <ScrollView style={styles.eventList} showsVerticalScrollIndicator={false}>
        {Events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={[
              styles.eventButton,
              {backgroundColor: eventColors[event.title] || '#0A84FF'},
              selectedEvent === event.title && styles.selectedEvent,
            ]}
            onPress={() => setSelectedEvent(event.title)}>
            <Text style={styles.eventButtonText}>{event.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextButton, {opacity: selectedEvent ? 1 : 0.5}]}
        onPress={handleNext}
        disabled={!selectedEvent}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StackCreateEvent;

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
  sectionTitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
  eventList: {
    flex: 1,
  },
  eventButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedEvent: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  eventButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
});
