import React from 'react';
import { View } from 'react-native';
import Start from './Screens/Start'
import Create from './Screens/CreateList'
import Open from './Screens/OpenList'
import DetailList from './Screens/ListDetail'
import AddItem from './Screens/AddItem'
import Scan from './Screens/ScanQrCode'



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">

        <Stack.Screen name="Start" component={Start}/>
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="Open" component={Open}/>
        <Stack.Screen name="ListDetail" component={DetailList} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="Scan" component={Scan} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}