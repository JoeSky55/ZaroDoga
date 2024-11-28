import React from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.logo_box}>
          <Image source={require('../kepek/logo.jpg')} style={styles.logo} />
        </View>
        <SafeAreaView>
          <Button style={styles.gombok} title="Időpontfoglalás" onPress={() => navigation.navigate("Foglalas")} /> 
          <Button style={styles.gombok}title="Go to details" onPress={() => navigation.navigate("Details")}/> 
        </SafeAreaView>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: '#fff',
    padding:10,
    paddingTop:5,
    marginTop: 50,
    flex:1
  },
  logo:{
    width: 90,
    height: 90,
    backgroundColor: 'red'
  },
  logo_box:{
    width:'100%',
    height: 'auto',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'red'
  },
  gombok:{
    backgroundColor: 'blue'
  }
});