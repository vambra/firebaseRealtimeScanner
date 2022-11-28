import React from "react";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";


const CustomNavigationButton = ({ navigation, sessionId }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart', { sessionId })}
        style={styles.container}>
          <Text style={styles.title}>PREKIŲ KREPŠELIS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
  },
});

export default CustomNavigationButton;