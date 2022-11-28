import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import CartItemCard from "../../components/CartItemCard";
import { ref, get, child, onValue } from "firebase/database";
import { database } from '../../../firebaseConfig';


function CartScreen({ navigation, route }) {
    const { sessionId } = route.params;
    const [loading, setLoading] = useState(true);
    const [itemCart, setItemCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect(() => {
        setLoading(true);
        retrieveData();
    }, [])

    function retrieveData() {

        var newData = [];
        setItemCart(newData);
        const dbRef = ref(database, 'sessions/' + sessionId);
        try {
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = Object.values(snapshot.val());
                    data.forEach(item => {
                        var newItem = null;

                        const dbRefProduct = ref(database);
                        get(child(dbRefProduct, 'products/' + item.productId)).then((snapshot) => {
                            if (snapshot.exists()) {
                                const productData = snapshot.val()
                                newItem = {
                                    name: productData.name,
                                    qty: item.qty,
                                    price: productData.price
                                };
                                newData = [...newData, newItem];
                                setItemCart(newData);   
                                calculateCartTotal(newData);
                            }
                        })
                    })
                } else {
                    console.log("CartScreen: No cart data to return");
                }
            })
        }
        catch (error) {
            console.log("CartScreen: " + error);
        }
        finally {
            setLoading(false);
        }

    }

    const calculateCartTotal = (cartData) => {
        if (cartData == null || cartData == undefined) {
            setCartTotal(0);
        } else {
            var totalSum = 0;
            cartData.forEach(item => {
                totalSum += Number((item.price * item.qty).toFixed(2));
            });
            setCartTotal(totalSum);
        }
    }

    return (
        <SafeAreaView style={styles.view}>
            <FlatList
                style={styles.flatlist}
                refreshing={loading}
                onRefresh={() => retrieveData()}
                data={itemCart}
                renderItem={(item) => (
                    <CartItemCard item={item} />
                )}
            />
            <View style={styles.cartTotalBox}>
                <Text style={styles.cartTotalText}>
                    Krepšelio suma: {cartTotal} €
                </Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatlist: {
        width: '100%',
    },
    cartTotalBox: {
        width: '100%',
        padding: 10,
        backgroundColor: '#e6e4f7',
        borderColor: 'darkslateblue',
        borderTopWidth: 3,
    },
    cartTotalText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'right',
    }
});

export default CartScreen;