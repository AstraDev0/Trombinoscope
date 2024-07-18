import { View, TextInput, TouchableOpacity, Text, FlatList, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { LogBtnStyle } from "../../style"
import localStorage from '../utils/localStorage'

const handleLogout = (navigation) => {
    localStorage.removeData("_me")
    localStorage.removeData("token")
    navigation.navigate('Login')
}
export function LogOffBtn({ navigation }) {
    return (
        <View style={LogBtnStyle.container}>
            <TouchableOpacity onPress={() => handleLogout(navigation)}>
                <Image
                    source={require('../assets/logoff.png')}
                    style={LogBtnStyle.img}
                />
            </TouchableOpacity>
        </View>
    );
}
