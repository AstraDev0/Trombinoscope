import { Text, TextInput, View, Image, ActivityIndicator, PanResponder, Animated, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { PrivatePageStyles } from "../../../style"
import { LinearGradient } from 'expo-linear-gradient';
import fireApi from '../../utils/firebaseApi'
import localStorage from '../../utils/localStorage'

export function NoteWidget() {
  const [value, onChangeText] = useState('');
  const [infoMe, setInfoMe] = useState('');

  useEffect(() => {
    localStorage.getData("_me")
      .then((response) => JSON.parse(response))
      .then((data) => {
        fireApi.getData("notes/" + data.id).then((note) => {
          onChangeText(note)
        })
        setInfoMe(data)
      })
  }, [])
  
  const TextChanged = (text) => {
    fireApi.setData("notes/" + infoMe.id, text)
    onChangeText(text)
  }

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(PanResponder.create(
    {
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;
  return (
    <Animated.View
      style={[PrivatePageStyles.WidgetNote,
      { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
      ]}
      {...panResponder.panHandlers}>
      <LinearGradient
        colors={['#FDBB2D', '#E74C3C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1.5 }}
        style={PrivatePageStyles.WidgetNoteGradient}
      >
        <Text> Note </Text>
        <TextInput
          editable
          multiline
          numberOfLines={10}
          maxLength={400}
          placeholder="Take some notes"
          placeholderTextColor="#2d2d2dd4"
          onChangeText={text => TextChanged(text)}
          value={value}
          style={PrivatePageStyles.NoteInput}
        />
      </LinearGradient>
    </Animated.View>
  );
}