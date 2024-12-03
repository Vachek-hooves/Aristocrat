import {StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import StackLaout from '../../components/layout/StackLaout';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import StackHeader from '../../components/Header/StackHeader';

const StackAddEvent = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [description, setDescription] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSaveEvent = async () => {
    console.log('save event');
    setShowAnimation(true);

    const newEvent = {
      id: Date.now().toString().slice(-6),
      title,
      description,
      time,
      place,
      dressCode,
    };
    // save event to storage
  };

  return (
    <StackLaout>
      <StackHeader title={'Add Event'} />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          // onChangeText={setTitle}
        />
      </View>
    </StackLaout>
  );
};

export default StackAddEvent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});
