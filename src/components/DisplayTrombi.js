import { Text, View, Image, FlatList, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { PublicPageStyles } from "../../style"
import api from "../utils/api";
import { Button } from 'react-native-paper';
import getEmployeeImg from '../utils/getImage';

const getEmployeesId = async () => {
  try {
    const response = await api.getEmployees();
    const responseData = await response.json();
    return (responseData);
  } catch (error) {
  }
};

const getEmployeesData = async (id) => {
  try {
    const response = await api.getEmployeeId(id);
    const responseData = await response.json();
    return (responseData);
  } catch (error) {
  }
}

const TrombiProfil = ({ name, email, surname, navigation, Base64Data, EmployeeInfo }) => {
  return (
    <View style={PublicPageStyles.itemContainer}>
      <View style={PublicPageStyles.profilPictureContainer}>
        {Base64Data ? <Image source={{ uri: Base64Data }} style={PublicPageStyles.profilPicture} /> : (<ActivityIndicator size="small" color="#36494E" />)}
      </View>
      <View style={{ marginTop: 15 }}>
        <View style={PublicPageStyles.BlockImageText}>
          <Image
            source={require('../assets/user.png')}
            style={PublicPageStyles.IconItem} />
          <Text style={PublicPageStyles.BlockText}>{name} {surname}</Text>
        </View>
        <View style={PublicPageStyles.BlockImageText}>
          <Image
            source={require('../assets/email.png')}
            style={PublicPageStyles.IconItem} />
          <Text style={PublicPageStyles.BlockText}>{email}</Text>
        </View>
        <View style={PublicPageStyles.BlockImageText}>
          <Image
            source={require('../assets/suitcase.png')}
            style={PublicPageStyles.IconItem} />
          <Text style={PublicPageStyles.BlockText}>{EmployeeInfo ? EmployeeInfo.work : (<ActivityIndicator size="small" color="#36494E" />)}</Text>
        </View>
      </View>
      { EmployeeInfo && <Button rippleColor="#d9d9d9" textColor="black" mode="elevated" onPress={() => EmployeeInfo ? navigation.navigate("Profile", { info:EmployeeInfo, image:Base64Data }) : null} > 
        Profil
      </Button>
      }
    </View>
  );
};

const handleSearch = (text) => {
  setSearchText(text);
  const filteredData = employeeData.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );
  setFilteredEmployeeData(filteredData);
};

export function DisplayTrombi({ navigation }) {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);
  const [Base64Data, setBase64Data] = useState([]);
  const [EmployeeInfo, setEmployeeInfo] = useState([]);

  useEffect(() => {
    getEmployeesId().then((items) => {
      setEmployeeData(items);
    });
  }, []);
  useEffect(() => {
    if (employeeData) {
      employeeData.forEach(element => {
        getEmployeeImg(element["id"]).then((base64) => {
          Base64Data[element["id"]] = "data:image/jpeg;base64," + base64
        })
        getEmployeesData(element["id"]).then((infoData) => {
          EmployeeInfo[element["id"]] = infoData
        })
      });
    }
  }, [employeeData])
  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = employeeData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEmployeeData(filteredData);
  };

  return (
    <>
      <View style={PublicPageStyles.topBar}>
        <TextInput
          style={PublicPageStyles.input}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredEmployeeData.length > 0 ? filteredEmployeeData : employeeData}
        numColumns={1}
        renderItem={({ item }) => (
          <TrombiProfil
            name={item["name"]}
            email={item["email"]}
            surname={item["surname"]}
            navigation={navigation}
            Base64Data={Base64Data[item["id"]]}
            EmployeeInfo={EmployeeInfo[item["id"]]}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}