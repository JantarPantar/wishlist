import React, { version,useEffect, useState } from 'react';
import {FlatList,TouchableOpacity,StyleSheet,Image, Text, View, TextInput, TextComponent, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddItem({route,navigation}) {
  const { url } = route.params;
  const [Color, onChangeColor] = React.useState("");
  const [Name, onNameChange] = React.useState("");
  const [Href, chageHref] = React.useState("");
  const [text, chageText] = React.useState("");

  async function Sync(){
    if(Name !="" ){
        await fetch('http://localhost:44375/api/wishlist/'+url+'/createitem',
            {  method: 'POST',  headers: {    Accept: 'application/json',    'Content-Type': 'application/json', 'name': Name,'color':Color,"hrefurl":Href  }})
            .then((res)=>res.json()).then((json=>console.log(json)));
            navigation.navigate('ListDetail',{'itemId':url});
    }
    else{
        chageText("Vyplňte všechno !");
    }
  }

    return (
        <View style={styles.container}>
          <Text style={{fontSize:20}}>Add</Text>
          
          <Text>url: {(url)}</Text>


          <View style={styles.container}>
              <Image style={{height:200,width:200,marginBottom:70,marginTop:20}} source={require('../assets/lll.png')}/>
    
            <View>
            <TextInput onChangeText={onNameChange} style={{borderWidth:1,padding:10,borderColor:'grey',borderRadius:20,margin:20,minWidth:'95%',maxWidth:'100%'}} multiline={true} placeholder="Název"></TextInput>
            <TextInput onChangeText={chageHref} style={{borderWidth:1,padding:10,borderColor:'grey',borderRadius:20,margin:20,minWidth:'95%',maxWidth:'100%'}} multiline={true} placeholder="Odkaz pro nákup"></TextInput>
            <TextInput onChangeText={onChangeColor} style={{borderWidth:1,padding:10,borderColor:'grey',borderRadius:20,margin:20,minWidth:'95%',maxWidth:'100%'}} multiline={true} placeholder="Barva (hex bez #)"></TextInput>
            </View>

            <TouchableOpacity onPress={()=>{Sync()}} style={styles.button}>
              <Ionicons name="add-outline" color="white" size={25}></Ionicons>
      
              <Text style={styles.text}>Přidat položku</Text>
            </TouchableOpacity>
            <Text style={{color:'red',fontWeight:'100',opacity:0.7}}>{text}</Text>
          </View>
          
        </View>
  );
}

const styles = StyleSheet.create({
  button:{
  display:'flex',
  margin:5,
  padding:6,
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