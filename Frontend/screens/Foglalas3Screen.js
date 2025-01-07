import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';



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

      const feltoltes = async () => {
        // Az adatok, amelyeket az adatbázisba küldesz
        const betegAdatok = {
          "bevitel1": id,    
          "bevitel2": orvosId,            
          "bevitel3": datumMentese,          
          "bevitel4": idopont,             
          "bevitel5": felhasznaloNev,         
          "bevitel6": email,   
          "bevitel7": telefon      
        };
      
        try {
          const response = await fetch("http://192.168.10.62:3000/betegFelvitel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // JSON adatok küldése
            },
            body: JSON.stringify(betegAdatok),    // Adatok JSON formátumba konvertálása
          });
      
          if (response.ok) {
            const data = await response.json();
            alert("Sikeres feltöltés: " + JSON.stringify(data));
          } else {
            alert("Hiba történt a feltöltés során: " + response.status);
          }
        } catch (error) {
          alert("Hálózati hiba: " + error.message);
        }
      };
  
        useEffect(()=>{
          letoltes()
          letoltes_2()
      },[])
  
      
  
  
  
  
      
      const [adatok,setAdatok]=useState([])
      const [adatok_2,setAdatok_2]=useState([])
    const {id,nev,orvosId,idopont,datumMentese,orvosNeve}=route.params

      const [felhasznaloNev, onChangeFelhasznaloNev] = useState('')
      const [email, onChangeEmail] = useState('')
      
      const [telefon, onChangeTelefon] = useState('')
      
      //const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '.');
      
      const TovabbGomb=()=>{
        if(felhasznaloNev == null || email == null || telefon==null){
            alert("Kérlek töltsd ki az összes mezőt!")
            return
        }
        else{
            feltoltes()
            navigation.navigate("SikeresFoglalas",{id:id,nev:nev,orvosId:orvosId,idopont:idopont,datumMentese:datumMentese, orvosNeve:orvosNeve})
            alert("Navigáció megtörtént")
        }
        
        
      }


  return (
    <View style={styles.container}>

        <View sytle={styles.foglalasiAdatok}>
            <Text style={styles.foglalasiSzoveg}>Szakrendelés: {nev}</Text>
            <Text style={styles.foglalasiSzoveg}>Orvos: {orvosNeve}</Text>
            <Text style={styles.foglalasiSzoveg}>Dátum: {datumMentese.replaceAll('-','.')}  {idopont}</Text>
            
        </View>
    



        <View style={styles.adatbevitel}>
        <Text style={styles.adatbevitelCim}>Adja meg az adatait:</Text>
                {/*
                <Text>Időpont:  {idopont}</Text>
                <Text>Szakrendelés id: {id}</Text>
                <Text>Orvos Id: {orvosId}</Text>
                <Text>Dátum:  {datumMentese}</Text>
                <Text>Orvos neve:  {orvosNeve}</Text>
                */}

                



            <View style={styles.nev_input_view}>
                <TextInput
                style={styles.nev_input}
                value={felhasznaloNev}
                onChangeText={onChangeFelhasznaloNev}
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
            {/*<Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="javascript" />
                <Picker.Item label="Python" value="python" />
                <Picker.Item label="C++" value="cpp" />
            </Picker>
            */}
            
            <TextInput
                style={styles.telefon_input}
                value={telefon}
                onChangeText={onChangeTelefon}
                placeholder='Telefonszám'
            />
                
            </View>
        </View>
        <View>
            <Text>{felhasznaloNev}</Text>
            <Text>{email}</Text>
            <Text>{telefon}</Text>
            
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
    backgroundColor:'white'
    
    
    
},
foglalasiAdatok:{
    flex:3,

},
foglalasiSzoveg:{
    color:'#113F67',
    fontSize:20,
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    //backgroundColor: '#113F67'
},
adatbevitel:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'left',
    flexDirection:'column',
    backgroundColor:'white',
    width:'100%',
    
    
},
adatbevitelCim:{
    color:'#113F67',
    fontSize:20,
    fontFamily:'inter',
    fontWeight:'400',
    flex:0.1,
    marginLeft:60
},
nev_input_view:{
    flex:0.2,
    backgroundColor:'white'
},
nev_input:{
    borderWidth:2,
    height:40,
    width:'70%',
    alignSelf:"center",
    borderRadius:5,
    borderColor:'#113F67',
    backgroundColor:'#white',
    
},

//-----------------------
email_input_view:{
    flex:0.2,
    backgroundColor:'white'
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
    flex:0.1,
    backgroundColor:'white',
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center'

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
    backgroundColor:'white'

  },
  gombszoveg:{
    color:'white',
    fontSize:20,
    fontFamily:'inter'
  },
  gombok:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'#113F67',
    borderRadius:50,
    margin: 10,
    padding:20,
    width:150,
  }
})