import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  function Check(data:any){
        fetch('http://localhost:44375/api/wishlist/'+data).then((res)=>res.json()).then((json)=>save(json));
    }
    



  async function save(data:any){
    var raw = await AsyncStorage.getItem('@WishList');
    if(raw){
      var send = new Array();
      var old = JSON.parse(raw)
      send.push(data);
      await AsyncStorage.setItem('@WishList',JSON.stringify(old.concat(send)));
    }
    else{
      var send = new Array();
      send.push(data);
      await AsyncStorage.setItem('@WishList',JSON.stringify(send) );
    }
    navigation.navigate('ListDetail');
  } 




  useEffect(() => {
    (async () => {
      setScanned(false)

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    alert('nacteno');
    Check(data);
    setScanned(false)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{height:300,width:500,overflow:'hidden'}}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{height:500,width:500}}/>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'  },
});
