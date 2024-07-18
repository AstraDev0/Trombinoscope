import { Text, TextInput, View, Dimensions, Image, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import localStorage from '../utils/localStorage'
import { Profilstyles } from "../../style";
import { LogOffBtn } from '../components/LogOffBtn';

export function ProfileScreen({ route, navigation }) {
  const { info, image } = route.params;
  const [infoMe, setInfoMe] = useState(0);

  useEffect(() => {
    localStorage.getData("_me")
      .then((response) => JSON.parse(response))
      .then((data) => {
        setInfoMe(data)
      })
  }, []);
  return (
    <View style={Profilstyles.Contener}>
      <View style={Profilstyles.Page_mid}>
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 30, marginTop: 10 }}
        />
        <View style={Profilstyles.Page_mid_two}>
        {infoMe ? infoMe.id === info.id ? <LogOffBtn navigation={navigation}/> : null : null}
          <View style={Profilstyles.Contener_mid}>
            <View style={Profilstyles.Groupe_print_mid}>
              <Text style={Profilstyles.text_first}> Nom: </Text>
              <View style={Profilstyles.print_info_mid}>
                <Text > {info["name"]}</Text>
              </View>
            </View>
            <View style={Profilstyles.Groupe_print_mid}>
              <Text style={Profilstyles.text_first}> Prénom: </Text>
              <View style={Profilstyles.print_info_mid}>
                <Text> {info["surname"]}</Text>
              </View>
            </View>
            <View style={Profilstyles.Groupe_print_mid}>
              <Text style={Profilstyles.text_first}> Naissance: </Text>
              <View style={Profilstyles.print_info_mid}>
                <Text> {info["birth_date"]}</Text>
              </View>
            </View>
            <View style={Profilstyles.Groupe_print_mid}>
              <Text style={Profilstyles.text_first}> Poste: </Text>
              <View style={Profilstyles.print_info_mid}>
                <Text> {info["work"]}</Text>
              </View>
            </View>
            <View style={Profilstyles.Groupe_print_mid}>
              <Text style={Profilstyles.text_first}> E-mail: </Text>
              <View style={Profilstyles.print_info_mid}>
                <Text> {info["email"]}</Text>
              </View>
            </View>
          </View>
          {infoMe ? infoMe.id != info.id ? <TouchableOpacity style={Profilstyles.btn} onPress={() => navigation.navigate("Chat", { info: info, image: image })}>
            <Text style={Profilstyles.buttonText}>chat</Text>
          </TouchableOpacity> : null : null}
        </View>
      </View>
      <View style={Profilstyles.Contener_bottom}>
      </View>
    </View>
  );
};