import React from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';

export default function SikeresFoglalasScreen({navigation,route}) {
    const {id,nev,orvosId,idopont,datumMentese,orvosNeve}=route.params
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
      <View style={{flex: 4}}>
        <View >

          
            

            <TouchableOpacity style={styles.gombok} onPress={() => navigation.navigate("Főoldal")}>
              <Text style={styles.gombokSzoveg}>Vissza a főoldalra</Text>
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
    backgroundColor: '#fff'
  },
  logo:{
    width:'80%',
    height:'80%',
    resizeMode: 'contain'
    
  },
  logo_box:{
    width:'100%',
    height: 'auto',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'red'
  },
  gombok:{
    padding:20,
    margin:20,
    width:300,
    backgroundColor: '#113F67',
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