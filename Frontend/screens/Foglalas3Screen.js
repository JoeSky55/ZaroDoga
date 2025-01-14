import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';

export default function Foglalas3Screen({ navigation, route }) {
  const letoltes = async () => {
    const x = await fetch("http://192.168.10.62:3000/orvosok");
    const y = await x.json();
    setAdatok(y);
  }

  const letoltes_2 = async () => {
    const x = await fetch("http://192.168.10.62:3000/idopontok");
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

    try {
      const response = await fetch("http://192.168.10.62:3000/betegFelvitel", {
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
    } catch (error) {
      alert("Hálózati hiba: " + error.message);
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
              onChangeText={onChangeFelhasznaloNev}
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
              onChangeText={onChangeEmail}
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
    backgroundColor: '#d4eaea'
  },
  container2:{
    flex: 1,
    flexDirection:'column',
    backgroundColor:'#d4eaea',
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
   
    backgroundColor: '#d4eaea'
  },
  nev_input: {
    borderWidth: 2,
    height: 40,
    width:200,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: '#113F67',
    backgroundColor: '#d4eaea',
  },
  email_input_view: {
    flex: 0.2,
    backgroundColor: '#d4eaea'
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
    backgroundColor: '#d4eaea',
    
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
    backgroundColor: '#d4eaea'
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
    borderRadius: 50,
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
    borderRadius: 50,
    margin: 10,
    padding: 20,
    width: 150,
  }
});
