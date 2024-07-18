import { Text, TextInput, View, Button, Dimensions, Image, Pressable, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { LoginPageStyles } from "../../style"
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api'
import localStorage from '../utils/localStorage'
import { useProviderInfo } from './Provider/ProviderInfoContext';
import getEmployeeImg from '../utils/getImage';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { myImage, setImage, myInfo, setInfo } = useProviderInfo();
  const handleSubmit = async (email, password) => {
    try {
      const response = await api.getLogin("oliver.lewis@masurao.jp", "password");
      // "oliver.lewis@masurao.jp", "password"
      const responseData = await response.json();
      setLoading(true);
      if (response.status != 200) {
        setErrorData(response.status);
        setLoading(false);
        return;
      }
      await localStorage.storeData('token', responseData.access_token)
      const responseGetMe = await api.getMe()
      const data = await responseGetMe.json()
      setInfo(data)
      localStorage.storeData("_me", JSON.stringify(data))
      const image = await getEmployeeImg(data.id)
      setImage("data:image/jpeg;base64," + image)
      setLoading(false)
      navigation.navigate('Public');
    } catch (error) {
    }
  };

  return (
    <View style={LoginPageStyles.loginContainer}>
      <Text style={LoginPageStyles.TextLogin}>Login</Text>
      <StatusBar style="auto" />
      <View style={LoginPageStyles.inputView}>
        <TextInput
          style={LoginPageStyles.TextInput}
          placeholder="e-mail"
          placeholderTextColor="#0000006e"
          onChangeText={(email) => setEmail(email)}
          onSubmitEditing={() => handleSubmit(email, password)}
        />
      </View>
      <View style={LoginPageStyles.inputView}>
        <TextInput
          style={LoginPageStyles.TextInput}
          placeholder="mot de passe"
          placeholderTextColor="#0000006e"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          onSubmitEditing={() => handleSubmit(email, password)}
        />
      </View>
      <TouchableOpacity style={LoginPageStyles.loginBtn} onPress={() => handleSubmit(email, password)}>
        <Text style={LoginPageStyles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="small" color="#36494E" />}
      {errorData && <Text style={LoginPageStyles.error} > Le login a échoué. {errorData} </Text>}
    </View>
  );
}