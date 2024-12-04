import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Doctor from "./Doctor";
import LoginScreen from "./Login";

const DocProfile = ({ handleLogout }) => {
  const [currentScreen, setCurrentScreen] = useState("DocProfile");

  const handleBackPress = () => {
    setCurrentScreen("home");
  };

  const handleLogoutPress = async () => {
    setCurrentScreen("login");
    if (handleLogout) {
      handleLogout();
    }
  };

  return (
    <View style={styles.container}>
      {currentScreen === "DocProfile" && (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image style={styles.backButton} source={require('./assets/left-arrow.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Welcome, kindred spirit, to a haven of hopeful paws!</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentScreen === "home" && (
        <Doctor />
      )}

      {currentScreen === "login" && (
        <LoginScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 800,
  },
  header: {
    marginBottom: 12,
    fontSize: 19.5,
    color: "#301B3F",
  },
  backButton: {
    width: 50,
    height: 50,
    marginRight: 287,
  },
  text:{
    color: 'white',
  },
  logoutBtn: {
    width: 170,
    borderRadius: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#301B3F",
  },
});

export default DocProfile;
