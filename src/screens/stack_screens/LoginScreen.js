import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';
import uuid from 'react-native-uuid';
import { database } from '../../../firebaseConfig';
import { ref, get, child } from "firebase/database";


class LoginScreen extends Component {
    state = {
        CameraPermissionGranted: null,
        loading: true,
    }

    async componentDidMount() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({ CameraPermissionGranted: status === 'granted' ? true : false, loading: false })
    }


    handleLogin() {

        var sessionId = uuid.v4();
        this.setState({ loading: true })

        while (this.checkIfSessionIdExists(sessionId)) {
            sessionId = uuid.v4();
        }

        this.setState({ loading: false })
        this.props.navigation.navigate('Home', { sessionId });
    }

    checkIfSessionIdExists(sessionId) {
        const dbRef = ref(database);
        get(child(dbRef, 'sessions/' + sessionId)).then((snapshot) => {
            if (snapshot.exists()) {
                return true;
            } else {
                return false;
            }
        }).catch((error) => {
            console.error(error);
        });
    }




    render() {
        const { CameraPermissionGranted } = this.state;

        if (CameraPermissionGranted === null) {
            return (
                <SafeAreaView>
                    <Text>Prašome programėlei leisti naudotis įrenginio fotoaparatu</Text>
                </SafeAreaView>
            );
        }
        if (CameraPermissionGranted === false) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text>Programėlė neturi prieigos prie įrenginio fotoaparato</Text>
                    <Text></Text>
                    <Text>Prieigos leidimą nustatykite įrenginio nustatymuose</Text>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity
                    onPress={() => this.handleLogin()}
                    style={styles.button} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    cancelable={false}
                    animation={"fade"}
                    overlayColor={"rgba(0, 0, 0, 0.4)"}
                />
            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    barcodeScanner: {
        height: 400,
        width: 400,
    },
    barcodeMask: {

    },
    mainText: {
        fontSize: 16,
        margin: 20,
    },
    instruction: {
        margin: 10,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    button: {
        backgroundColor: 'darkslateblue',
        marginTop: 20,
        width: '40%',
        padding: 15,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default LoginScreen;