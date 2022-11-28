import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Modal } from "react-native";


const ModalOneButton = ({ visible, title, buttonTitle, buttonEvent }) => {
  return (
    <SafeAreaView>
      <Modal animationType="slide"
        transparent visible={visible}
        presentationStyle="overFullScreen">
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <View style={styles.textView}>
            <Text>{title}</Text>
            </View>
            <View style={styles.modalButtons}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={buttonEvent}
                  style={styles.button}>
                  <Text style={styles.title}>{buttonTitle}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    elevation: 5,
    height: 180,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  buttonView: {
    width: '90%',
  },
  textView: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
});

export default ModalOneButton;