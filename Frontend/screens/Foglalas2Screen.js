import React from 'react';
//import DateTimePicker from 'react-native-ui-datepicker';
import DatePicker from 'react-native-neat-date-picker'
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Touchable, TouchableOpacity } from 'react-native';

export default function Foglalas2Screen({ navigation, route }) {

    const letoltes=async ()=>{
      const x=await fetch("http://192.168.10.62:3000/orvosok")
      const y=await x.json()
      setAdatok(y)
      //alert(JSON.stringify(y))
    }

      useEffect(()=>{
        letoltes()
    },[])

    const {id,nev}=route.params
    const [adatok,setAdatok]=useState([])

    function orvosKiiras(adatok){
      if (adatok.szakterulet_id == id ){
        return <Text>{adatok.nev}</Text>
      }
      else return null
    }



   






  return (
    <View style={styles.container}>



      <View style={styles.cim}>
        {/*<Text>{id}</Text>*/}
        <Text style={{fontSize:25}}>{nev}</Text>
      </View>


      <View style={styles.orvosok}>
        <Text>Orvosok:</Text>
        <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View>
               
                  <TouchableOpacity >
                    {orvosKiiras(item)}
                  </TouchableOpacity>
                  
              </View>
            )}
          keyExtractor={item => item.altalanos_id}
          scrollEnabled={false}
        />   
      </View>

     





      <View style={styles.datum}>
        <Text>Dátum kiválasztása</Text>
            
      </View>

      <View style={styles.container2}>

        <View style={styles.visszagomb}>
          <Button  title="Vissza" onPress={() => navigation.goBack()} />
        </View>
        

        <View style={styles.tovabbgomb}>
          <Button title="Tovább" />
        </View>

      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  cim:{
    flex:1,
    backgroundColor:'blue'
  },
  
  orvosok:{
    flex:1,
    backgroundColor:'green'
  },
  datum:{
    flex:4,
    backgroundColor:'orange',
    width:200
  },
  datumvalaszto:{
    
    
  },
  visszagomb:{
    flex:1,
    backgroundColor:'red'
  },
  tovabbgomb:{
    flex:1,
    backgroundColor:'red'
  },
  container2:{
    flex:1,
    flexDirection:'row'
  }
});