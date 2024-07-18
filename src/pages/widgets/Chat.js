import { Text, TextInput, View, Image, ActivityIndicator, PanResponder, Animated, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { PrivatePageStyles } from "../../../style"
import { LinearGradient } from 'expo-linear-gradient';

export function ChatWidget ({navigation}) {
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
        <Animated.View 
          style={[PrivatePageStyles.WidgetChat, 
                  {transform: [{translateX: pan.x}, {translateY: pan.y}]}
          ]}
          {...panResponder.panHandlers}>
          <LinearGradient
            colors={['#ADD8E6', '#0000FF']}
            start={{ x: -0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={PrivatePageStyles.WidgetWeatherGradient} 
          >
          <Text> Chat </Text>
  
          <TouchableOpacity>
          </TouchableOpacity>
          
          </LinearGradient>
        </Animated.View>
    );
}