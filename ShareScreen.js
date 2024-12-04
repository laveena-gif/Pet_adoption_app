import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import HomeScreen from './HomeScreen';

const ShareScreen = () => {
  const [screen, setScreen] = useState('ShareScreen');
  const [events, setEvents] = useState([]);

  const handleBackButton = () => {
    console.log("Clicked")
    setScreen("HomeScreen");
  }

  useEffect(() => {
    
    const fetchedEvents = [
      {
        title: 'Pet-meet up',
        description: '*Meet Your Furry Friends - A Dog Meetup* : Calling all dog lovers and their adorable four-legged companions! Join us for a paw-some day filled with fun, games, and wagging tails at “Meet Your Furry Friends - A Dog Meetup.” This event is designed to bring together dogs and their owners from the local community to celebrate the joy of canine companionship.',
        date: 'Sat 20 Jan 2024',
        duration: '1 hr 30 mins',
        time: '4:30 pm',
        address: 'Cafe Down the Alley (RR Nagar) - Bengaluru',
        Cost: 'Rs 200',
        registrationLink: 'https://in.bookmyshow.com/events/pet-meet-up/ET00383383',
      },
      {
        title: 'Pet Fed Pune- Express Edition 2024',
        description: '#Pune! Get Ready because Indias Biggest Pet Festival #PetFedIndia is coming to your city! Its time to shower your adorable companions with two whole days of undivided love they absolutely deserve.',
        registrationLink: 'https://petfed.org/events/pfp24/tickets',
        date: 'Sat 10 Feb 2024 - Sun 11 Feb 2024',
        duration: '10 hrs',
        time: '11:00 am',
        address: 'Nexus Westend Mall: Pune',
        Cost: 'Rs 499',
      },
    ];

    setEvents(fetchedEvents);
  }, []);

  const renderEventCards = () => {
    return events.map((event, index) => (
      <TouchableOpacity key={index} style={styles.eventCard} onPress={() => openRegistrationLink(event.registrationLink)}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <Text style={styles.eventDate}>Date: {event.date}</Text>
        <Text style={styles.eventDate}>Time: {event.time}</Text>
        <Text style={styles.eventDate}>Duration: {event.duration}</Text>
        <Text style={styles.eventDate}>Cost: {event.Cost}</Text>
        <Text style={styles.eventaddress}>Address: 📍{event.address}</Text>
      </TouchableOpacity>
    ));
  };

  const openRegistrationLink = (registrationLink) => {
    Linking.openURL(registrationLink);
  };

  const renderSelectedScreen = () => {
    switch (screen) {
      case 'ShareScreen':
  return (
    <ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <Image source={require('./assets/left-arrow.png')} style={styles.backButtonIcon} />
         </TouchableOpacity>
      <View style={styles.container}>
      <Text style={styles.heading}> 🎊 Fluffy Friends Frolic 🎊 </Text>
      {renderEventCards()}
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
        padding: 22,
        backgroundColor: '#301B3F',
      },
      backButton: {
        left: 17,
        zIndex: 1,
      },
      backButtonIcon: {
        width: 42, 
        height: 42,
        marginTop:61,
        marginBottom: -135.7,
      },
      heading: {
        fontSize: 22.7,
        marginTop: 95,
        marginBottom: 15,
        color: 'white',
        textAlign: 'center',
      },
      eventCard: {
        backgroundColor: '#EDEDED',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
      },
      eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      eventDescription: {
        marginBottom: 8,
      },
      eventDate: {
        fontStyle: 'italic',
      },
      eventaddress: {
        marginBottom: 5,
      },
});

export default ShareScreen;
