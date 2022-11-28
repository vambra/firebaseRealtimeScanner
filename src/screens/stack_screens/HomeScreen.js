import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import CustomNavigationButton from '../../components/CustomNavigationButton';
import ScannedItemCard from '../../components/ScannedItemCard';
import { Dimensions } from 'react-native'
import FloatingActionButton from '../../components/FloatingActionButton';
import ModalTwoButtonsTextInput from '../../components/ModalTwoButtonsTextInput';
import { ref, set, get, child, push, remove, update } from "firebase/database";
import { database } from '../../../firebaseConfig';


function HomeScreen({ navigation, route }) {
  const { sessionId } = route.params;
  console.log("session: ", sessionId);
  const [scanned, setScanned] = useState(true);
  const [scannedItem, setScannedItem] = useState(null)
  const [showQtyEdit, setShowQtyEdit] = useState(false);
  const [showQtyModal, setShowQtyModal] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('Scanned item: ' + data);
    getItemData(data);
  };

  const writeNewItem = (newItem) => {
    //newItem = { code: code, name: name, price: price, qty: 1, entryId: null, productId: key };
    //check if exists in cart
    console.log("newItem")
    console.log(newItem)
    console.log(newItem.productId)
    const dbRef = ref(database, 'sessions/' + sessionId);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {

        const productArray = (Object.values(snapshot.val()))
        const idArray = (Object.keys(snapshot.val()))
        //var newItem = null;
        var keyIndex = -1;

        productArray.forEach(product => {
          const { productId, qty } = product;
          keyIndex++;
          console.log("45: " + productId, qty)
          if (productId == newItem.productId) {
            console.log("HomeScreen: Duplicate item found");
            const key = idArray[keyIndex];
            const dbRefItem = ref(database, 'sessions/' + sessionId + '/' + key);
            const newQty = qty + 1
            update(dbRefItem, { qty: newQty })
            newItem = { code: newItem.code, name: newItem.name, price: newItem.price, qty: newQty, entryId: key, productId: newItem.productId };
            setScannedItem(newItem);
          }
        });

        if (newItem.entryId == null) {
          const newItemRef = push(dbRef);
          set(newItemRef, {
            productId: newItem.productId,
            qty: newItem.qty
          });
          console.log("HomeScreen: Item " + newItem.productId + " added to cart under key " + newItemRef.key);
          newItem = { code: newItem.code, name: newItem.name, price: newItem.price, qty: newItem.qty, entryId: newItemRef.key, productId: newItem.productId };
          setScannedItem(newItem);
        }
      } else {
        console.log("HomeScreen: Duplicate item not found");
        const newItemRef = push(dbRef);
          set(newItemRef, {
            productId: newItem.productId,
            qty: newItem.qty
          });
          console.log("HomeScreen: Item " + newItem.productId + " added to cart under key " + newItemRef.key);
          newItem = { code: newItem.code, name: newItem.name, price: newItem.price, qty: newItem.qty, entryId: newItemRef.key, productId: newItem.productId };
          setScannedItem(newItem);
      }
    }).catch((error) => {
      console.error(error);
      setScannedItem(null);
    });

    
    //setScannedItem(newItem);
  };

  const getItemData = (itemCode) => {
    const dbRef = ref(database);
    get(child(dbRef, 'products/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const productArray = (Object.values(snapshot.val()))
        const idArray = (Object.keys(snapshot.val()))
        var newItem = null;
        var keyIndex = -1;
        productArray.forEach(product => {
          const { code, name, price } = product;
          keyIndex++;
          if (itemCode == code) {
            const key = idArray[keyIndex];
            newItem = { code: code, name: name, price: price, qty: 1, entryId: null, productId: key };
          }
        });
        writeNewItem(newItem);
      } else {
        console.log("HomeScreen: No data available");
        setScannedItem(null);
      }
    }).catch((error) => {
      console.error(error);
      setScannedItem(null);
    });
  };



  const handleQtyEdit = (quantity) => {
    console.log('HomeScreen: item quantity changed to: ' + quantity)
    setScannedItem({ code: scannedItem.code, name: scannedItem.name, price: scannedItem.price, qty: quantity, entryId: scannedItem.entryId, productId: scannedItem.productId });
    const dbRef = ref(database, 'sessions/' + sessionId + '/' + scannedItem.entryId);
    update(dbRef, { qty: quantity }).then(() => {
      console.log("HomeScreen: item " + scannedItem.entryId + " qty updated");
    });
    if (showQtyModal)
      setShowQtyEdit(false);
    setShowQtyModal(false);

  };

  const handleScanUndo = () => {
    const dbRef = ref(database, 'sessions/' + sessionId + '/' + scannedItem.entryId);
    remove(dbRef).then(() => {
      console.log("HomeScreen: item " + scannedItem.entryId + " removed");
    });
    setScanned(false);
    setScannedItem(null);
    setShowQtyEdit(false)
  }

  const handleNewScan = () => {
    setScanned(false);
    setShowQtyEdit(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {scanned ||
          <View style={styles.barcodeBox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.barcodeScanner}>
              <BarcodeMask style={styles.barcodeMask} />
            </BarCodeScanner>
          </View>
        }
        <View style={styles.itemCard}>
          {scannedItem ? <ScannedItemCard item={scannedItem} /> : <Text style={styles.instructText}>Prašome skenuoti prekę</Text>}

        </View>


      </View>
      {scanned ||
        <View width='100%' bottom={110}>
          <View style={styles.fabBottom}>
            <FloatingActionButton size={80} icon='close-outline' event={() => setScanned(true)} />
          </View>
        </View>
      }
      {scanned &&
        <View style={styles.fabView}>
          {scannedItem &&
            <>
              <View style={styles.fabTop}>
                <FloatingActionButton size={80} icon='ellipsis-horizontal-outline' event={() => setShowQtyEdit(showQtyEdit ? false : true)} />
              </View>
              <View style={styles.fabMid}>
                <FloatingActionButton size={80} icon='arrow-undo-outline' event={handleScanUndo} />
              </View>
            </>
          }
          <View style={styles.fabBottom}>
            <FloatingActionButton size={80} icon='add' event={handleNewScan} />
          </View>
          {showQtyEdit &&
            <View right={95} bottom={260}>
              <View position={'absolute'} right={0}>
                <FloatingActionButton size={60} icon='add-circle-outline' event={() => handleQtyEdit(scannedItem.qty + 1)} />
              </View>
              <View position={'absolute'} right={65}>
                <FloatingActionButton size={60} icon='remove-circle-outline' event={() => (scannedItem.qty == 1 ? {} : handleQtyEdit(scannedItem.qty - 1))} />
              </View>
              <View position={'absolute'} right={130}>
                <FloatingActionButton size={60} icon='pencil-outline' event={() => setShowQtyModal(true)} />
              </View>
            </View>
          }
        </View>
      }
      <View style={styles.bottomButtonArea}>
        <CustomNavigationButton navigation={navigation} sessionId={sessionId} />
      </View>

      {scannedItem &&
        <ModalTwoButtonsTextInput
          visible={showQtyModal}
          title={"Nustatykite prekės kiekį:"}
          button1Title='Atšaukti'
          button1Event={() => (setShowQtyModal(false), setShowQtyEdit(false))}
          button2Title='Išsaugoti'
          button2Event={handleQtyEdit}
          textInputValue={scannedItem.qty}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    overflow: 'hidden',
    borderRadius: 30,
  },
  barcodeScanner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  barcodeMask: {
    edgeColor: 'red',
    showAnimatedLine: 'false',
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
  fabTop: {
    position: 'absolute',
    bottom: 190,
    right: 10,
  },
  fabMid: {
    position: 'absolute',
    bottom: 100,
    right: 10,
  },
  fabBottom: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  fabView: {
    width: '100%',
    bottom: 70,
  },
  bottomButtonArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'stretch'
  },
  itemCard: {
    flex: 1,
    width: '100%',
    margin: 5,
    marginTop: 15,
  },
  view: {
    flex: 1,
    width: '100%',
  },
  instructText: {
    fontSize: 20,
  }
});

export default HomeScreen;