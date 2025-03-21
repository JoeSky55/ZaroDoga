import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import IpCim from './IpCim';
export default function Foglalas3Screen({ navigation, route }) {
  const letoltes = async () => {
    const x = await fetch(IpCim.Ipcim +"orvosok");
    const y = await x.json();
    setAdatok(y);
  }

  const letoltes_2 = async () => {
    const x = await fetch(IpCim.Ipcim +"idopontok");
    const y = await x.json();
    setAdatok_2(y);
  }

  const feltoltes = async () => {
    const betegAdatok = {
      "bevitel1": id,
      "bevitel2": orvosId,
      "bevitel3": datumMentese,
      "bevitel4": idopont,
      "bevitel5": felhasznaloNev,
      "bevitel6": email,
      "bevitel7": telefon
    };

  
      const response = await fetch(IpCim.Ipcim +"betegFelvitel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(betegAdatok),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        alert("Hiba történt a feltöltés során: " + response.status);
      }
     
  };

  useEffect(() => {
    letoltes();
    letoltes_2();
  }, []);

  const [adatok, setAdatok] = useState([]);
  const [adatok_2, setAdatok_2] = useState([]);
  const { id, nev, orvosId, idopont, datumMentese, orvosNeve } = route.params;

  const [felhasznaloNev, onChangeFelhasznaloNev] = useState('');

  const [email, onChangeEmail] = useState('');
  const [telefon, onChangeTelefon] = useState('');

  const TovabbGomb = () => {
    if (felhasznaloNev == '' || email == '' || telefon == '') {
      alert("Kérlek töltsd ki az összes mezőt!");
      return;
    } 
    else {
      feltoltes();
      navigation.replace("SikeresFoglalas", { id: id, nev: nev, orvosId: orvosId, idopont: idopont, datumMentese: datumMentese, orvosNeve: orvosNeve });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <View style={styles.foglalasiAdatok}>
        <Text style={styles.foglalasiSzoveg}>Szakrendelés: {nev}</Text>
        <Text style={styles.foglalasiSzoveg}>Orvos: {orvosNeve}</Text>
        <Text style={styles.foglalasiSzoveg}>Dátum: {datumMentese.replaceAll('-', '.')}  {idopont}</Text>
        <Text style={styles.adatbevitelCim}>Adja meg az adatait:</Text>
      </View>

      <View style={styles.adatbevitel}>
        

        <KeyboardAwareScrollView
          
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container2}
          scrollEnabled={false}
        >
          <View style={styles.nev_input_view}>
            <TextInput
              style={styles.nev_input}
              value={felhasznaloNev}
              onChangeText={(text) => {
              const filteredText = text.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ]/g, '');
              onChangeFelhasznaloNev(filteredText);
              }}
              autoCapitalize='words'
              placeholder='Teljes név'
            />
          </View>
          </KeyboardAwareScrollView>
          <KeyboardAwareScrollView
          
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container2}
          scrollEnabled={false}
        >
          <View style={styles.email_input_view}>
            <TextInput
              style={styles.email_input}
              value={email}
              onChangeText={(text) => {
                
                const filteredText = text.replace(/[^a-zA-Z0-9@._-]/g, ''); 
                onChangeEmail(filteredText);
              }}
              keyboardType='email-address'
              autoCapitalize='none'
              placeholder='E-mail'
            />
          </View>
          </KeyboardAwareScrollView>
          <KeyboardAwareScrollView
          
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container2}
          scrollEnabled={false}
        >
          <View style={styles.telefon_input_view}>
            <TextInput
              style={styles.telefon_input}
              value={telefon}
              onChangeText={onChangeTelefon}
              placeholder='Telefonszám'
              keyboardType='numeric'
            />
          </View>
          </KeyboardAwareScrollView>
      </View>

      <View style={styles.container3}>
        <TouchableOpacity style={styles.gombok} onPress={() => navigation.goBack()}>
          <Text style={styles.gombszoveg}>Vissza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gombokFoglalas} onPress={() => TovabbGomb()}>
          <Text style={styles.gombszoveg}>Foglalás</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff'
  },
  container2:{
    flex: 1,
    flexDirection:'column',
    backgroundColor:'#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:0,
    //backgroundColor: 'white'
  },
  inner: {
    padding: 24,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foglalasiAdatok: {
    flex: 1,
    backgroundColor:'#4da8dd',
    borderRadius:20
  },
  foglalasiSzoveg: {
    color: '#113F67',
    fontSize: 20,
    fontFamily: 'inter',
    fontWeight: '400',
    padding: 10,
  },
  adatbevitel: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'left',
    flexDirection: 'column',
    
    width: '100%',
  },
  adatbevitelCim: {
    color: '#113F67',
    fontSize: 20,
    fontFamily: 'inter',
    fontWeight: '400',
    flex: 1,
    marginLeft: 6,
    alignSelf:'center',
    
  },
  nev_input_view: {
    flex: 0.2,
   
    backgroundColor: '#f0f8ff'
  },
  nev_input: {
    borderWidth: 2,
    height: 40,
    width:200,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: '#113F67',
    backgroundColor: '#f0f8ff',
  },
  email_input_view: {
    flex: 0.2,
    backgroundColor: '#f0f8ff'
  },
  email_input: {
    borderWidth: 2,
    height: 40,
    width: 200,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: '#113F67'
  },
  telefon_input_view: {
    flex: 0.1,
    backgroundColor: '#f0f8ff',
    
    alignContent: 'center',
    justifyContent: 'center'
  },
  telefon_input: {
    borderWidth: 2,
    height: 40,
    width: 200,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: '#113F67'
  },
  container3: {
    flex: 1,
    flexDirection: 'row',
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff'
  },
  gombszoveg: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'inter'
  },
  gombokFoglalas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#12AB70',
    borderRadius: 20,
    margin: 10,
    padding: 20,
    width: 150,
  },
  gombok: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#8bcefd',
    borderRadius: 20,
    margin: 10,
    padding: 20,
    width: 150,
  }
});
