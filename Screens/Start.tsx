import { StatusBar } from 'expo-status-bar';
import React, { cloneElement } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Start({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:30}}>Seznam přání</Text>
      <Text style={{fontSize:20,padding:30,textAlign:'center'}}>Jednoduše nasdílej co si přeješ, nebo zjisti co si ostatní přejí</Text>
      <Image
        style={{height:200,width:200,marginBottom:70,marginTop:20}} source={require('../assets/ll.png')}
      />
      <View style={{flexDirection:'row'}}>

      <TouchableOpacity onPress={()=>{navigation.navigate("Create")}} style={styles.button}>
        <Ionicons name="pencil-outline" color="white" size={25}></Ionicons>
      
        <Text style={styles.text}>Vytvořit</Text>
      </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate("Open")}} style={styles.button}>
          <Ionicons name="open-outline" color="white" size={25}></Ionicons>
          <Text style={styles.text}>Otevřít</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={async ()=>{await AsyncStorage.setItem('@WishList',"")}}>
        <Text>Vymazat</Text>
      </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
  display:'flex',
  margin:5,
  padding:12,
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:'#FF6D6D',
  justifyContent:'center',
  borderRadius:20,
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:15,
    padding:8,
    fontWeight:'100',
    color:'white'
  }
});
