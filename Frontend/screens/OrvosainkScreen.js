import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import IpCim from './IpCim';

// Local image mapping
const helyiKepek = {
  "01.jpg": require('../kepek/01.jpg'),
  "02.jpeg": require('../kepek/02.jpeg'),
  "03.jpeg": require('../kepek/03.jpeg'),
  "04.jpg": require('../kepek/04.jpg'),
  "05.jpg": require('../kepek/05.jpg'),
};

export default function OrvosainkScreen({ navigation }) {
  const [adatok, setAdatok] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const letoltes = async () => {
    try {
      const response = await fetch(IpCim.Ipcim + "orvosAdatok2");
      const data = await response.json();
      setAdatok(data);
    } catch (error) {
      console.error("Hiba történt az adatok letöltésekor:", error);
    } finally {
      setLoading(false); // Hide loader once data is fetched
    }
  };

  useEffect(() => {
    letoltes();
  }, []);

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
                  source={helyiKepek[item.kep] || require('../kepek/rendeles_ikon.png')} // Default image fallback
                />
              </View>

              <View style={styles.feliratHatter}>
                <Text style={styles.rendeles_felirat}>{item.nev}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.orvos_id.toString()}
          showsVerticalScrollIndicator={false}
        />
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
    marginHorizontal:30,
    marginVertical:20,
    
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
});
