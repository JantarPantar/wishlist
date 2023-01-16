import React, { version,useEffect, useState } from 'react';
import {FlatList,TouchableOpacity,StyleSheet,Image, Text, View, TextInput, TextComponent, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Ionicons } from '@expo/vector-icons';

export default function ListDetail({route,navigation}) {
  const { itemId } = route.params;
  const [dataapi, setDataapi] = useState([])

  function LoadData(){
    fetch('http://localhost:44375/api/items/'+itemId).then((response)=>response.json()).then((data)=>setDataapi(data))
  }
  LoadData()  ;

    return (
        <View style={styles.container}>
          <Text style={{fontSize:20}}>SEznam</Text>
          
          <Text>url: {(itemId)}</Text>
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          {dataapi.map((aa) => (
          <TouchableOpacity onPress={()=>{}}>
            <View style={styles.item}>
            <View style={{borderLeftWidth:2,backgroundColor:'#'+aa.color,padding:5}}>
              <Text style={{fontSize:20}}>{(aa.name)}</Text>
            </View>
          </View>
          </TouchableOpacity>
          ))}
          </View>
          <QRCode value={itemId}/>


          <TouchableOpacity style={{position:'absolute',bottom:50,right:50,backgroundColor:"#FF6D6D", borderRadius:20,alignSelf:'center',justifyContent:'center'}} onPress={()=>{navigation.navigate('AddItem', {url:itemId})}}>
              <Ionicons color="white" size={50} name="add"/>
          </TouchableOpacity>
        </View>

  );
}

const styles = StyleSheet.create({
    container: {
      height:'100%',
      alignItems: 'center',
      backgroundColor: '#fff',
      width:'100%'
    },
    item:{
      backgroundColor: '#fff',
      padding:10,
      margin:5,
      width:'100%'
    }
  });