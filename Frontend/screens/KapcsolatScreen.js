import React from 'react';
import { View, Text, Button } from 'react-native';

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
  return (
<<<<<<< Updated upstream
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Kapcsolat Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
=======
    <View style={styles.container}>

      <View style={styles.cim}>
        <Text style={styles.cim2}>
          Elérhetőségeink:
        </Text>
      </View>

      

      <View style={styles.box1}>
      <View style={{flex:1.5, marginRight:0, paddingRight:0, marginLeft:60,}}>
          <Text style={styles.szoveg}>
            Telefon: 
          </Text>
        </View>
        <View style={{flex:5, marginLeft:0, marginRight:50,backgroundColor:'Red'}}>
        <TouchableOpacity onPress={()=> makeCall("36 30 602 8611")}>
              <Text style={{fontSize:20, color:'#1b4965', fontFamily:'Inter',textDecorationLine: 'underline', fontSize:20, }}>+36 30 602 8611</Text>
            </TouchableOpacity>
        </View>
      </View>


      <View style={styles.box2}>
        <View style={{flex:1.1, marginRight:0, paddingRight:0, marginLeft:60,}}>
          <Text style={styles.szoveg}>
            Email: 
          </Text>
        </View>
        <View style={{flex:5, marginLeft:0, marginRight:50,backgroundColor:'Red'}}>
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
    flex:0.5,
    alignSelf:'center',
    flexDirection:'row',
    width:450,
    //backgroundColor:'#4da8dd'
  },
  box2:{
    flex:0.5,
    alignSelf:'center',
    flexDirection:'row',
    width:450,
    //backgroundColor:'#4da8dd'
  },
  box3:{
    flex:1,
    alignSelf:'center',
    //backgroundColor:'#4da8dd',
    marginBottom:400
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
>>>>>>> Stashed changes
