import React, { version,useEffect, useState } from 'react';
import {FlatList,TouchableOpacity,StyleSheet,Image, Text, View, TextInput, TextComponent, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function OpenList({navigation}) {

  const [data, setData] = useState([{"_name":"model","_desc":"model","_id":"model","_color":"model"}])



  useEffect(() => {
    const fetchpairs = async() => {
      var raw = await AsyncStorage.getItem('@WishList');
      setData(JSON.parse(raw+""))
    }
    fetchpairs()
}, [])



    async function save(){
      await AsyncStorage.setItem('@WishList', "");
    } 
    async function read(){
      alert(await AsyncStorage.getItem('@WishList'));
    } 

    const ListG = () =>{
        return(
      <View>
        <ScrollView style={{width:'100%'}}>
          {data.map((aa) => (
          <TouchableOpacity key={aa._id} onPress={()=>{navigation.navigate('ListDetail', {itemId:aa._id})}}>
            <View style={styles.item}>
            <View style={{borderLeftWidth:2,borderLeftColor:'#'+aa._color,padding:5}}>
              <Text style={{fontSize:20}}>{(aa._name)}</Text>
              <Text style={{color:'grey'}}>{(aa._desc)}</Text>
            </View>
          </View>
          </TouchableOpacity>
          ))}
          </ScrollView>
          
          <TouchableOpacity style={{position:'absolute',bottom:50,right:50,backgroundColor:"#FF6D6D", borderRadius:20,alignSelf:'center',justifyContent:'center'}} onPress={()=>{navigation.navigate('Scan')}}>
            <Ionicons color="white" size={50} name="scan"/>
          </TouchableOpacity>
      </View>
      );

      
    }

    return (
    <View style={styles.container}>
            <ListG/>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    item:{
      backgroundColor: '#fff',
      padding:10,
      margin:5,
      width:'100%'
    }
  });