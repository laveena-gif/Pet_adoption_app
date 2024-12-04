import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./HomeScreen";

const AddScreen = () => {
  const [screen, setScreen] = useState('AddScreen');

  const NewAdoptionForm = ({ onBackPress }) => {
    const [formData, setFormData] = useState({
      breed: '',
      type: '',
      gender: '',
      whenwheredescription: '',
      conditiondescription: '',
      informationdescription: '',
    });

    const handleBackButton = () => {
      onBackPress(); 
    };

    const handleInputChange = (key, value) => {
      // console.log(formData)
      setFormData((prevData) => ({ ...prevData, [key]: value }));
      // setFormData({
      //   ...formData,
      //   [key]: value,
      // });
    };

    const handleSubmit = async () => {
      const { breed, type, gender, whenwheredescription, conditiondescription, informationdescription } = formData;
      if (!breed || !type || !gender || !whenwheredescription || !conditiondescription || !informationdescription) {
        Alert.alert('Incomplete Form', 'Please fill in all fields before submitting.');
        return;
      }

      let asyncStorageData = [];
      await AsyncStorage.getItem('AdoptionData').then((value) => {
        if (value != null && JSON.parse(value).length) {
          asyncStorageData = [...JSON.parse(value)];
        }
      });
      const newFormData = { ...formData };
      newFormData['id'] = asyncStorageData.length + 1;
      newFormData['breed'] = formData.breed;
      newFormData['address'] = '';
      newFormData['gender'] = formData.gender;
      newFormData['age'] = '';
      newFormData['type'] = formData.type;
      newFormData['temperament'] = '';
      newFormData['training'] = '';
      newFormData['vaccinated'] = '';
      newFormData['description'] = '';
      newFormData['image'] = '';
      newFormData['isVerified'] = 0;
      newFormData['isAdopted'] = 'No';
      newFormData['adoptedBy'] = '';
      newFormData['adoptedPhone'] = '';
      newFormData['adoptedEmail'] = '';
      newFormData['adoptedAddress'] = '';
      newFormData['whenwheredescription'] = formData.whenwheredescription;
      newFormData['conditiondescription'] = formData.conditiondescription;
      newFormData['informationdescription'] =  formData.informationdescription;
      newFormData['numberOfPetsOwned'] =  formData.numberOfPetsOwned;
      newFormData['ownCurrentPet'] =  formData.ownCurrentPet;
      newFormData['currentPetDetails'] =  formData.currentPetDetails;

      const newDataSet = [...asyncStorageData, newFormData];
      console.log("AddScreen", newDataSet);
      try {
        await AsyncStorage.setItem('AdoptionData', JSON.stringify(newDataSet));
        setScreen('HomeScreen');
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
            <Image source={require('./assets/left-arrow.png')} style={styles.backButtonIcon} />
          </TouchableOpacity>
          <Text style={styles.mainHeading}>🐾A Profile of Pawsibilities🐾</Text>
          <Text style={styles.subHeading}>Unveil the Potential of Your Rescue</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input1}
              placeholder="Breed"
              value={formData.breed}
              onChangeText={(text) => handleInputChange('breed', text)}
            />
            <View style={styles.selectOption}>
              <Text style={styles.selectOptionLabel}>Gender:</Text>
              <TouchableOpacity onPress={() => handleInputChange('gender', '♂️ M')}>
                <Text style={[styles.selectOptionText, formData.gender === '♂️ M' && styles.selectedOption]}>{'♂️ M'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleInputChange('gender', '♀️ F')}>
                <Text style={[styles.selectOptionText, formData.gender === '♀️ F' && styles.selectedOption]}>{'♀️ F'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleInputChange('gender', 'Not aware')}>
                <Text style={[styles.selectOptionText, formData.gender === 'Not aware' && styles.selectedOption]}>{'Not aware'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectOption}>
              <Text style={styles.selectOptionLabel}>Pet Category:</Text>
              <TouchableOpacity onPress={() => handleInputChange('type', 'Dogs')}>
                <Text style={[styles.selectOptionText, formData.type === 'Dogs' && styles.selectedOption]}>{'Dogs'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleInputChange('type', 'Cats')}>
                <Text style={[styles.selectOptionText, formData.type === 'Cats' && styles.selectedOption]}>{'Cats'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleInputChange('type', 'Others')}>
                <Text style={[styles.selectOptionText, formData.type === 'Others' && styles.selectedOption]}>{'Others'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.selectOptionLabel}>Where and when did you find the animal?</Text>
            <TextInput
              style={styles.input2}
              placeholder="Description of the location, date and time."
              value={formData.whenwheredescription}
              onChangeText={(text) => handleInputChange('whenwheredescription', text)}
            />
             <Text style={styles.selectOptionLabel}>What were the conditions the animal was in when you found it?</Text>
            <TextInput
              style={styles.input2}
              placeholder="Was it injured, malnourished, scared or behaving strangely?"
              value={formData.conditiondescription}
              onChangeText={(text) => handleInputChange('conditiondescription', text)}
            />
             <Text style={styles.selectOptionLabel}>Do you have any information about the animal's previous life?</Text>
            <TextInput
              style={styles.input2}
              placeholder=" Was it stray, abandoned or possibly neglected? "
              value={formData.informationdescription}
              onChangeText={(text) => handleInputChange('informationdescription', text)}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    };

  const renderSelectedScreen = () => {
    if (screen === 'AddScreen') {
      return <NewAdoptionForm onBackPress={() => setScreen('HomeScreen')} />;
    } else if (screen === 'HomeScreen') {
      return <HomeScreen />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      {renderSelectedScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25.2,
    backgroundColor: '#301B3F',
  },
  backButton: {
    zIndex: 1,
  },
  backButtonIcon: {
    width: 42,
    height: 42,
    marginTop: 21.7,
  },
  mainHeading: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 17.5,
    color: 'white',
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
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  input1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 17,
    paddingLeft: 10,
  },
  input2: {
    height: 95,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 17,
    paddingLeft: 10, 
  },
  uploadIcon: {
    width: 45,
    height: 45, 
    right: -105,
    top: -27,
    marginBottom: -15,
  },
  selectOption: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  selectOptionLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    marginBottom: 7.5,
  },
  selectOptionText: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 4.7,
  },
  selectedOption: {
    backgroundColor: '#BB9CC0',
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#BB9CC0',
    padding: 10,
    borderRadius: 5,
    marginTop: 7,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddScreen;
