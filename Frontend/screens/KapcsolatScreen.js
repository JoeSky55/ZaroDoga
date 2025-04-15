import React from 'react';
import { View, Text, StyleSheet, Modal, Linking, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import IpCim from './IpCim';
import { BlurView } from '@react-native-community/blur';
export default function KapcsolatScreen({navigation}) {
  const makeCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Hiba", "Nem lehet megnyitni a telefonhívás funkciót ezen az eszközön.");
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error("Hiba történt a hívásindítás közben:", err));
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <View style={styles.cim}>
        <Text style={styles.cim2}>
          Elérhetőségeink:
        </Text>
      </View>
      <View style={styles.box1}>
      <View style={{ justifyContent:'center',alignContent:'center'}}>
          <Text style={styles.szoveg}>
            Telefon: 
          </Text>
        </View>
        <View style={{}}>
        <TouchableOpacity onPress={()=> makeCall("36 30 602 8611")}>
              <Text style={{fontSize:20, color:'#1b4965', fontFamily:'Inter',textDecorationLine: 'underline', fontSize:20, textAlign:'center' }}>+36 30 602 8611</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box2}>
        <View >
          <Text style={styles.szoveg}>
            Email: 
          </Text>
        </View>
        <View style={{}}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:sunshinedentalfogaszat@gmail.com') }
      title="support@example.com" >
        <Text style={{fontSize:20, color:'#1b4965', fontFamily:'Inter',textDecorationLine: 'underline', fontSize:20, }}>
           sunshineinfo@gmail.com
        </Text>
        </TouchableOpacity>
        </View> 
      </View>
      <View style={styles.box3}>
        <Text style={styles.szoveg}>
          Posta:
        </Text>
        <Text style={styles.szoveg2}>
          4031 Debrecen 
        </Text>
        <Text style={styles.szoveg2}>
        István út 26.  
        </Text>
      </View>
      <View style={styles.box4}>
        <Text style={styles.szoveg}>
          Web:
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(IpCim.Ipcim + 'kezdolap')}>
        <Text style={{fontSize:20, color:'#1b4965', fontFamily:'Inter',textDecorationLine: 'underline', fontSize:20,marginLeft:25 }}>
          sunshinedental.com
        </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box5}>
      <TouchableOpacity onPress={() => toggleModal()}>
        <Text style={styles.szoveg3}>
          Foglalási szabályzat
        </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => toggleModal(null)}
        >
          <View style={styles.modalOverlay}>
          <BlurView
            style={styles.absolute}
            blurType="extralight"
            blurAmount={70} 
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1,
    width:400,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f0f8ff',
  },
  cim:{
    alignSelf:'center',
    paddingBottom:50
  },
  card: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 50,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginHorizontal:30,
    marginVertical:20,
    alignContent: 'center',
    flex:5
  },
  box1:{
    flex:0.5,
    alignSelf:'center',
    flexDirection:'column',
    width:300,
    justifyContent:'center',
    alignContent:'center',
    padding:30
  },
  box2:{
    flex:0.5,
    alignSelf:'center',
    flexDirection:'column',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    padding:30
  },
  box3:{
    flex:0.5,
    alignSelf:'center',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    padding:30
  },
  box4:{
    flex:0.5,
    alignSelf:'center',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    padding:30
  },
  box5:{
    flex:0.5,
    alignSelf:'center',
    width:300,
    alignContent:'center',
    justifyContent:'center',
    padding:30
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
  szoveg:{
    fontSize:20,
    fontFamily:'Inter',
    color:'#1b4965',
    textAlign:'center',
    fontWeight:'bold'
  },
  szoveg3:{
    fontSize:20,
    fontFamily:'Inter',
    color:'#1b4965',
    textAlign:'center',
    fontWeight:'bold',
    textDecorationLine: 'underline',
  },
  szoveg2:{
    fontSize:20,
    fontFamily:'Inter',
    color:'#1b4965',
    textAlign:'center',
  },
  cim2:{
    fontSize:25,
    color:'#1b4965'
  }
});