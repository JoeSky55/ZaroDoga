import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';





export default function RendelonkScreen({navigation}) {
    const rendeloKepek = {
        "201.jpg": require('../kepek/201.jpg'),
        "202.jpg": require('../kepek/202.jpg'),
        "203.jpg": require('../kepek/203.jpg'),
        "204.jpg": require('../kepek/204.jpg'),
        "205.jpg": require('../kepek/205.jpg'),
        
      };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      


      
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
    width: 350,
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
    marginVertical:0,
    alignContent: 'center',
    //flexdirection:'row',
    flex:8,
    
  }
  
});