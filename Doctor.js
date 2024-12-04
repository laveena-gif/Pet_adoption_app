import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorForm from './DoctorForm';
import DocProfile from './DocProfile';

const Doctor = () => {
  const [screen, setScreen] = useState('Doctor');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [PetCards, setPetCards] = useState([]);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    getAdoptionData();
  }, []);

  const getAdoptionData = async () => {
    try {
      const data = await AsyncStorage.getItem('AdoptionData');
      if (data !== null) {
        setPetCards(JSON.parse(data).filter(item => item.isVerified == 0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSelectedFormData = (selectedState, selectedId) => {
    setShowDoctorForm(selectedState)
    setSelectedId(selectedId)
  }

  const handleOnclose = () => {
    setShowDoctorForm(false)
    getAdoptionData()
  }
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    handleSearchPress();
  };

  const handleReject = async(id) => {
    try {
      const adoptionData = await AsyncStorage.getItem('AdoptionData');
      const parsedData = adoptionData ? JSON.parse(adoptionData) : [];
      const index = parsedData.findIndex(item=> item.id === id);
      parsedData[index]['isVerified'] = 2;
      await AsyncStorage.setItem('AdoptionData', JSON.stringify(parsedData));
    } catch (error) {
      console.log(error);
    }
    getAdoptionData()
  }

  const handleSearchPress = () => {
    let updatedPets = PetCards;

    if (searchTerm || selectedCategory) {
      if (selectedCategory) {
        updatedPets = updatedPets.filter((pet) => pet.type === selectedCategory);
      }

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        updatedPets = updatedPets.filter(
          (pet) =>
            pet.breed.toLowerCase().includes(searchTermLower) ||
            pet.type.toString().includes(searchTerm) ||
            pet.gender.toLowerCase().includes(searchTermLower) ||
            pet.conditiondescription.toLowerCase().includes(searchTermLower) ||
            pet.informationdescription.toLowerCase().includes(searchTermLower) ||
            pet.whenwheredescription.toLowerCase().includes(searchTermLower)
        );
      }

      setFilteredPets(updatedPets);

      if (updatedPets.length === 0) {
        Alert.alert("No Results", "My brain just did a 404 Not Found on your request. Please re-meow-nd!");
      }
    } else {
      setFilteredPets([]);
    }
  };

  const renderPetCards = () => {
    const petsToRender = filteredPets.length > 0 ? filteredPets : PetCards;
    return petsToRender.map((pet, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.heading}>Breed: {pet.breed}</Text>
        <Text style={styles.heading}>Type: {pet.type}</Text>
        <Text style={styles.heading}>Gender: {pet.gender}</Text>
        <Text style={styles.heading}>Location and Date Found: {pet.whenwheredescription}</Text>
        <Text style={styles.heading}>Conditions: {pet.conditiondescription}</Text>
        <Text style={styles.heading}>Previous Life Information: {pet.informationdescription}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => setSelectedFormData(true, pet.id)}>
            <Text style={styles.buttonText}>Accept ✔️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleReject(pet.id)}>
            <Text style={styles.buttonText}>Reject ❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Dogs':
        return require('./assets/happy.png');
      case 'Cats':
        return require('./assets/laughing.png');
      case 'Others':
        return require('./assets/pet-care.png');
      default:
        return null;
    }
  };

  const totalCount = filteredPets.length > 0 ? filteredPets.length : PetCards.length;

  const handleFooterPress = (category) => {
    switch (category) {
      case 'Home':
        setScreen('Doctor');
        break;
      case 'Profile':
        setScreen('DocProfile');
        break;
      default:
        break;
    }
  };

  const renderSelectedScreen = () => {
    switch (screen) {
      case 'Doctor':
        return (
          <ScrollView>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search your Soulmate 🐾"
                onChangeText={(text) => setSearchTerm(text)}
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
                <Text style={styles.searchButtonText}>🔍</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={styles.categoriesContainer}>
                <TouchableOpacity
                  style={[styles.categoryIcon, selectedCategory === 'Dogs' && styles.selectedCategory]}
                  onPress={() => handleCategoryPress('Dogs')}
                >
                  <Image source={getCategoryIcon('Dogs')} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryIcon, selectedCategory === 'Cats' && styles.selectedCategory]}
                  onPress={() => handleCategoryPress('Cats')}
                >
                  <Image source={getCategoryIcon('Cats')} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryIcon, selectedCategory === 'Others' && styles.selectedCategory]}
                  onPress={() => handleCategoryPress('Others')}
                >
                  <Image source={getCategoryIcon('Others')} style={styles.iconImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.countSeeAllContainer}>
                <Text style={styles.countText}>{`${totalCount} Results`}</Text>
                <TouchableOpacity style={styles.seeAllButton} onPress={() => handleCategoryPress(null)}>
                  <Text style={styles.seeAllButtonText}>See All</Text>
                </TouchableOpacity>
              </View>
              <View><Text style={styles.maintitle}>🩺 The Griffon's Nest 🪺🩺</Text></View>
              <View style={styles.PetCardsContainer}>{renderPetCards()}</View>
            </View>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.footerItem}
                onPress={() => handleFooterPress('Home')}
              >
                <Image source={require('./assets/home.png')} style={styles.footerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerItem}
                onPress={() => handleFooterPress('Profile')}
              >
                <Image source={require('./assets/profile-user.png')} style={styles.footerIcon} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
      case 'DocProfile':
        return <DocProfile />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderSelectedScreen()}
      {showDoctorForm && (
        <Modal visible={showDoctorForm} animationType="slide">
          <ScrollView>
            <TouchableOpacity onPress={() => setShowDoctorForm(false)}>
            </TouchableOpacity>
            <DoctorForm onClose={() => handleOnclose()} selectedId={selectedId} />
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 7,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    paddingHorizontal: 55,
  },
  maintitle: {
    fontSize: 25.7,
    fontWeight: 'bold',
    marginTop: 2.5,
    marginBottom: 17.5,
    color: 'white',
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    right: 42,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    right: 45,
    top: 7,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    left: 45,
    top: 7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#301B3F',
    paddingVertical: 10,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#EDEDED',
    padding: 10,
    borderRadius: 5,
    color: '#000',
    marginTop: 35,
    borderRadius: 55,
  },
  searchButton: {
    backgroundColor: '#EDEDED',
    padding: 10,
    borderRadius: 25,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  container: {
    padding: 20,
    backgroundColor: '#301B3F',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryIcon: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
  },
  selectedCategory: {
    backgroundColor: '#EDEDED',
  },
  countSeeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countText: {
    color: 'white',
    marginRight: 10,
  },
  seeAllButton: {
    marginLeft: 210,
  },
  seeAllButtonText: {
    color: 'white',
  },
  PetCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});

export default Doctor;

