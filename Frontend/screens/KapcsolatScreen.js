import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import IpCim from './IpCim';


export default function KapcsolatScreen({navigation}) {
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
    <View style={styles.container}>
      <View style={styles.card}>
      <View style={styles.cim}>
        <Text style={styles.cim2}>
          Elérhetőségeink:
        </Text>
      </View>


      <View style={styles.box1}>
      <View style={{ justifyContent:'center',alignContent:'center'}}>
          <Text style={styles.szoveg}>
            Telefon: 
          </Text>
        </View>
        <View style={{}}>
        <TouchableOpacity onPress={()=> makeCall("36 30 602 8611")}>
              <Text style={{fontSize:20, color:'#1b4965', fontFamily:'Inter',textDecorationLine: 'underline', fontSize:20, textAlign:'center' }}>+36 30 602 8611</Text>
            </TouchableOpacity>
        </View>
      </View>


      <View style={styles.box2}>
        <View >
          <Text style={styles.szoveg}>
            Email: 
          </Text>
        </View>
        <View style={{}}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:sunshinedentalfogaszat@gmail.com') }
      title="support@example.com" >
        <Text style={{fontSize:20, color:'#1b4965', fontFamily:'Inter',textDecorationLine: 'underline', fontSize:20, }}>
           sunshineinfo@gmail.com
        </Text>
        </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.box3}>
        <Text style={styles.szoveg}>
          Posta:
        </Text>
        <Text style={styles.szoveg2}>
          4031 Debrecen István út 26.
        </Text>
      </View>


      <View style={styles.box4}>
        <Text style={styles.szoveg}>
          Weblapunk:
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(IpCim.Ipcim + 'kezdolap')}>
        <Text style={styles.szoveg2}>
          4031 Debrecen István út 26.
        </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1,
    width:400,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f0f8ff',
    
  },
  cim:{
    alignSelf:'center',
    paddingBottom:50
  },
  card: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 50,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginHorizontal:30,
    marginVertical:20,
    alignContent: 'center',
    //flexdirection:'row',
    flex:5
  },
  box1:{
    flex:0.5,
    alignSelf:'center',
    flexDirection:'column',
    width:300,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor:'red',
    padding:30
    
  },
  box2:{
    flex:0.5,
    alignSelf:'center',
    flexDirection:'column',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'red',
    padding:30
  },
  box3:{
    flex:0.5,
    alignSelf:'center',
    backgroundColor:'red',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    padding:30
  },
  box4:{
    flex:0.5,
    alignSelf:'center',
    backgroundColor:'red',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    padding:30
  },
  szoveg:{
    fontSize:20,
    fontFamily:'Inter',
    color:'#1b4965',
    textAlign:'center',
    fontWeight:'bold'
  },
  szoveg2:{
    fontSize:20,
    fontFamily:'Inter',
    color:'#1b4965',
    textAlign:'center',
    //fontWeight:'bold'
  },
  cim2:{
    fontSize:25,
    color:'#1b4965'
  }
  
});