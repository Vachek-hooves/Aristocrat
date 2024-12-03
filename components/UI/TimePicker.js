import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const TimePicker = ({ onTimeSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const times = Array.from({ length: 24 }, (_, hour) => 
    [`${hour}:00`, `${hour}:10`, `${hour}:20`, `${hour}:30`, `${hour}:40`, `${hour}:50`]
  ).flat();

  const handleSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeText}>
          {selectedTime || 'Select Time'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showPicker} transparent={true} animationType="slide" 
    //   style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <FlatList
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            data={times}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.timeOption}>
                <Text style={styles.timeOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  timeButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // height: 300,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 200,
    paddingBottom: 200,
},
flatListContent: {
    // marginBottom: 100,
    // marginTop: 100,
},
timeOption: {
      borderWidth: 1,
      borderColor: '#FFFFFF'+50,
    padding: 20,
    backgroundColor: '#1C1C1E',
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  timeOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TimePicker;