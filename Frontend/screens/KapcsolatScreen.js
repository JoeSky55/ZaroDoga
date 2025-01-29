import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

export default function KapcsolatScreen({navigation}) {
  return (
    <View style={styles.container}>

      <View style={styles.cim}>
        <Text>
          Elérhetőségeink:
        </Text>
      </View>


      <View style={styles.box1}>
        <Text>
          Telefon: +36 (50) 501 6461
        </Text>
      </View>


      <View style={styles.box2}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:sunshineinfo@gmail.com') }
      title="support@example.com" >
        <Text>
          Email:  sunshineinfo@gmail.com
        </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.box3}>
        <Text>
          Posta: 4031 Debrecen István út 26.
        </Text>
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
    backgroundColor: '#d4eaea',
    
  },
  cim:{
    alignSelf:'center',
    paddingBottom:50
  },
  box1:{
    flex:1,
    alignContent:'center'
  },
  box2:{
    flex:1
  },
  box3:{
    flex:1
  },
  
});