import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  TextInput,
  Alert
} from 'react-native';
import TabLayout from '../../components/layout/TabLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const TabProfileScreen = () => {
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedImageUri = await AsyncStorage.getItem('userImageUri');

      if (storedName || storedImageUri) {
        setIsNewUser(false);
        if (storedName) {
          setName(storedName);
          setTempName(storedName);
        }
        if (storedImageUri) setImageUri(storedImageUri);
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel && result.assets[0]) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        if (!isNewUser) {
          await AsyncStorage.setItem('userImageUri', uri);
        }
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };

  const handleSave = async () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    try {
      await AsyncStorage.setItem('userName', tempName);
      if (imageUri) {
        await AsyncStorage.setItem('userImageUri', imageUri);
      }
      setName(tempName);
      setIsNewUser(false);
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved successfully');
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const deleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['userName', 'userImageUri']);
              setName('');
              setTempName('');
              setImageUri(null);
              setIsEditing(false);
              setIsNewUser(true);
              Alert.alert('Success', 'Profile deleted successfully');
            } catch (error) {
              console.error('Failed to delete profile:', error);
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ]
    );
  };

  if (isNewUser) {
    return (
      <TabLayout>
        <View style={styles.container}>
          <View style={styles.createProfileCard}>
            <TouchableOpacity 
              onPress={pickImage}
              style={styles.imageContainer}
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>Change Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.createNameInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter your name"
              placeholderTextColor="#8E8E93"
            />

            <View style={styles.createButtonContainer}>
              <TouchableOpacity 
                style={[styles.createButton, !tempName.trim() && styles.disabledButton]}
                onPress={handleSave}
                disabled={!tempName.trim()}
              >
                <Text style={styles.createButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TabLayout>
    );
  }

  return (
    <TabLayout>
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <TouchableOpacity 
            onPress={isEditing ? pickImage : null}
            style={styles.imageContainer}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Add Photo</Text>
              </View>
            )}
            {isEditing && (
              <View style={styles.editOverlay}>
                <Text style={styles.editOverlayText}>Change Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your name"
                placeholderTextColor="#8E8E93"
              />
            ) : (
              <Text style={styles.nameText}>{name}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity 
                  style={styles.editButton} 
                  onPress={() => {
                    setTempName(name);
                    setIsEditing(false);
                  }}
                >
                  <Text style={[styles.editButtonText, { color: '#FF3B30' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.editButton} 
                  onPress={handleSave}
                >
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={deleteProfile}
        >
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </TabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  profileCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
      width: 200,
    height: 200,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editOverlayText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#0A84FF',
    paddingBottom: 4,
    minWidth: 150,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: '#0A84FF',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  createProfileCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  createNameInput: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#0A84FF',
    paddingVertical: 8,
    width: '80%',
    marginTop: 20,
  },
  createButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  createButton: {
    backgroundColor: '#0A84FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default TabProfileScreen;