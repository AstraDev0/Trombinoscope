import { View } from 'react-native';
import React from 'react';
import { PrivatePageStyles } from "../../style";
import { DisplayWidget } from "../components/DisplayWidgets";

export function PrivateScreen(navigation) {
    return (
      <View style={PrivatePageStyles.privateScreen}>
        <DisplayWidget navigation={navigation}/>
      </View>
    );
  }
