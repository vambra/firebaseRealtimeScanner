import React from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"


const CartItemCard = ({ item }) => {
    item = item.item;
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.rowContainer}>
                <View style={styles.itemDetailBox}>
                    <Text style={styles.itemDetails}>{item.price} € x {item.qty}</Text>
                </View>
                <View style={styles.itemTotalBox}>
                    <Text style={styles.itemTotal}>viso: {(item.price * item.qty).toFixed(2)} €</Text>
                </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderColor: '#e6e4f7',
        borderWidth: 2,
        padding: 5,
        paddingTop: 0,
        margin: 1,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 18,
    },
    itemTotal: {
        fontSize: 18,
        textAlign: 'right',
    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemDetailBox: {
        flex: 6,
    },
    itemTotalBox: {
        flex: 4,
    },
});

export default CartItemCard;