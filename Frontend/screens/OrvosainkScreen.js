import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useState,useEffect } from 'react';

export default function OrvosainkScreen({navigation}) {
  const [adatok,setAdatok]=useState([])

  const letoltes=async ()=>{
    const x=await fetch(IpCim.Ipcim +"orvosAdatok2")
    const y=await x.json()
    setAdatok(y)
    //alert(JSON.stringify(y))
  }

    useEffect(()=>{
      letoltes()
  },[])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View style={{width:370, alignContent:'center', justifyContent:'center', alignSelf:'center', marginBottom:50}}>
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
          showsVerticalScrollIndicator={false}
        />
    </View>
  );
}