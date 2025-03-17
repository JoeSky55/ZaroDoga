import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import OrvosainkScreen from './OrvosainkScreen';
import FoglalasScreen from './FoglalasScreen';
import GaleriaScreen from './GaleriaScreen';




export default function RendelonkScreen({navigation}) {

  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <View stlye={styles.rendelo_doboz} >
      <Image style={styles.rendelo_kep} source={require('../kepek/shbuilding.webp')} />
      </View>
      <View style={styles.gombok}>
        <View style={styles.gombok1}>
          <TouchableOpacity onPress={() => navigation.navigate("Orvosaink")}>
            <Text style={styles.gombSzoveg}>Orvosaink</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.gombok1}>
          <TouchableOpacity onPress={() => navigation.navigate("Időpontfoglalás")}>
          <Text style={styles.gombSzoveg}>Időpontfoglalás</Text>
          </TouchableOpacity>
          </View>
      </View>
      <View style={{flex:12, paddingTop:10}}>
        <Text style={{backgroundColor:'#f0f8ff', borderRadius:30, padding:15, fontFamily:'Inter'}}>
        A Sunshine Dentál modern és barátságos fogászati rendelő, ahol elkötelezettek vagyunk a pácienseink
ragyogó és egészséges mosolyáért. Magasan képzett, tapasztalt csapatunk korszerű technológiával és
személyre szabott figyelemmel biztosítja a legjobb ellátást, legyen szó megelőző kezelésekről, esztétikai
fogászatról vagy fogpótlásokról. Célunk, hogy minden látogatás stresszmentes és kényelmes legyen, így
pácienseink magabiztosan és mosolyogva távozhassanak. 
        </Text>
      </View>

      <View style={styles.copySzoveg}>
      <Text style={styles.copyright}>Copyright © 2024 Sunshine Dental</Text>
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
  card: {
    width: 350,
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
    marginVertical:0,
    alignContent: 'center',
    //flexdirection:'row',
    flex:8,
    
  },
  rendelo_kep:{
    width:'100%',
    height:250,
    borderRadius:30
    
  },
  rendelo_doboz:{
    flex:1,
    width:400,
    
  
    
  },
  copyright:{
    fontSize:10,
    color:'gray'
  },
  gombok:{
    flexDirection:'row',
    
    
    alignContent:'center',
    justifyContent:'center',
  },
  gombok1:{
    backgroundColor:'#8bcefd',
    padding:5,
    margin:10,
    borderRadius:10,
    
  },
  gombSzoveg:{
    fontSize:20
  },
  
  copySzoveg:{
    flex:0.6,
    alignItems:'center',
    marginBottom:10,
    //backgroundColor:'blue'
  }
  
});