import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";


const ScannedItemCard = ({ item }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>PASKUTINĖ NUSKENUOTA PREKĖ</Text>
            </View>
            <View style={styles.detailsBox}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.subTitle}>Vieneto kaina: {item.price} €</Text>
                <Text style={styles.subTitle}>Kiekis: {item.qty}</Text>
                <Text style={styles.total}>VISO: {(item.price * item.qty).toFixed(2)} €</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBox: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'darkslateblue',
        padding: 5,
        paddingBottom: 0,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    detailsBox: {
        backgroundColor: '#e6e4f7',
        borderColor: 'darkslateblue',
        borderWidth: 2,
        padding: 5,
        paddingTop: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 18,
    },
    total: {
        fontSize: 20,
        textAlign: 'right',
    },
});

export default ScannedItemCard;