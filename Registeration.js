import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registration({ setScreen }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        setUserData([...userData, ...JSON.parse(value)]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isUserExists = (newUsername, newEmail) => {
    return userData.some(user => user.Username === newUsername || user.Email === newEmail);
  }

  const handleRegistration = async () => {
    const usernameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    const contactRegex = /^\d{10}$/;

    if (!username.trim() || !email.trim() || !password.trim() || !contact.trim()) {
      Alert.alert('Incomplete Details', 'Please fill in all fields.');
      return;
    }

    if (!usernameRegex.test(username)) {
      Alert.alert('Invalid Input', 'Username can contain only alphabets and spaces.');
    } else if (!emailRegex.test(email)) {
      Alert.alert('Invalid Input', 'Please enter a valid email address. eg:"xyz5@gmail.com"');
    } else if (!passwordRegex.test(password)) {
      Alert.alert('Invalid Input', 'Password must be at least 8 characters and contain alphabets, numbers, and symbols.');
    } else if (!contactRegex.test(contact)) {
      Alert.alert('Invalid Input', 'Contact number must be 10 digits.');
    } else if (isUserExists(username, email)) {
      Alert.alert('Account Exists', 'An account with the same username or email already exists. Please sign in.');
    } else {
      try {
        var user = [{
          Email: email,
          Password: password,
          Username: username,
          Contact: contact,
        }]
        const newDataSet = [...userData, ...user]
        await AsyncStorage.setItem('UserData', JSON.stringify(newDataSet));
        setScreen("Login");
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleBackButton = () => {
    setScreen("Login");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/front.png')} />
      <Text style={styles.title}>Paws For Adoption</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <Image source={require('./assets/left-arrow.png')} style={styles.backButtonIcon} />
      </TouchableOpacity>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contact"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setContact(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegistration}>
        <Text>Register</Text>
      </TouchableOpacity>
      <Image source={require('./assets/back.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    left: -155,
    zIndex: 1,
  },
  backButtonIcon: {
    width: 42, 
    height: 42,
  },
  image: {
    marginTop: 5,
    marginBottom: -15,
  },
  title: {
    fontSize: 42,
    color: 'purple',
    marginBottom: 7,
    marginTop: 5,
  },
  inputView: {
    backgroundColor: "#E7BCDE",
    borderRadius: 50,
    width: 270,
    height: 70,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: 170,
    borderRadius: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#BB9CC0",
  },
});