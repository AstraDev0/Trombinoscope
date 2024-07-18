import { Text, PanResponder, Animated } from 'react-native';
import React, { useRef } from 'react';
import { PrivatePageStyles } from "../../../style"
import { LinearGradient } from 'expo-linear-gradient';
import Clock from 'react-live-clock';

export function ClockWidget () {

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
          style={[PrivatePageStyles.WidgetClock, 
                  {transform: [{translateX: pan.x}, {translateY: pan.y}]}
          ]}
          {...panResponder.panHandlers}
          >
          <LinearGradient
            colors={['#e84393', '#9b59b6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            style={PrivatePageStyles.WidgetClockGradient} 
          >
        <Text>
          <Clock
            format={'h:mm:ssa'}
            style={PrivatePageStyles.WidgetClockClock}
            ticking={true}
            blinking={true}
            locale={'fr'} 
            element={Text}
          />
        </Text>
          </LinearGradient>
        </Animated.View>
    );
}