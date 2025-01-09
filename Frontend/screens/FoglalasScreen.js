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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
      <Text style={styles.cim}>Szakrendeléseink</Text>

      <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View>

                <TouchableOpacity  onPress={() => reszletekFv(item.szak_id,item.szak_nev)}>
                  <Image style={styles.rendeles_logo} source={require('../kepek/rendeles_ikon.png')} />
                </TouchableOpacity>

                <Text style={styles.rendeles_felirat}>{item.szak_nev}</Text>
              </View>
            )}
          keyExtractor={item => item.szak_nev}
        />


      <Button title="Vissza" onPress={() => navigation.goBack()}/> 

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
    fontSize:22
  },
  cim:{
    fontSize:24,
    backgroundColor:'#fff',
    
  }
})