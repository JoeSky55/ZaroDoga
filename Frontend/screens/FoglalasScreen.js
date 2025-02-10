import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import IpCim from './IpCim';

export default function FoglalasScreen({navigation}) {
  const [adatok,setAdatok]=useState([])

  const letoltes=async ()=>{
    const x=await fetch(IpCim.Ipcim +"szakteruletek")
    const y=await x.json()
    setAdatok(y)
    //alert(JSON.stringify(y))
  }

    useEffect(()=>{
      letoltes()
  },[])

  const reszletekFv=(id,nev)=>{
    //alert(id)
    navigation.navigate("Foglalas2Screen",{id:id,nev:nev})

  }

  const helyiKepek = {
    "101.png": require('../kepek/101.png'),
    "102.png": require('../kepek/102.png'),
    "103.png": require('../kepek/103.png'),
    "104.png": require('../kepek/104.png'),
    "105.png": require('../kepek/105.png'),
    "106.png": require('../kepek/106.png'),
    "107.png": require('../kepek/107.png'),
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#f0f8ff', }}>
      <Text style={styles.cim}>Szakrendeléseink</Text>

      <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View style={{width:370, alignContent:'center', justifyContent:'center', alignSelf:'center', marginBottom:50}}>
                <View>
                <Image style={styles.rendeles_logo} source={helyiKepek[item.szak_kep] || require('../kepek/rendeles_ikon.png')} />
                </View>
                
              
              <View style={styles.feliratHatter}>
              <TouchableOpacity  onPress={() => reszletekFv(item.szak_id,item.szak_nev)}>
              <Text style={styles.rendeles_felirat}>{item.szak_nev}</Text>
              </TouchableOpacity>
              </View>
                
              
              </View>
            )}
          keyExtractor={item => item.szak_nev}
          showsVerticalScrollIndicator={false}
        />


      

    </View>
  );
}
const styles = StyleSheet.create({

  rendeles_logo:{
    width: 128, // Állítsd be megfelelő méretre
    height: 128,
    padding: 10,
    alignSelf:'center',
    marginBottom: 10,
    //backgroundColor:"red"
    
  },
  rendeles_felirat:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:22,
    color:'#fff',
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    
    
  },
  feliratHatter:{
    backgroundColor:'#4da8dd',
    height:100,
    borderRadius:50,
    alignContent:'center',
    justifyContent:'center',
    width:'80%',
    marginLeft:35,
    shadowColor:'#113F67',
    shadowOffset:{width:0,height:5},
    shadowOpacity:0.4,
    shadowRadius:7,
    
  },
  cim:{
    fontSize:24,
    color:'#1b4965',
    backgroundColor:'#f0f8ff',
    
    
  }
})