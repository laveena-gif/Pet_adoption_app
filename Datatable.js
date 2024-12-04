import React, {  useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import ProfileScreen from "./ProfileScreen";
import { Table, TableWrapper, Row } from 'react-native-table-component';

const Datatable = ({petProfiles}) => {
  const [currentScreen, setCurrentScreen] = useState("Datatable");
  const [adoptionData, setAdoptionData]= useState(petProfiles)
  
  
  const handleBackPress = () => {
    setCurrentScreen("ProfileScreen");
  };

  return (
    <View style={styles.container}>
      {currentScreen === "Datatable" && (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image style={styles.backButton} source={require('./assets/left-arrow.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>📊 Adoption data list 📈 📉 </Text>
          <TableComponent adoptionData={adoptionData}/>
        </View>
      )}

      {currentScreen === "ProfileScreen" && (
        <ProfileScreen />
      )}

    </View>
  );
}

const TableComponent = ({adoptionData}) => {
  const tableHead = ['ID', 'Breed', 'Gender', 'Addess', 'Verified', 'Adopted', 'Adopted By', 'Adopted Phone', 'Adopted Address'];
  const widthArr = [40, 60, 80, 100, 120, 140, 160, 180, 200];
  const data = [];
  adoptionData.map((eachRow, index) => {
    const dataRow = [];
    dataRow.push(eachRow['id']);
    dataRow.push(eachRow['breed']);
    dataRow.push(eachRow['gender']);
    dataRow.push(eachRow['address']);
    dataRow.push(eachRow['isVerified']);
    dataRow.push(eachRow['isAdopted']);
    dataRow.push(eachRow['adoptedBy']);
    dataRow.push(eachRow['adoptedPhone']);
    dataRow.push(eachRow['adoptedAddress']);
    data.push(dataRow)
  })
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={[styles.text, { color: '#FFFFFF' }]} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {data.map((dataRow, index) => (
                <Row
                  key={index}
                  data={dataRow}
                  widthArr={widthArr}
                  style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
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
  header: {
    marginBottom: 12,
    marginTop: 27.5,
    fontSize: 25.7,
    color: "#301B3F",
  },
  backButton: {
    width: 45,
    height: 45,
    left: -133.7,
    top: 25,
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
  },
  dataWrapper: {
    marginTop: 3.5,
  },
  row: {
    height: 40.7,
    backgroundColor: '#BB9CC0'
  },
  head: {
    height: 50,
    backgroundColor: '#301B3F'
  },
});

export default Datatable;
