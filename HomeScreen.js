import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import petProfiles from './PetDetails';
import GuideScreen from './GuideScreen';
import AddScreen from './AddScreen';
import ProfileScreen from './ProfileScreen';
import ShareScreen from './ShareScreen';
import AdoptionForm from './AdoptionForm';

const HomeScreen = () => {
  const [screen, setScreen] = useState('HomeScreen');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [petProfiles, setPetProfiles] = useState([]);
  const [adoptionData, setAdoptionData] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetchPetData();
    fetchLikes();
  }, []);

  const fetchPetData = async () => {
    try {
      const petData = await AsyncStorage.getItem('AdoptionData');
      if (petData !== null) {
        const parsedPetData = JSON.parse(petData);
        setAdoptionData(parsedPetData);
        const verifiedProfiles = parsedPetData.filter((item) => item.isVerified == 1);
        setPetProfiles(verifiedProfiles);
      }
    } catch (error) {
      console.log('Error fetching pet data:', error);
    }
  };
  

  const fetchLikes = async () => {
    try {
      const likesData = await AsyncStorage.getItem('Likes');
      if (likesData !== null) {
        setLikes(JSON.parse(likesData));
      }
    } catch (error) {
      console.log('Error fetching likes:', error);
    }
  };

  const toggleLike = async (petId) => {
    try {
      let updatedLikes = [...likes];
      const index = updatedLikes.indexOf(petId);
      if (index !== -1) {
        updatedLikes.splice(index, 1);
      } else {
        updatedLikes.push(petId);
      }
      setLikes(updatedLikes);
      await AsyncStorage.setItem('Likes', JSON.stringify(updatedLikes));
    } catch (error) {
      console.log('Error toggling like:', error);
    }
  };

  const isLiked = (petId) => {
    return likes.includes(petId);
  };

  const handleAdoptMePress = () => {
    setShowAdoptionForm(true);
  };

  const handleCloseAdoptionForm = () => {
    setShowAdoptionForm(false);
  };

  const handleExplorePress = (petId) => {
    const pet = petProfiles.find((p) => p.id === petId);
    setSelectedPet(pet);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    handleSearchPress();
  };

  const handleSearchPress = () => {
    let updatedPets = petProfiles;

    if (searchTerm || selectedCategory) {
      if (selectedCategory) {
        updatedPets = updatedPets.filter((pet) => pet.type === selectedCategory);
      }

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        updatedPets = updatedPets.filter(
          (pet) =>
            pet.breed.toLowerCase().includes(searchTermLower) ||
            pet.age.toString().includes(searchTerm) ||
            pet.address.toLowerCase().includes(searchTermLower) ||
            pet.gender.toLowerCase().includes(searchTermLower)
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
    const petsToRender = filteredPets.length > 0 ? filteredPets : petProfiles;

    return petsToRender.map((pet) => (
      <TouchableOpacity
        key={pet.id}
        style={styles.petCardContainer}
      >
        <Image source={{ uri: pet.image }} style={styles.petCardImage} />
        <Text style={styles.petCardbreed}>{pet.breed}</Text>
        <Text style={styles.petCardAddress}>{pet.address}</Text>
        <Text style={styles.petCardInfo}>{pet.gender}</Text>
        <Text style={styles.petage}>{pet.age} yrs</Text>
        <TouchableOpacity style={styles.ExploreButton} onPress={() => handleExplorePress(pet.id)} >
          <Text style={styles.ExploreButtonText}>Explore!</Text>
        </TouchableOpacity>
        <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, isLiked(pet.id) && styles.likeButtonLiked]}
          onPress={() => toggleLike(pet.id)}
        >
          <Image
            source={require('./assets/heart.png')}
            style={styles.actionButtonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleSharePress(pet)}>
          <Image source={require('./assets/sharing.png')} style={styles.actionButtonIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));
};
  const totalCount = filteredPets.length > 0 ? filteredPets.length : petProfiles.length;

  const handleFooterPress = (category) => {
    switch (category) {
      case 'Home':
        setScreen('HomeScreen');
        break;
      case 'Guide':
        setScreen('GuideScreen');
        break;
      case 'Add':
        setScreen('AddScreen');
        break;
      case 'Adopted':
        setScreen('ShareScreen');
        break;
      case 'Profile':
        setScreen('ProfileScreen');
        break;
      default:
        break;
    }
  };

  const renderSelectedScreen = () => {
    switch (screen) {
      case 'HomeScreen':
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
                  <Image source={require('./assets/happy.png')} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryIcon, selectedCategory === 'Cats' && styles.selectedCategory]}
                  onPress={() => handleCategoryPress('Cats')}
                >
                  <Image source={require('./assets/laughing.png')} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryIcon, selectedCategory === 'Others' && styles.selectedCategory]}
                  onPress={() => handleCategoryPress('Others')}
                >
                  <Image source={require('./assets/pet-care.png')} style={styles.iconImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.countSeeAllContainer}>
                <Text style={styles.countText}>{`${totalCount} Results`}</Text>
                <TouchableOpacity style={styles.seeAllButton} onPress={() => handleCategoryPress(null)}>
                  <Text style={styles.seeAllButtonText}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.petCardsContainer}>{renderPetCards()}</View>
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
                onPress={() => handleFooterPress('Guide')}
              >
                <Image source={require('./assets/information.png')} style={styles.footerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerItem}
                onPress={() => handleFooterPress('Add')}
              >
                <Image source={require('./assets/plus.png')} style={styles.footerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerItem}
                onPress={() => handleFooterPress('Adopted')}
              >
                <Image source={require('./assets/kitten.png')} style={styles.footerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerItem}
                onPress={() => handleFooterPress('Profile')}
              >
                <Image source={require('./assets/profile-user.png')} style={styles.footerIcon} />
              </TouchableOpacity>
            </View>
            <PetDetailsModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
          </ScrollView>
        );
      case 'GuideScreen':
        return <GuideScreen />;
      case 'AddScreen':
        return <AddScreen />;
      case 'ShareScreen':
        return <ShareScreen />;
      case 'ProfileScreen':
        return <ProfileScreen petProfiles ={adoptionData}/>;
      default:
        return null;
    }
  };

  const handleSharePress = (pet) => {
    const message = `Check out this cute ${pet.breed} up for adoption! ${pet.image}`;
    Share.share({
      message: message,
    });
  };

  const PetDetailsModal = ({ pet, onClose }) => {
    if (!pet) {
      return null;
    }
    return (
      <Modal transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Image source={{ uri: pet.image }}  style={styles.petDetailImage} />
            <Text style={styles.petDetailBreed}>{pet.breed}</Text>
            <Text style={styles.petDetailInfo}>Temperament: {pet.temperament}</Text>
            <Text style={styles.petDetailInfo}>Training: {pet.training}</Text>
            <Text style={styles.petDetailInfo}>vaccinated: {pet.vaccinated}</Text>
            <Text style={styles.petDetailInfo}>Description: {pet.description}</Text>
            <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptMePress}>
              <Text style={styles.adoptButtonText}>Adopt Me!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderSelectedScreen()}
      {showAdoptionForm && (
        <AdoptionForm onClose={handleCloseAdoptionForm} pet={selectedPet} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#EDEDED',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  petDetailImage: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  petDetailBreed: {
    fontSize: 21.5,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  petDetailInfo: {
    marginBottom: 5,
  },
  adoptButton: {
    backgroundColor: '#301B3F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#301B3F',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  ExploreButton: {
    padding: 10,
    marginTop: -15,
    alignItems: 'flex-end',
  },
  ExploreButtonText: {
    color: '#301B3F',
    fontWeight: 'bold',
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
  petCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  petCardContainer: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    overflow: 'hidden',
  },
  petCardImage: {
    width: '100%',
    height: 245,
    borderRadius: 10,
    marginTop: 7,
  },
  petCardbreed: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: -18,
  },
  petCardAddress: {
    padding: 10,
    fontStyle: 'italic',
    marginBottom: -14,
  },
  petCardInfo: {
    padding: 6,
    fontStyle: 'italic',
    fontSize: 12,
    left: 4.5,
  },
  petage: {
    marginTop: -3,
    marginBottom: 8,
    fontStyle: 'italic',
    fontSize: 12,
    left: 9.5,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  shareButton: {
    top: -9.5,
    right: -5,
  },
  shareIcon: {
    width: 27.5,
    height: 27.5,
    tintColor: '#301B3F',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 15,
    bottom: 7.5,
  },
  actionButtonIcon: {
    width: 25.5,
    height: 25.5,
    tintColor: '#301B3F',
  },
  likeButtonLiked: {
    backgroundColor: '#DD5746',
  },
});

export default HomeScreen;
