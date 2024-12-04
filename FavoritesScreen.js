import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FavoritesScreen = ({ likedPets, onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Liked Pets ❤️</Text>
      <ScrollView horizontal contentContainerStyle={styles.petCardsContainer}>
        {likedPets.length > 0 ? (
          likedPets.map((pet) => (
            <View key={pet.id} style={styles.petCardContainer}>
              <Image source={{ uri: pet.image }} style={styles.petCardImage} />
              <Text style={styles.petCardBreed}>{pet.breed}</Text>
              <Text style={styles.petCardAddress}>{pet.address}</Text>
              <Text style={styles.petCardInfo}>{pet.gender}</Text>
              <Text style={styles.petCardAge}>{pet.age} yrs</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noPetsText}>No liked pets yet!</Text>
        )}
      </ScrollView>
      <TouchableOpacity onPress={onBack} style={styles.backButtonTextContainer}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301B3F',
    alignItems: 'center',
  },
  header: {
    fontSize: 27,
    marginVertical: 50,
    color: 'white',
    marginBottom: 10,
    marginTop: 75,
  },
  petCardsContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  petCardContainer: {
    width: 200,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  petCardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  petCardBreed: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7.5,
  },
  petCardAddress: {
    fontStyle: 'italic',
  },
  petCardInfo: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  petCardAge: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  noPetsText: {
    marginTop: 50,
    fontSize: 18,
    color: '#999',
  },
  backButtonTextContainer: {
    marginTop: 20,
    marginBottom: 27.5,
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FavoritesScreen;

