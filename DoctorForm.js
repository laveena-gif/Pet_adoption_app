import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const DoctorForm = ({ onClose, selectedId }) => {
  const [formData, setFormData] = useState({
    breed: '',
    address: '',
    gender: '',
    age: '',
    type: '',
    temperament: '',
    training: '',
    vaccinated: '',
    description: '',
    image: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSelectOption = (key, option) => {
    handleInputChange(key, option);
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        Alert.alert('Permission denied', 'Permission to access camera roll is required!');
        return;
      }
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log(pickerResult)
  
        setFormData({
          ...formData,
          image: pickerResult.assets[0].uri,
        });
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };
  

  const validateAge = (age) => {
    return /^[0-9]{1,2}$/.test(age);
  };

  const isFormFilled = () => {
    for (const key in formData) {
      if (formData[key] === '') {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormFilled()) {
      Alert.alert('Alert', 'Please fill in all fields.');
      return;
    }

    if (!validateAge(formData.age)) {
      Alert.alert('Alert', 'Please enter a valid age (maximum of 2 digits).');
      return;
    }

    try {
      const adoptionData = await AsyncStorage.getItem('AdoptionData');
      const parsedData = adoptionData ? JSON.parse(adoptionData) : [];
      const newFormData = { ...formData };
      const index = parsedData.findIndex(item => item.id === selectedId);
      parsedData[index]['breed'] = newFormData.breed;
      parsedData[index]['address'] = newFormData.address;
      parsedData[index]['gender'] = newFormData.gender;
      parsedData[index]['age'] = newFormData.age;
      parsedData[index]['type'] = newFormData.type;
      parsedData[index]['temperament'] = newFormData.temperament;
      parsedData[index]['training'] = newFormData.training;
      parsedData[index]['vaccinated'] = newFormData.vaccinated;
      parsedData[index]['description'] = newFormData.description;
      parsedData[index]['image'] = newFormData.image;
      parsedData[index]['isVerified'] = 1;
      parsedData[index]['isAdopted'] = 'No';
      console.log("DoctorForm", parsedData)
      await AsyncStorage.setItem('AdoptionData', JSON.stringify(parsedData));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>🐾A Profile of Pawsibilities🐾</Text>
      <Text style={styles.subHeading}>Unveil the Potential of Your Rescue</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, styles.borderedInput, styles.start]}
          placeholder="Breed"
          value={formData.breed}
          onChangeText={(text) => handleInputChange('breed', text)}
        />
        <TextInput
          style={[styles.input, styles.borderedInput]}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionLabel}>Gender:</Text>
          <TouchableOpacity onPress={() => handleSelectOption('gender', 'Male')}>
            <Text style={[styles.selectOptionText, formData.gender === 'Male' && styles.selectedOptionText]}>{'♂️ M'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('gender', 'Female')}>
            <Text style={[styles.selectOptionText, formData.gender === 'Female' && styles.selectedOptionText]}>{'♀️ F'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('gender', 'Not aware')}>
            <Text style={[styles.selectOptionText, formData.gender === 'Not aware' && styles.selectedOptionText]}>{'Not aware'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, styles.borderedInput]}
          placeholder="Age"
          value={formData.age}
          onChangeText={(text) => handleInputChange('age', text)}
        />
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionLabel}>Pet Category:</Text>
          <TouchableOpacity onPress={() => handleSelectOption('type', 'Dogs')}>
            <Text style={[styles.selectOptionText, formData.type === 'Dogs' && styles.selectedOptionText]}>{'Dogs'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('type', 'Cats')}>
            <Text style={[styles.selectOptionText, formData.type === 'Cats' && styles.selectedOptionText]}>{'Cats'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('type', 'Others')}>
            <Text style={[styles.selectOptionText, formData.type === 'Others' && styles.selectedOptionText]}>{'Others'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionLabel}>Temperament:</Text>
        </View>
        <View style={styles.selectOption}>
          <TouchableOpacity onPress={() => handleSelectOption('temperament', 'Protective')}>
            <Text style={[styles.selectOptionText, formData.temperament === 'Protective' && styles.selectedOptionText]}>{'Protective'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('temperament', 'Playful')}>
            <Text style={[styles.selectOptionText, formData.temperament === 'Playful' && styles.selectedOptionText]}>{'Playful'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectOption}>
          <TouchableOpacity onPress={() => handleSelectOption('temperament', 'Affectionate')}>
            <Text style={[styles.selectOptionText, formData.temperament === 'Affectionate' && styles.selectedOptionText]}>{'Affectionate'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('temperament', 'Gentle')}>
            <Text style={[styles.selectOptionText, formData.temperament === 'Gentle' && styles.selectedOptionText]}>{'Gentle'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionLabel}>Training:</Text>
        </View>
        <View style={styles.selectOption}>
          <TouchableOpacity onPress={() => handleSelectOption('training', 'Needs training')}>
            <Text style={[styles.selectOptionText, formData.training === 'Needs training' && styles.selectedOptionText]}>{'Needs training'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('training', 'Has basic training')}>
            <Text style={[styles.selectOptionText, formData.training === 'Has basic training' && styles.selectedOptionText]}>{'Has basic training'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectOption}>
          <TouchableOpacity onPress={() => handleSelectOption('training', 'Well trained')}>
            <Text style={[styles.selectOptionText, formData.training === 'Well trained' && styles.selectedOptionText]}>{'Well trained'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionLabel}>Vaccinated:</Text>
        </View>
        <View style={styles.selectOption}>
          <TouchableOpacity onPress={() => handleSelectOption('vaccinated', 'Yes')}>
            <Text style={[styles.selectOptionText, formData.vaccinated === 'Yes' && styles.selectedOptionText]}>{'Yes'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectOption('vaccinated', 'No')}>
            <Text style={[styles.selectOptionText, formData.vaccinated === 'No' && styles.selectedOptionText]}>{'No'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, styles.borderedInput, styles.descriptionInput]}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
            <Text style={styles.selectOptionLabel}>Upload Image:</Text>
            <Image source={require('./assets/upload.png')} style={styles.uploadIcon} />
          </TouchableOpacity>
          {formData.image && (
            <Image source={{ uri: formData.image }} style={styles.uploadedImage} />
          )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
          <Text style={styles.submitButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25.2,
    backgroundColor: '#301B3F',
  },
  mainHeading: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 21.7,
    color: 'white',
  },
  start: {
    top: 7.5,
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 18.7,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 21,
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 17,
    marginBottom: 75,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  borderedInput: {
    borderColor: 'black',
    borderWidth: 1,
  },
  selectOption: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  selectOptionLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectOptionText: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 4.7,
  },
  selectedOptionText: {
    backgroundColor: '#BB9CC0',
  },
  submitButton: {
    backgroundColor: '#BB9CC0',
    padding: 10,
    borderRadius: 5,
    marginTop: 7,
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: '#BB9CC0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadIcon: {
    width: 45,
    height: 45,
    right: -105,
    top: -27,
    marginBottom: -15,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'auto',
    marginBottom: 15,
  },
});

export default DoctorForm;