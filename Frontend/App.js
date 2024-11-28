import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FoglalasScreen from './screens/FoglalasScreen';
import Foglalas2Screen from './screens/Foglalas2Screen';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';



const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Főoldal">
        
        <Stack.Screen name="Főoldal" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        
        <Stack.Screen name="Időpontfoglalás" component={FoglalasScreen} />
        <Stack.Screen name="Foglalas2" component={Foglalas2Screen} />
        
        
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