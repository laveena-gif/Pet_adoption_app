import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import HomeScreen from './HomeScreen';
import Doctor from './Doctor'; 
import Registeration from './Registeration';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    // setScreen('HomeScreen');
    if (!email.trim() || !password.trim()) {
      Alert.alert('Empty Fields', 'Please fill in both email and password fields.');
      return;
    }
    
    try {
      AsyncStorage.getItem('UserData').then((value) => {
        if (value != null) {
          const users = JSON.parse(value);
          const user = users.find(obj => obj.Email === email && obj.Password === password);
          
          if (user) {
            if (user.Email === 'doctor@gmail.com' && user.Password === 'Doctor55') {
              setScreen('Doctor');
            } else {
              setScreen('HomeScreen');
            }
          } else {
            Alert.alert('Incorrect Credentials', 'Please check your email and password.');
          }
        } else {
          Alert.alert('No User Data', 'Please sign up first.');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
        // AsyncStorage.removeItem('isLoggedIn');
    setScreen('Login');
  };

  useEffect(() => {
    // AsyncStorage.getItem('isLoggedIn')
    //   .then(value => {
    //     console.log(value);
    //     if (value === 'true') {
    //       setScreen('HomeScreen');
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <View style={styles.container}>
      {screen === 'Login' && (
        <>
          <Image style={styles.image} source={require('./assets/paw.png')} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => setScreen('Registeration')}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </>
      )}

      {screen === 'Registeration' && (
        <Registeration setScreen={setScreen} />
      )}
      
      {screen === 'HomeScreen' && (
        <HomeScreen setScreen={setScreen} />
      )}

      {screen === 'Doctor' && (
        <Doctor setScreen={setScreen} />
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
  },
  image: {
    marginTop: -20,
    marginBottom: -50
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
    backgroundColor: "#BB9CC0",
  },
});