import * as Location from 'expo-location';
import axios from 'axios';
import { Text, View, ActivityIndicator, PanResponder, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { PrivatePageStyles } from "../../../style"
import { LinearGradient } from 'expo-linear-gradient';

export function WeatherWidget () {

    const [dataWeather, setDataWeather] = useState(undefined);
  
    // fetch weather data
    const fetchWeatherData = async (latitude, longitude) => {
      const apiKeyWeatherMap = 'cb9db4d71fa8600c742e8b182b4b352f';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyWeatherMap}&lang=fr&units=metric`;
      try {
        const response = await axios.get(url);
        setDataWeather(response.data);
      } catch (error) {
      }
    };
    
    // get location
    const getLocationAsync = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchWeatherData(latitude, longitude);
    };
  
    // fetch weather data every 10 seconds
    useEffect(() => {
      getLocationAsync();
      const interval = setInterval(getLocationAsync, 10000);
      return () => clearInterval(interval);
    }, []);
  
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(PanResponder.create(
      { onMoveShouldSetPanResponder: () => true, 
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
        onPanResponderRelease: () => {
          pan.extractOffset();
        },
      })
    ).current;
  
    return (
        <View>
        <Animated.View
        style={[PrivatePageStyles.WidgetWeather,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
        ]}
        {...panResponder.panHandlers}>
          <LinearGradient
            colors={['#0B9CFC', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            style={PrivatePageStyles.WidgetWeatherGradient} 
          >
          {dataWeather ? <Text style={PrivatePageStyles.WidgetWeatherCity}> {dataWeather.name} </Text> : (<ActivityIndicator size="small" color="#36494E" />)}
          {dataWeather ? <Text style={PrivatePageStyles.WidgetWeatherDescription}> {dataWeather.weather[0].description} </Text> : (<ActivityIndicator size="small" color="#36494E" />)}
          {dataWeather ? <Text style={PrivatePageStyles.WidgetWeatherTemp}> {dataWeather.main.temp} °</Text> : (<ActivityIndicator size="small" color="#36494E" />)}
          </LinearGradient>
        </Animated.View>
      </View>
    );
}