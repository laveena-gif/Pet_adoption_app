
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultPetProfiles } from './Api';

const AdoptionForm = ({ pet, onClose }) => {
  const [screen, setScreen] = useState('Adoption');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    homeAddress: '',
    numberOfPetsOwned: '',
    ownCurrentPet: '',
    currentPetDetails: '',
    agreesafe: false,
    agreeCosts: false,
    agreeVaccinations: false,
    agreeNotSell: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const isValidNumberOfPets = (numberOfPets) => /^\d{1,2}$/.test(numberOfPets);
  const isValidOwnCurrentPet = (ownCurrentPet) => /^(yes|no)$/i.test(ownCurrentPet);

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.homeAddress.trim() || !formData.numberOfPetsOwned.trim() || !formData.ownCurrentPet.trim()) {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
      return false;
    }

    if (formData.phoneNumber.trim().length !== 10 || !/^\d{10}$/.test(formData.phoneNumber.trim())) {
      Alert.alert('Invalid Phone Number', 'Please enter a 10-digit phone number.');
      return false;
    }

    if (!isValidNumberOfPets(formData.numberOfPetsOwned)) {
      Alert.alert('Invalid Input', 'Please enter a valid number of pets owned (maximum 2 digits).');
      return false;
    }

    if (!isValidOwnCurrentPet(formData.ownCurrentPet)) {
      Alert.alert('Invalid Input', 'Please enter "yes" or "no" for owning a pet at present.');
      return false;
    }

    if (formData.ownCurrentPet.toLowerCase() === 'yes' && !formData.currentPetDetails) {
      Alert.alert('Invalid Input', 'Please provide details of your current pet.');
      return false;
    }

    if (!formData.agreesafe || !formData.agreeCosts || !formData.agreeVaccinations || !formData.agreeNotSell) {
      Alert.alert('Incomplete Form', 'Please check all agreement boxes to proceed.');
      return false;
    }

    return true;
  };

  const onSubmit = async (formData) => {
    try {
      // let asyncStorageData = [...defaultPetProfiles];
      let asyncStorageData = [];
      await AsyncStorage.getItem('AdoptionData')
        .then(value => {
          if (value != null && JSON.parse(value).length) {
            asyncStorageData = [...JSON.parse(value)]
          }
        })
      asyncStorageData.map(item => {
        if (item.id == pet.id) {
          item.isAdopted = 'Yes';
          item.adoptedBy = formData.fullName;
          item.adoptedPhone = formData.phoneNumber;
          item.adoptedEmail = formData.emailAddress;
          item.adoptedAddress = formData.homeAddress;
          item.numberOfPetsOwned = formData.numberOfPetsOwned;
          item.ownCurrentPet = formData.ownCurrentPet;
          item.currentPetDetails = formData.currentPetDetails;
          item.isVerified = 3;
        }
        return item
      })
      await AsyncStorage.setItem('AdoptionData', JSON.stringify(asyncStorageData))
      console.log("AdoptionForm", asyncStorageData);
      setScreen('HomeScreen');
    } catch (error) {
      console.log('Error saving adoption form:', error);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if(screen === 'HomeScreen') return <HomeScreen />;
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.formTitle}>Adoption Form</Text>
          <View style={styles.formGroup}>
            <Text>Full Name:</Text>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Phone Number:</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Home Address:</Text>
            <TextInput
              style={styles.input
              }
              value={formData.homeAddress}
              onChangeText={(text) => handleInputChange('homeAddress', text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Number of Pets Owned:</Text>
            <TextInput
              style={styles.input}
              value={formData.numberOfPetsOwned}
              onChangeText={(text) => handleInputChange('numberOfPetsOwned', text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Do you own a pet at present? (yes/no)</Text>
            <TextInput
              style={styles.input}
              value={formData.ownCurrentPet}
              onChangeText={(text) => handleInputChange('ownCurrentPet', text)}
            />
          </View>
          {formData.ownCurrentPet.toLowerCase() === 'yes' && (
            <View style={styles.formGroup}>
              <Text>Details of Current Pet:</Text>
              <TextInput
                style={styles.input}
                value={formData.currentPetDetails}
                onChangeText={(text) => handleInputChange('currentPetDetails', text)}
              />
            </View>
          )}
          <Text style={styles.agreementInstructions}>To continue, please review and accept the following terms and conditions. </Text>
          <View style={styles.agreementContainer}>
            <TouchableOpacity
              style={[styles.checkbox, formData.agreesafe && styles.checked]}
              onPress={() => handleInputChange('agreesafe', !formData.agreesafe)}
            />
            <Text style={styles.agreementText}>
              I agree to provide a safe and loving home for the adopted pet.
            </Text>
          </View>
          <View style={styles.agreementContainer}>
            <TouchableOpacity
              style={[styles.checkbox, formData.agreeCosts && styles.checked]}
              onPress={() => handleInputChange('agreeCosts', !formData.agreeCosts)}
            />
            <Text style={styles.agreementText}>
              I understand that I am responsible for all costs associated with the pet's care, including food, vet care, and medications.
            </Text>
          </View>
          <View style={styles.agreementContainer}>
            <TouchableOpacity
              style={[styles.checkbox, formData.agreeVaccinations && styles.checked]}
              onPress={() => handleInputChange('agreeVaccinations', !formData.agreeVaccinations)}
            />
            <Text style={styles.agreementText}>
              I agree to keep the pet up-to-date on all vaccinations and comply with local licensing laws.
            </Text>
          </View>
          <View style={styles.agreementContainer}>
            <TouchableOpacity
              style={[styles.checkbox, formData.agreeNotSell && styles.checked]}
              onPress={() => handleInputChange('agreeNotSell', !formData.agreeNotSell)}
            />
            <Text style={styles.agreementText}>
              I understand that I am not permitted to sell or give away the pet without the consent of Paws for Adoption.
            </Text>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>🐾 Start Our Story 🐾</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AdoptionForm;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreementInstructions: {
    fontSize: 15,
    marginBottom: 10,
    color: '#301B3F',
  },
  modalContent: {
    backgroundColor: '#EDEDED',
    padding: 30,
    height: 915.7,
    borderRadius: 35,
    elevation: 7,
    marginTop: 15,
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 21.5,
    fontWeight: 'bold',
    color: '#301B3F',
    marginBottom: 12,
    marginTop: 7,
  },
  petDetailBreed: {
    fontSize: 21.5,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  petDetailInfo: {
    marginBottom: 5,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#301B3F',
    borderWidth: 1.2,
    borderRadius: 5,
    padding: 8,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#301B3F',
  },
  agreementText: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#301B3F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#301B3F',
    fontWeight: 'bold',
  },
});
