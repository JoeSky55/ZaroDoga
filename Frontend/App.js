import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FoglalasScreen from './screens/FoglalasScreen';
import Foglalas2Screen from './screens/Foglalas2Screen';
import Foglalas3Screen from './screens/Foglalas3Screen';
import SikeresFoglalasScreen from './screens/SikeresFoglalasScreen';
import RendelonkScreen from './screens/RendelonkScreen';
import OrvosainkScreen from './screens/OrvosainkScreen';
import KapcsolatScreen from './screens/KapcsolatScreen';
import GaleriaScreen from './screens/GaleriaScreen';
import { StyleSheet, Text, View, FlatList, Image} from 'react-native';




const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Főoldal">
        
        <Stack.Screen name="Főoldal" component={HomeScreen} options={{headerLeft: null, headerShown: false }}  />
        <Stack.Screen name="Orvosaink" component={OrvosainkScreen} options={{headerTitle: '',headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'}, headerTintColor: '#113F67' }} />
        <Stack.Screen name="Rendelőnk" component={RendelonkScreen} options={{headerTitle: '',headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'}, headerTintColor: '#113F67' }} />
        <Stack.Screen name="Galéria" component={GaleriaScreen} options={{headerTitle: '',headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'}, headerTintColor: '#113F67' }} />
        <Stack.Screen name="Kapcsolat" component={KapcsolatScreen} options={{headerTitle: '',headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'}, headerTintColor: '#113F67' }} />
        
        <Stack.Screen name="Időpontfoglalás" component={FoglalasScreen} options={{headerTitle: '',headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'}, headerTintColor: '#113F67' }}  />
        <Stack.Screen name="Foglalas2Screen" component={Foglalas2Screen} options={{headerTitle: '', headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'} }}/>
        <Stack.Screen name="Foglalas3Screen" component={Foglalas3Screen} options={{headerTitle: '',headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'}}}/>
        <Stack.Screen name="SikeresFoglalas" component={SikeresFoglalasScreen} options={{gestureEnabled: false,headerLeft: null,headerShown: false,headerStyle:{borderBottomWidth: 0,shadowOpacity: 0,elevation: 0,backgroundColor: '#f0f8ff'} }}/>
        
        
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