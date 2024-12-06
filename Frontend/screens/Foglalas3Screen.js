import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

export default function Foglalas3Screen({navigation, route}) {


    const letoltes=async ()=>{
        const x=await fetch("http://192.168.10.62:3000/orvosok")
        const y=await x.json()
        setAdatok(y)
        //alert(JSON.stringify(y))
      }
  
      const letoltes_2=async ()=>{
        const x=await fetch("http://192.168.10.62:3000/idopontok")
        const y=await x.json()
        setAdatok_2(y)
        //alert(JSON.stringify(y))
      }
  
        useEffect(()=>{
          letoltes()
          letoltes_2()
      },[])
  
      
  
  
  
  
      
      const [adatok,setAdatok]=useState([])
      const [adatok_2,setAdatok_2]=useState([])
    const {id,orvosId,idopont,datumMentese}=route.params

      const [nev, onChangeNev] = useState('')
      const [email, onChangeEmail] = useState('')
      const [telefon, onChangeTelefon] = useState()


  return (
    <View style={styles.container}>

    



        <View style={styles.adatbevitel}>
        <Text>Személyes adatok</Text>
                {/*<Text>Időpont:  {idopont}</Text>
                <Text>Szakrendelés id: {id}</Text>
                <Text>Orvos Id: {orvosId}</Text>
                <Text>Dátum:  {datumMentese}</Text>
                */}
            <View style={styles.nev_input_view}>
                <TextInput
                style={styles.nev_input}
                value={nev}
                onChangeText={onChangeNev}
                placeholder='Teljes név'
                />
            </View>

            <View  style={styles.email_input_view}>
                <TextInput
                style={styles.email_input}
                value={email}
                onChangeText={onChangeEmail}
                placeholder='E-mail'
                />
            </View>

            <View style={styles.telefon_input_view}>
                <TextInput
                style={styles.telefon_input}
                value={telefon}
                onChangeText={onChangeTelefon}
                placeholder='Telefonszám'
                />
            </View>
        </View>
        <View style={styles.container2}>
            
            <TouchableOpacity style={styles.gombok} onPress={() => navigation.goBack()}>
            <Text style={styles.gombszoveg}>Vissza</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gombok} onPress={()=>TovabbGomb()}>
            <Text style={styles.gombszoveg}>Tovább</Text>
            </TouchableOpacity>

        </View>
    </View>
  );
}
const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
    
},
adatbevitel:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor:'lightgreen'
    
},
nev_input_view:{
    flex:0.2,
    backgroundColor:'green'
},
nev_input:{
    borderWidth:2,
    height:40,
    width:'70%',
    alignSelf:"center",
    borderRadius:5,
    borderColor:'#113F67'
},
//-----------------------
email_input_view:{
    flex:0.2,
    backgroundColor:'blue'
},
email_input:{
    borderWidth:2,
    height:40,
    width:'70%',
    alignSelf:"center",
    borderRadius:5,
    borderColor:'#113F67'
},
//-------------------------
telefon_input_view:{
    flex:0.2,
    backgroundColor:'red'
},
telefon_input:{
    borderWidth:2,
    height:40,
    width:'70%',
    alignSelf:"center",
    borderRadius:5,
    borderColor:'#113F67'
},
//------------------------
container2:{
    flex:1,
    flexDirection:'row',
    width: 350,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'lightblue'

  },
  gombszoveg:{
    color:'#113F67',
    fontSize:20,
    fontFamily:'inter'
  },
  gombok:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'white',
    borderRadius:50,
    margin: 10,
    padding:20,
    width:150,
  }
})