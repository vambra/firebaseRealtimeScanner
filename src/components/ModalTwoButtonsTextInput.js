import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Modal, TextInput } from "react-native";


const ModalTwoButtonsTextInput = ({ visible, title, button1Title, button1Event, button2Title, button2Event, textInputValue }) => {
  const [value, setValue] = useState(textInputValue);

  function controlInput(value) {
    value = value.replace(/[^0-9.]/g, '');
    let textArray = value.split('.');

    if(textArray[0] <= 0)
      return 1;

    value = textArray[0] + '.'
    let postComma = ''
    for (let i = 1; i < textArray.length; i++){
      for (let y = 0; y < textArray[i].length; y++)
      {
        if(postComma.length < 3)
          postComma += textArray[i][y];
      }
        
    }
    return Number(value + postComma);
  }
  
  return (
    <SafeAreaView>
      <Modal animationType="slide"
        transparent visible={visible}
        presentationStyle="overFullScreen">
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <View style={styles.textView}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.textInputView}>
              <TextInput
                placeholder={'' + textInputValue}
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={(value) => (setValue(controlInput(value)))}
                value={value} />
            </View> 
            <View style={styles.modalButtons}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={button1Event}
                  style={styles.button}>
                  <Text style={styles.buttonTitle}>{button1Title}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => (button2Event(value, false))}
                  style={styles.button}>
                  <Text style={styles.buttonTitle}>{button2Title}</Text>
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
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonTitle: {
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
    width: '45%',
  },
  textInputView: {
    width: '100%',
    alignItems: 'center',
  },
  textView: {
    padding: 20,
    width: '100%',
  },
  textInput: {
    width: "30%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});

export default ModalTwoButtonsTextInput;