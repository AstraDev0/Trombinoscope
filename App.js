import { NavigationContainer } from '@react-navigation/native'; import { LoginScreen } from "./src/pages/LoginScreen";
import { PublicScreen } from "./src/pages/PublicScreen";
import { PrivateScreen } from "./src/pages/PrivateScreen";
import { ChatScreen } from './src/pages/chatScreen';
import { LandingScreen } from './src/pages/LandingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect, createContext, useContext } from 'react';
import api from "./src/utils/api";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './src/pages/ProfileScreen';
import getEmployeeImg from './src/utils/getImage';
import localStorage from './src/utils/localStorage'
import { Text, View, Image, FlatList, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Appstyles } from './style';
import { ProviderInfoProvider, useProviderInfo } from './src/pages/Provider/ProviderInfoContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [myInfo, setInfo] = useState({});
  const [myImage, setImage] = useState("");
  const [NewClient, setNewClient] = useState("");

  const checkNewClient = () => {
    localStorage.getData("LoadingPage")
      .then((response) => JSON.parse(response))
      .then((data) => {
        if (data) {
          setNewClient("Login")
        }
        else {
          setNewClient("LandingScreen")
        }
      })
  }

  const initValues = () => {
    api.getMe()
      .then((response) => response.json())
      .then((data) => {
        setInfo(data)
        localStorage.storeData("_me", JSON.stringify(data))
        getEmployeeImg(data.id)
          .then((image) => {
            setImage("data:image/jpeg;base64," + image)
          })
      })
    setNewClient("Public")
  }

  const checkConnected = () => {
    localStorage.getData("token")
      .then((data) => {
        if (data) initValues()
        else checkNewClient()
      })
  }

  useEffect(() => {
    checkConnected()
  }, [])

  if (!NewClient)
    return (<View style={[Appstyles.container, Appstyles.horizontal]}>
      <ActivityIndicator size="large" color="#36494E" />
    </View>);
  return (
    <ProviderInfoProvider myImage={myImage} setImage={setImage} myInfo={myInfo} setInfo={setInfo}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={NewClient}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Public') {
                iconName = focused ? 'globe' : 'globe-outline';
              } else if (route.name === 'Private') {
                iconName = focused ? 'lock-closed' : 'lock-closed-outline';
              } else if (route.name === 'ProfilePrivate') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="LandingScreen" component={LandingScreen} options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            tabBarButton: () => null
          }} />

          <Tab.Screen name="Login" component={LoginScreen} options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            tabBarButton: () => null
          }} />

          <Tab.Screen name="Chat" component={ChatScreen} options={{
            headerShown: false,
            tabBarButton: () => null
          }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            headerShown: false,
            tabBarButton: () => null
          }} />
          <Tab.Screen name="Public" component={PublicScreen} options={{ title: 'Trombi', headerShown: false }} />
          <Tab.Screen name="Private" component={PrivateScreen} options={{ title: 'Dashboard', headerShown: false }} />
          <Tab.Screen name="ProfilePrivate" options={{ title: 'Profil', headerShown: false }}>
            {({ navigation }) => <ProfileScreen route={{ params: { info: myInfo, image: myImage } }} navigation={navigation} />}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
    </ProviderInfoProvider>
  );
}
