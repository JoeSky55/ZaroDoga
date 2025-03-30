import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
//import OrvosainkScreen from './OrvosainkScreen';
//import FoglalasScreen from './FoglalasScreen';
//import GaleriaScreen from './GaleriaScreen';
import { useState } from 'react';
import { BlurView } from '@react-native-community/blur';




export default function RendelonkScreen({navigation}) {

  const helyiKepek = [
    { id: 1, source: require('../kepek/201.jpg') },
    { id: 2, source: require('../kepek/202.jpg') },
    { id: 3, source: require('../kepek/203.jpg') },
    { id: 4, source: require('../kepek/204.jpg') },
    { id: 5, source: require('../kepek/205.jpg') },
    { id: 6, source: require('../kepek/rendelokivul.jpg') },
  ];
  const toggleModal = () => {
   
    setModalVisible(!modalVisible);
  };
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <View stlye={styles.rendelo_doboz} >
        <Image
          style={styles.rendelo_kepek}
          source={helyiKepek[5].source|| require('../kepek/rendeles_ikon.png')} 
        />
        <TouchableOpacity onPress={() => toggleModal()}>
          <Text style={styles.galeriaGomb}>
            Galéria
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
              
              
            {/*<ScrollView contentContainerStyle={styles.centeredContainer}>*/}
            <FlatList
          data={helyiKepek}
          renderItem={({ item }) => (
            <View style={styles.cards}>
              <View>
                <Image
                  style={styles.rendelo_kepek}
                  source={item.source || require('../kepek/rendeles_ikon.png')}

                  
                />
              </View>

              <View style={styles.nevHatter}>
                
                  <Text style={styles.rendeles_felirat}>{item.nev}</Text>
                
              </View>
              
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          
        />
              
              
              
              
              
              
              
              
              
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal(null)}>
                <Text style={styles.buttonText}>Bezár</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.gombok}>
        <View style={styles.gombok1}>
          <TouchableOpacity onPress={() => navigation.navigate("Orvosaink")}>
            <Text style={styles.gombSzoveg}>Orvosaink</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.gombok1}>
          <TouchableOpacity onPress={() => navigation.navigate("Időpontfoglalás")}>
          <Text style={styles.gombSzoveg}>Időpontfoglalás</Text>
          </TouchableOpacity>
          </View>
      </View>
      <View style={{flex:14, paddingTop:10,}}>
        <Text style={{backgroundColor:'#f0f8ff', borderRadius:30, padding:15, fontFamily:'Inter', height:280, textAlign:''}}>
        A Sunshine Dentál modern és barátságos fogászati rendelő, ahol elkötelezettek vagyunk a pácienseink
ragyogó és egészséges mosolyáért. Magasan képzett, tapasztalt csapatunk korszerű technológiával és
személyre szabott figyelemmel biztosítja a legjobb ellátást, legyen szó megelőző kezelésekről, esztétikai
fogászatról vagy fogpótlásokról. Célunk, hogy minden látogatás stresszmentes és kényelmes legyen, így
pácienseink magabiztosan és mosolyogva távozhassanak. 
        </Text>
      </View>

      <View style={styles.copySzoveg}>
      <Text style={styles.copyright}>Copyright © 2024 Sunshine Dental</Text>
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
  card: {
    height:900,
    width: 350,
    alignSelf: 'center',
    marginBottom: 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginHorizontal:30,
    
    alignContent: 'center',
    //flexdirection:'row',
    flex:8,
    
  },
  cards: {
    width: 350,
    alignSelf: 'center',
    //marginBottom: 50,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    //shadowColor: '#113F67',
    //shadowOffset: { width: 0, height: 5 },
    //shadowOpacity: 0.4,
    //shadowRadius: 7,
    //marginHorizontal:30,
    marginVertical:0,
    alignContent: 'center',
    //flexdirection:'row',
    flex:8,
    
  },
  rendelo_kep:{
    width:'100%',
    height:250,
    borderRadius:30,
    
    
  },
  galeriaGomb:{
    fontSize:20,
    color:'white',
    backgroundColor:'#4da8dd',
    textAlign:'center',
    padding:10,
    width:'100%',
    borderRadius:10,
    marginTop:10
  },
  rendelo_kepek:{
    width:'90%',
    height:250,
    borderRadius:30,
    alignSelf:'center'
    
  },
  rendelo_doboz:{
    flex:1,
    width:400,
    
  
    
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
    paddingRight: 10,
    paddingLeft: 10,
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
    
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderColor: '#4da8dd',
    //borderWidth: 5,
    borderRadius: 10,
    width: 400,
    
    
    
    
  },
  orvosLeiras_felirat: {
    fontSize: 15,
    color:'black',
    
  },
  copyright:{
    fontSize:10,
    color:'gray'
  },
  gombok:{
    flexDirection:'row',
    
    
    alignContent:'center',
    justifyContent:'center',
  },
  gombok1:{
    backgroundColor:'#4da8dd',
    padding:5,
    margin:10,
    borderRadius:10,
    
  },
  gombSzoveg:{
    fontSize:20,
    color:'white'
  },
  
  copySzoveg:{
    flex:0.7,
    alignItems:'center',
    marginBottom:10,
    //backgroundColor:'blue'
  }
  
});