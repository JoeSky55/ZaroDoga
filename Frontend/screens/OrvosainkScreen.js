import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import IpCim from './IpCim';
import { TouchableOpacity } from 'react-native';


const helyiKepek = {
  "01.jpg": require('../kepek/01.jpg'),
  "02.jpeg": require('../kepek/02.jpeg'),
  "03.jpeg": require('../kepek/03.jpeg'),
  "04.jpg": require('../kepek/04.jpg'),
  "05.jpg": require('../kepek/05.jpg'),
};

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
                  source={helyiKepek[item.kep] || require('../kepek/rendeles_ikon.png')}
                />
              </View>

              <View style={styles.feliratHatter}>
                <TouchableOpacity onPress={() => toggleModal(item)}>
                  <Text style={styles.rendeles_felirat}>{item.nev}</Text>
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
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{orvos.nev}</Text>
              <Image
                style={styles.rendeles_logo}
                source={helyiKepek[orvos.kep] || require('../kepek/rendeles_ikon.png')}
              />
              <Text style={styles.orvosLeiras_felirat}>Lorem ipsum Lorem ipsum Lorem ipsum v Lorem ipsumLorem ipsum v v Lorem ipsum Lorem ipsum  vvv Lorem ipsum Lorem ipsum v Lorem ipsumv Lorem ipsumv Lorem ipsumv</Text>
              
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
  loader: {
    marginTop: 500,
  },
  card: {
    width: 300,
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
  },
  rendeles_felirat: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    fontWeight: '400',
    padding: 10,
  },
  feliratHatter: {
    backgroundColor: '#4da8dd',
    height: 50,
    borderRadius: 50,
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
    width: 250,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    
    width:100
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf:'center',
  },
  modalOverlay: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#4da8dd',
    borderWidth: 5,
    borderRadius: 10,
    width:300
  },
  orvosLeiras_felirat: {
    fontSize: 18,
    color:'black',
  },
});
