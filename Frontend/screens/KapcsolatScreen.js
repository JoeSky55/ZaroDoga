import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

export default function KapcsolatScreen({navigation}) {
  return (
    <View style={styles.container}>

      <View style={styles.cim}>
        <Text style={styles.cim2}>
          Elérhetőségeink:
        </Text>
      </View>


      <View style={styles.box1}>
        <Text style={styles.szoveg}>
          Telefon: +36 (50) 501 6461
        </Text>
      </View>


      <View style={styles.box2}>
        <View style={{flex:1, marginRight:0, paddingRight:0, marginLeft:60, backgroundColor:'blue'}}>
          <Text style={styles.szoveg}>
            Email: 
          </Text>
        </View>
        <View style={{flex:1, marginLeft:0, marginRight:50, backgroundColor:'red', width:200}}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:sunshinedentalfogaszat@gmail.com') }
      title="support@example.com" >

        <Text style={styles.szoveg}>
           sunshineinfo@gmail.com
        </Text>
        </TouchableOpacity>
        </View>
        
      </View>


      <View style={styles.box3}>
        <Text style={styles.szoveg}>
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
    alignSelf:'center',
  },
  box2:{
    flex:1,
    alignSelf:'center',
    flexDirection:'row'
  },
  box3:{
    flex:1,
    alignSelf:'center',
  },
  szoveg:{
    fontSize:20,
    fontFamily:'Inter',
    color:'#1b4965'
  },
  cim2:{
    fontSize:25,
    color:'#1b4965'
  }
  
});