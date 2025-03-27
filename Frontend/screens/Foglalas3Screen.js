import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IpCim from './IpCim';
import { Checkbox } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
export default function Foglalas3Screen({ navigation, route }) {
  const letoltes = async () => {
    const x = await fetch(IpCim.Ipcim +"OrvosokSzakteruletei");
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
    if (!isChecked) {
      alert("Kérlek fogadd el a foglalási szabályzatot!");
      return;
    }
    if (felhasznaloNev == '' || email == '' || telefon == '' ) {
      alert("Kérlek töltsd ki az összes mezőt!");
      return;
    } 
    else {
      feltoltes();
      navigation.replace("SikeresFoglalas", { id: id, nev: nev, orvosId: orvosId, idopont: idopont, datumMentese: datumMentese, orvosNeve: orvosNeve });
    }
  }

  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    
    setModalVisible(!modalVisible);
  };
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

          <TouchableOpacity
  style={styles.checkboxContainer}
  onPress={() => setIsChecked(!isChecked)}
  activeOpacity={0.8}
>
  <Checkbox
    status={isChecked ? 'checked' : 'unchecked'}
    onPress={() => setIsChecked(!isChecked)}
    color="black"
    backgroundColor="white"
    borderColor="black"
    borderWidth={2}
    borderRadius={20}
    padding={10}
    alignSelf='center'
  />
  <Text style={styles.szoveg4}>
  A
  </Text>
    <View style={styles.box5}>
      <TouchableOpacity onPress={() => toggleModal()}>
        <Text style={styles.szoveg3}>
        foglalási szabályzatot
        </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => toggleModal(null)}
          //scrollEnabled={true}
        >
          <View style={styles.modalOverlay}>

          <BlurView
            style={styles.absolute}
            blurType="extralight"   // You can choose "light", "dark", or "extraLight"
            blurAmount={70}    // Adjust the blur intensity
            //reducedTransparencyFallbackColor="white"  // Fallback color for Android
          />
            <View style={styles.modalContent}>            
              <Text style={styles.modalTitle}>Foglalási szabályzat</Text>
              <Text style={styles.orvosLeiras_felirat}>Időpont foglalási szabályzatunk bevezetésére azért van szükség, mivel TÖBB HETES ELŐJEGYZÉSSEL dolgozunk. Akivel időpontot egyeztetünk, attól elvárjuk, hogy az adott kezelésen megjelenjen, vagy amennyiben erre nincs lehetősége, azt időben jelezze.
Az időpont lemondására/módosítására díjmentesen a foglalást megelőző 24 órán túl van lehetőség. Ezt megtehetik telefonon, sms-ben vagy e-mailben.
Amennyiben az időpont lemondása a foglalást megelőző 24 órán belül történik, a következő kezelés árán felül plusz 5.000 Ft-os díjat számolunk fel!</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal(null)}>
                <Text style={styles.buttonText}>Bezár</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    <Text style={styles.szoveg4}>
    elolvastam és megértettem
    </Text>
</TouchableOpacity>
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
  szabalyzatCheck:{
    color: '#113F67',
    fontSize: 15,
    fontFamily: 'inter',
    fontWeight: '400',
    flex: 1,
    marginLeft: 6,
    alignSelf:'center'
  },
  checkboxContainer:{
    flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
  paddingHorizontal: 10,
  backgroundColor: '#f0f8ff',
  borderRadius: 8,
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
  },
  modalTitle: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 300,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  modalTitleSzakterulet: {
    alignSelf: 'center',
    backgroundColor: 'white',
    //width: '80%',
    flexWrap: 'wrap',
    height: 50,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    //borderColor: '#4da8dd',
    //borderWidth: 5,
    width:350,
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    maxHeight:'80%',
    
    
  },
  closeButton: {
    backgroundColor: '#4da8dd',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.8,
    width:100
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf:'center',
  },
  modalOverlay: {
    flex:1,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderColor: '#4da8dd',
    //borderWidth: 5,
    borderRadius: 10,
    width: 400,
    
    
    
    
  },
  absolute: {
    backgroundColor:'rgba(0,255,255,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    
  },
  szoveg3:{
    fontFamily:'Inter',
    textDecorationLine:'underline',
  },
  szoveg4:{
    fontFamily:'Inter',
    
  }

});
