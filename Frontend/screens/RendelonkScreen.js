import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function RendelonkScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View stlye={styles.rendelo_doboz} >
      <Image style={styles.rendelo_kep} source={require('../kepek/shbuilding.webp')} />
      </View>

      <View style={{flex:11, paddingTop:0}}>
        <Text style={{backgroundColor:'#8bcefd', borderRadius:30, padding:20, fontFamily:'Inter'}}>
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
  rendelo_kep:{
    width:350,
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
  copySzoveg:{
    flex:0.5,
    alignItems:'center',
    marginBottom:10,
    //backgroundColor:'blue'
  }
  
});