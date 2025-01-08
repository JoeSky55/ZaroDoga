import React from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, Touchable, TouchableOpacity, Linking } from 'react-native';

export default function SikeresFoglalasScreen({navigation,route}) {
  //console.log(route.params)
    const {id,nev,orvosId,idopont,datumMentese,orvosNeve}=route.params



    const makeCall = (phoneNumber) => {
      const phoneUrl = `tel:${phoneNumber}`;
      Linking.canOpenURL(phoneUrl)
        .then((supported) => {
          if (!supported) {
            Alert.alert("Hiba", "Nem lehet megnyitni a telefonhívás funkciót ezen az eszközön.");
          } else {
            return Linking.openURL(phoneUrl);
          }
        })
        .catch((err) => console.error("Hiba történt a hívásindítás közben:", err));
    };












  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 0.3, alignItems: "center"}} >
      <Image source={require('../kepek/logo.jpg')} style={styles.logo} />
      </View>
      <View style={{flex: 2}}>
        

        <View style={styles.foglalasiAdatok}>
          <Text style={styles.koszonjuk}>Sikeres Foglalás!</Text>
          
            <Text style={styles.foglalasiSzoveg}>Szakrendelés: {nev}</Text>
            <Text style={styles.foglalasiSzoveg}>Orvos: {orvosNeve}</Text>
            <Text style={styles.foglalasiSzoveg}>Dátum: {datumMentese.replaceAll('-','.')}  {idopont}</Text>
            
        </View>
        
        <View style={{flex:3}}>
          <Text style={{alignSelf: 'center', color:'red',fontFamily:'inter', fontWeight:'bold', fontSize:20}}>
            Időpontot lemondani, illetve módosítani a 
            <TouchableOpacity onPress={()=> makeCall("36 30 602 8611")}>
              <Text style={{fontSize:17, color:'black',textDecorationLine: 'underline'}}>+36 30 602 8611</Text>
            </TouchableOpacity>
             -os számon lehet.
          </Text>
        </View>
           
          {/*+36 50 501 6461*/}
           
          
           
        
        <View style={{flex:6}}>
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
  },
  foglalasiAdatok:{
    flex:9,
    paddingBottom:200,
    alignSelf:'center'

},
foglalasiSzoveg:{
  color:'#113F67',
  fontSize:20,
  fontFamily:'inter',
  fontWeight:'400',
  padding:10,
  //backgroundColor: '#113F67'
},
koszonjuk:{
  color:'#113F67',
  fontSize:30,
  fontFamily:'inter',
  fontWeight:'400',
  padding:10,
  alignSelf:'center',
  flex:1
}
});