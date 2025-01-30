import React from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1, alignItems: "center"}} >
      <Image source={require('../kepek/logo.jpg')} style={styles.logo} />
      </View>
      <View style={{flex: 2.5}}>
        <View >

          
            <TouchableOpacity style={styles.gombok} onPress={() => navigation.navigate("Időpontfoglalás")}>
              <Text style={styles.gombokSzoveg}>Időpontfoglalás</Text>
            </TouchableOpacity >

            <TouchableOpacity style={styles.gombok} onPress={() => navigation.navigate("Rendelőnk")}>
              <Text style={styles.gombokSzoveg}>Rendelőnk</Text>
            </TouchableOpacity >

            <TouchableOpacity style={styles.gombok} onPress={() => navigation.navigate("Orvosaink")}>
              <Text style={styles.gombokSzoveg}>Orvosaink</Text>
            </TouchableOpacity >

            <TouchableOpacity style={styles.gombok} onPress={() => navigation.navigate("Kapcsolat")}>
              <Text style={styles.gombokSzoveg}>Kapcsolat</Text>
            </TouchableOpacity >
            
          
           
          
           
        </View>
     </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#d4eaea'
  },
  logo:{
    width:'80%',
    height:'80%',
    resizeMode: 'contain',
    
    
    
  },
  logo_box:{
    width:'100%',
    height: 'auto',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'red',
  },
  gombok:{
    padding:20,
    margin:20,
    width:300,
    backgroundColor: '#4da8dd',
    borderRadius:50,
    color:'white',
    alignSelf:'center'
    
  },
  gombokSzoveg:{
    alignSelf:'center',
    color:'white',
    fontFamily:'inter',
    fontWeight:'400',
    fontSize:24
  }
});