import React from 'react';
import {TouchableOpacity,StyleSheet,Image, Text, View, TextInput, TextComponent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreateList({navigation}) {

    const [Name, onChangeName] = React.useState("");
    const [Desc, onDescChange] = React.useState("");
    const [text, chageText] = React.useState("");
    async function Create(){
        if(Name !="" && Desc!=""){
            await fetch('https://127.0.0.1:44375/api/createwishlist',
                {  method: 'POST',  headers: {    Accept: 'application/json',    'Content-Type': 'application/json', 'name': Name, 'description':Desc,'color':"1E602E"  }})
                .then((res)=>res.json()).then((json)=>save(json));
        }
        else{
            chageText("Vyplňte všechno !");
        }
        
    }
    async function save(data:any){
      var raw = await AsyncStorage.getItem('@WishList');
      if(raw){
        var send = new Array();
        var old = JSON.parse(raw)
        send.push(data);
        console.log(send);
        await AsyncStorage.setItem('@WishList',JSON.stringify(old.concat(send)));
      }
      else{
        var send = new Array();
        send.push(data);
        await AsyncStorage.setItem('@WishList',JSON.stringify(send) );
      }
    } 

    return (
    <View style={styles.container}>
              <Image
        style={{height:200,width:200,marginBottom:70,marginTop:20}} source={require('../assets/l.png')}
      />
    
        <View>
            <TextInput style={{borderBottomWidth:1,height:50,textAlign:'center',margin:20, }} onChangeText={onChangeName}  placeholder="Muj uzasny seznam"/>

            <TextInput onChangeText={onDescChange} style={{borderWidth:1,padding:10,borderColor:'grey',borderRadius:20,margin:20,minWidth:'95%',maxWidth:'100%'}} multiline={true} placeholder="Popis meho uzasny seznam"></TextInput>
        </View>
        <TouchableOpacity onPress={()=>{Create();}} style={styles.button}>
        <Ionicons name="create-outline" color="white" size={25}></Ionicons>
      
        <Text style={styles.text}>Vytvořit seznam</Text>
      </TouchableOpacity>
      <Text style={{color:'red',fontWeight:'100',opacity:0.7}}>{text}</Text>
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