import React, { useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, Animated, Easing } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const FloatingActionButton = ({ size, icon, event }) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }
  const iconSize = size / 2;

  useEffect(() => {
    Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
  }, [fadeAnimation])

  return (
    <SafeAreaView>
      <Animated.View
        style={{ opacity: fadeAnimation, }}
      >
        <TouchableOpacity
          onPress={event}
          style={[styles.container, sizeStyle]}>
          <Icon
            name={icon}
            color="#fff"
            size={iconSize}
          />
        </TouchableOpacity>
      </Animated.View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
  },
});

export default FloatingActionButton;