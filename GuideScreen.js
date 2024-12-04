import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';

const GuideScreen = () => {
  const [screen, setScreen] = useState('GuideScreen');

  const handleBackButton = () => {
    setScreen("HomeScreen");
  }

  const renderSelectedScreen = () => {
    switch (screen) {
      case 'GuideScreen':
  return (
    <ScrollView>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <Image source={require('./assets/left-arrow.png')} style={styles.backButtonIcon} />
      </TouchableOpacity>
        <Text style={styles.mainheading}>🧾Paws for Adoption Guidelines🧾</Text>
        <Text style={styles.guidelinesText}>
        ⭐ Eligibility:
        </Text>
        <Text style={styles.guidelinesText}>
        Possess the willingness and capacity to provide a loving, safe, and permanent home for a rescued animal.
        </Text>
        <Text style={styles.guidelinesText}>
        Meet any specific requirements of individual shelters or rescue organizations (e.g., experience with animals).
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ Application Process:
        </Text>
        <Text style={styles.guidelinesText}>
        Browse pet profiles and filter by criteria like breed, age, gender, and adress.
        </Text>
        <Text style={styles.guidelinesText}>
        Express interest in specific pets by clicking "Explore!"
        </Text>
        <Text style={styles.guidelinesText}>
        Complete an adoption application by clicking on "Adopt Me!".
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ Pre-Adoption Process:
        </Text>
        <Text style={styles.guidelinesText}>
        If your application is successful, prepare for a pre-adoption interview or home visit.
        </Text>
        <Text style={styles.guidelinesText}>
        Be open to discussing your lifestyle, expectations, and ability to provide for the specific pet's needs.
        </Text>
        <Text style={styles.guidelinesText}>
        Address any questions or concerns raised by the shelter or rescue organization and the Owner of the pet.
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ Adoption Finalization:
        </Text>
        <Text style={styles.guidelinesText}>
        Upon successful completion of the pre-adoption process, finalize the adoption by signing an adoption agreement if necessary and paying any required fees.
        </Text>
        <Text style={styles.guidelinesText}>
        Be prepared to welcome your new furry friend home!
        </Text>
        <Text style={styles.guidelinesText}>
        </Text>
        <Text style={styles.heading}>App Overview</Text>
        <Text style={styles.guidelinesText}>
        ⭐ Pet Profiles
        </Text>
        <Text style={styles.guidelinesText}>
        Comprehensive profiles for each adoptable animal, including:
        </Text>
        <Text style={styles.guidelinesText}>
        Photos showcasing their personality and beauty.
        </Text>
        <Text style={styles.guidelinesText}>
        Species, breed, age, size, and gender, address.
        </Text>
        <Text style={styles.guidelinesText}>
        Temperament, Training, cost (if required), Description.
        </Text>
        <Text style={styles.guidelinesText}>
        Contact information for the shelter or rescue organization and the Owner of the pet.
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ Search and Filter:
        </Text>
        <Text style={styles.guidelinesText}>
        Easy-to-use search and filter functionality to narrow down your search based on your preferences:
        </Text>
        <Text style={styles.guidelinesText}>
        Species (Dogs, Cats, Others, etc.)
        </Text>
        <Text style={styles.guidelinesText}>
        Breed
        </Text>
        <Text style={styles.guidelinesText}>
        Address
        </Text>
        <Text style={styles.guidelinesText}>
        Gender
        </Text>
        <Text style={styles.guidelinesText}>
        Age
        </Text>
        <Text style={styles.heading1}>Terms and Conditions</Text>
        <Text style={styles.guidelinesText}>
        ⭐ Use of the App:
        </Text>
        <Text style={styles.guidelinesText}>
        By using Paws for Adoption, you agree to these terms and conditions.
        </Text>
        <Text style={styles.guidelinesText}>
        The app is provided "as is" and Paws for Adoption makes no warranties, express or implied, regarding its functionality or accuracy.
        </Text>
        <Text style={styles.guidelinesText}>
        You are responsible for your own internet connection and any associated costs.
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ User Content:
        </Text>
        <Text style={styles.guidelinesText}>
        You are responsible for the content you post on the app.
        </Text>
        <Text style={styles.guidelinesText}>
        You agree not to post any content that is offensive, discriminatory, or illegal.
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ Adoption Process:
        </Text>
        <Text style={styles.guidelinesText}>
        Paws for Adoption facilitates the adoption process but does not guarantee successful adoptions.
        </Text>
        <Text style={styles.guidelinesText}>
        Final decisions regarding adoptions are made by individual User.
        </Text>
        <Text style={styles.guidelinesText}>
        Adoption fees and other requirements may vary by User.
        </Text>
        <Text style={styles.guidelinesText}>
        ⭐ Disclaimer:
        </Text>
        <Text style={styles.guidelinesText}>
        Paws for Adoption is not responsible for any harm or damage caused by your use of the app or by the animals listed on the app.
        </Text>
        <Text style={styles.guidelinesText}>
        You agree to indemnify and hold harmless Paws
        </Text>
      </View>
    </ScrollView>
  );
  case 'HomeScreen':
    return <HomeScreen />;
  default:
    return null;
}
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
    padding: 17,
    backgroundColor: '#301B3F',
  },
  backButton: {
    left: -10,
    zIndex: 1,
  },
  backButtonIcon: {
    width: 42, 
    height: 42,
    marginTop: 25,
    marginBottom: -25,
  },
  mainheading: {
    fontSize: 20.5,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop:47,
  },
  heading: {
    fontSize: 20.5,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 17,
    marginTop:-12,
  },
  heading1: {
    fontSize: 20.5,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 17,
    marginTop: 15,
  },
  guidelinesText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 12,
  },
});

export default GuideScreen;
