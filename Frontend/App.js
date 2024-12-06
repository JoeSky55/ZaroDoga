import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FoglalasScreen from './screens/FoglalasScreen';
import Foglalas2Screen from './screens/Foglalas2Screen';
import Foglalas3Screen from './screens/Foglalas3Screen';
import RendelonkScreen from './screens/RendelonkScreen';
import OrvosainkScreen from './screens/OrvosainkScreen';
import KapcsolatScreen from './screens/KapcsolatScreen';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';




const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Főoldal">
        
        <Stack.Screen name="Főoldal" component={HomeScreen} />
        <Stack.Screen name="Orvosaink" component={OrvosainkScreen} />
        <Stack.Screen name="Rendelőnk" component={RendelonkScreen} />
        <Stack.Screen name="Kapcsolat" component={KapcsolatScreen} />
        
        <Stack.Screen name="Időpontfoglalás" component={FoglalasScreen} />
        <Stack.Screen name=" " component={Foglalas2Screen} />
        <Stack.Screen name="Foglalas3" component={Foglalas3Screen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle:{
    width: '400',
    height:100,
    backgroundColor: 'red',
    marginTop:50

  }
});