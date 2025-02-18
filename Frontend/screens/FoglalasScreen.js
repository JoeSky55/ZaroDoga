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
      <Text style={styles.cim}>Konzultációk</Text>

      <FlatList
          data={adatok}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={{width:370, alignContent:'center', justifyContent:'center', alignSelf:'center', marginBottom:0}}>
                <TouchableOpacity onPress={() => reszletekFv(item.szak_id,item.szak_nev)}>
                <Image style={styles.rendeles_logo} source={helyiKepek[item.szak_kep] || require('../kepek/rendeles_ikon.png')} />
                </TouchableOpacity>
                
              
              <View style={styles.feliratHatter}>
              <TouchableOpacity  onPress={() => reszletekFv(item.szak_id,item.szak_nev)}>
              <Text style={styles.rendeles_felirat}>{item.szak_nev}</Text>
              </TouchableOpacity>
              </View>
                
              
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
    width: 200, // Állítsd be megfelelő méretre
    height: 200,
    padding: 10,
    alignSelf:'center',
    marginBottom: 10,
    //backgroundColor:"red"
    
  },
  card: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 0,
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 20,
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginHorizontal:30,
    marginVertical:40,
    
    alignItems: 'center',
  },
  rendeles_felirat:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:22,
    color:'#fff',
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    marginBottom:0
    
    
  },
  feliratHatter:{
    backgroundColor:'#4da8dd',
    height:100,
    borderRadius:20,
    alignContent:'center',
    justifyContent:'center',
    width:'81%',
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