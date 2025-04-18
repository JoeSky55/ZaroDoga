import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Modal, ScrollView, TouchableOpacity } from 'react-native';
import IpCim from './IpCim';
import { BlurView } from '@react-native-community/blur';
export default function OrvosainkScreen({ navigation }) {
  const [adatok, setAdatok] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [modalVisible, setModalVisible] = useState(false);
  const [orvos, setOrvos] = useState(null);
  const letoltes = async () => {
    try {
      const response = await fetch(IpCim.Ipcim + "orvosAdatok2");
      const data = await response.json();
      setAdatok(data);
    } catch (error) {
      console.error("Hiba történt az adatok letöltésekor:", error);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    letoltes();
  }, []);
  const toggleModal = (orvos) => {
    setOrvos(orvos); 
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4da8dd" style={styles.loader} />
      ) : (
        <FlatList
          data={adatok}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Image
                  style={styles.rendeles_logo}
                  source={{uri:IpCim.Ipcim+item.kep}} 
                />
              </View>
              <View style={styles.nevHatter}>
                  <Text style={styles.rendeles_felirat}>{item.nev}</Text>
              </View>
              <View style={styles.bemutatkozasHatter}>
                <TouchableOpacity onPress={() => toggleModal(item)}>
                <Image
                  style={styles.nyil}
                  source={require('../kepek/down_2626994.png') || require('../kepek/rendeles_ikon.png')} 
                />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.orvos_id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
      {orvos && (
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
              <ScrollView contentContainerStyle={styles.centeredContainer}>
              <Image
                style={styles.rendeles_logo}
                source={{uri:IpCim.Ipcim+orvos.kep}|| require('../kepek/rendeles_ikon.png')}
              />
              <Text style={styles.modalTitle}>{orvos.nev}</Text>
              <Text style={styles.modalTitleSzakterulet}>{orvos.szakteruletek}</Text>
              <Text style={styles.orvosLeiras_felirat}>{orvos.leiras}</Text>
              </ScrollView>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal(null)}>
                <Text style={styles.buttonText}>Bezár</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingTop: 20,
  },
  centeredContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center',      
  },
  absolute: {
    backgroundColor:'rgba(0,255,255,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loader: {
    marginTop: 500,
  },
  card: {
    width: 300,
    height: 400,
    alignSelf: 'center',
    marginBottom: 50,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  rendeles_logo: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  nyil: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    opacity: 0.4,
    alignSelf: 'center',
  },
  rendeles_felirat: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    fontWeight: '400',
    padding: 10,
  },
  bemutatkozasHatter: {
    marginTop: 10,
    backgroundColor: '#61c5dc',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
  nevHatter: {
    marginTop: 10,
    backgroundColor: '#4da8dd',
    opacity: 0.8,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#113F67',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
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
  orvosLeiras_felirat: {
    fontSize: 15,
    color:'black',
  },
});
