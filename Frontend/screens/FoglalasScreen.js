import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function FoglalasScreen({navigation}) {
  const [adatok,setAdatok]=useState([])

  const letoltes=async ()=>{
    const x=await fetch("http://192.168.10.62:3000/szakteruletek")
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
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#d4eaea', }}>
      <Text style={styles.cim}>Szakrendeléseink</Text>

      <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View style={{width:300}}>
                <View>
                <Image style={styles.rendeles_logo} source={require('../kepek/rendeles_ikon.png')} />
                </View>
                

              <View style={styles.feliratHatter}>
              <TouchableOpacity  onPress={() => reszletekFv(item.szak_id,item.szak_nev)}>
              <Text style={styles.rendeles_felirat}>{item.szak_nev}</Text>
              </TouchableOpacity>
                
              </View>
              </View>
            )}
          keyExtractor={item => item.szak_nev}
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
  rendeles_felirat:{
    alignSelf:'center',
    fontSize:22,
    color:'#fff',
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    flexWrap: 'wrap',
    
  },
  feliratHatter:{
    backgroundColor:'#4da8dd',
    height:50,
    borderRadius:50,
    alignContent:'center',
    justifyContent:'center',
    width:'100%',
    
  },
  cim:{
    fontSize:24,
    color:'#1b4965',
    backgroundColor:'#d4eaea',
    
    
  }
})