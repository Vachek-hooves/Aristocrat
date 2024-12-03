import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Alert,
} from 'react-native';
import StackLayout from '../../components/layout/StackLaout';
import StackHeader from '../../components/Header/StackHeader';
import { useAppContext } from '../../appStore/context';
import { useNavigation } from '@react-navigation/native';

const StackCreateRule = () => {
  const navigation = useNavigation();
  const {saveCreatedRule} = useAppContext();
  const [title, setTitle] = useState('');
  const [rule, setRule] = useState('');
  
  const isDisabled = !title || !rule;

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!title && !rule) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newRule = {
      id: Date.now().toString(),
      title: title,
      rule: rule,
      isCreated: true, // To differentiate from general rules
    };

    saveCreatedRule(newRule);
    navigation.navigate('TabNavigation',{screen:'TabRulesScreen'});
  };

  return (
    <StackLayout>
      <StackHeader title={'Create Rule'} />
      
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Rule Title"
                placeholderTextColor="#8E8E93"
                value={title}
                onChangeText={setTitle}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Rule Description"
                placeholderTextColor="#8E8E93"
                value={rule}
                onChangeText={setRule}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          disabled={isDisabled}
          style={[styles.submitButton, {opacity: isDisabled ? 0.5 : 1}]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Save Rule</Text>
        </TouchableOpacity>
      </View>
    </StackLayout>
  );
};

export default StackCreateRule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: '#FFFFFF',
    fontSize: 16,
    padding: 16,
  },
  multilineInput: {
    height: 150,
    textAlignVertical: 'top',
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
