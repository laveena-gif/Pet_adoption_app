import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./HomeScreen";
import LoginScreen from "./Login";
import Datatable from "./Datatable";
import FavoritesScreen from "./FavoritesScreen";

const ProfileScreen = ({ handleLogout, petProfiles }) => {
  const [currentScreen, setCurrentScreen] = useState("profile");
  const [likedPets, setLikedPets] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchLikedPets();
  }, []);

  const fetchLikedPets = async () => {
    try {
      const likesData = await AsyncStorage.getItem('Likes');
      if (likesData !== null) {
        const likes = JSON.parse(likesData);
        const likedPetsList = petProfiles.filter(pet => likes.includes(pet.id));
        setLikedPets(likedPetsList);
      }
    } catch (error) {
      console.log('Error fetching liked pets:', error);
    }
  };

  const handleBackPress = () => {
    setCurrentScreen("home");
  };

  const handleLogoutPress = async () => {
    setCurrentScreen("login");
    if (handleLogout) {
      handleLogout();
    }
  };

  const handleDatatablePress = () => {
    setCurrentScreen("Datatable");
  };

  const handleFavoritePress = () => {
    setCurrentScreen("Favorites");
  };

  const handleFeedbackSubmit = async () => {
    if (feedback.trim() === "") {
      Alert.alert("Error", "Please enter your feedback before submitting.");
      return;
    }

    try {
      await AsyncStorage.setItem('Feedback', feedback);
      console.log("Feedback saved:", feedback);
      Alert.alert("Success", "Feedback submitted successfully.");
      setFeedback("");
    } catch (error) {
      console.log('Error saving feedback:', error);
      Alert.alert("Error", "Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      {currentScreen === "profile" && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image style={styles.backButton} source={require('./assets/left-arrow.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Welcome, kindred spirit, to a haven of hopeful paws!</Text>
          <TouchableOpacity style={styles.datatableBtn} onPress={handleFavoritePress}>
            <Text style={styles.text}>Pawsome Picks ❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datatableBtn} onPress={handleDatatablePress}>
            <Text style={styles.text}>Adoption data 📊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
            <Text style={styles.text}>Logout 📴</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Help Us Make PAWS 🐾  Even Better"
            placeholderTextColor="#888"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
          <TouchableOpacity style={styles.feedbackBtn} onPress={handleFeedbackSubmit}>
            <Text style={styles.text}>Purrfect Feedback </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {currentScreen === "home" && (
        <HomeScreen />
      )}

      {currentScreen === "login" && (
        <LoginScreen />
      )}

      {currentScreen === "Datatable" && (
        <Datatable petProfiles={petProfiles} />
      )}

      {currentScreen === "Favorites" && (
        <FavoritesScreen likedPets={likedPets} onBack={() => setCurrentScreen("profile")} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 19.5,
    color: "#301B3F",
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    marginRight: 290,
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 15.5,
  },
  logoutBtn: {
    width: 185,
    borderRadius: 55,
    height: 55.7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#301B3F",
  },
  datatableBtn: {
    width: 185,
    borderRadius: 55,
    height: 55.7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#301B3F",
  },
  feedbackInput: {
    width: 300,
    height: 125,
    borderColor: "#301B3F",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    textAlignVertical: "top",
    fontSize: 15.7,
  },
  feedbackBtn: {
    width: 185,
    borderRadius: 55,
    height: 55.7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#301B3F",
  },
});

export default ProfileScreen;

