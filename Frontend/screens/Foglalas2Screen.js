import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';

export default function Foglalas2Screen({ navigation, route }) {

    const letoltes=async ()=>{
      const x=await fetch("http://192.168.10.62:3000/orvosok")
      const y=await x.json()
      setAdatok(y)
      //alert(JSON.stringify(y))
    }

      useEffect(()=>{
        letoltes()
    },[])

    const {id,nev}=route.params
    const [adatok,setAdatok]=useState([])

    //DatePicker statek

      const [date, setDate] = useState(new Date());
      const [show, setShow] = useState(true);
    
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
       
        setDate(currentDate);
      }



    function orvosKiiras(adatok){
      if (adatok.szakterulet_id == id ){
        return <Text>{adatok.nev}</Text>
      }
      else return null
    }


      
      
   






  return (
    <View style={styles.container}>



      <View style={styles.cim}>
        {/*<Text>{id}</Text>*/}
        <Text style={styles.szakCim}>{nev}</Text>
      </View>

      <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
          }}
        />


      <View style={styles.orvosok}>
      
        <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View>
               
                  <TouchableOpacity>
                    <Text style={styles.orvosnev}>{orvosKiiras(item)}</Text>
                  </TouchableOpacity>
                  
              </View>
            )}
          keyExtractor={item => item.altalanos_id}
          scrollEnabled={false}
        />   
      </View>

        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
          }}
        />





      <View style={styles.datum}>
        
          <Text style={styles.datumvalaszto}>Dátum kiválasztása</Text>
        
        
        {/*    {show && (     */}
        <DateTimePicker
          value={date}
          mode="date" // Choose 'time' or 'datetime' for other modes
          display="default" // 'spinner', 'calendar', or 'default'
          onChange={onChange}
          
        />
        {/*    })}    */}
        
      </View>

      <View style={styles.container2}>

        
          <TouchableOpacity style={styles.gombok} onPress={() => navigation.goBack()}>
            <Text style={styles.gombszoveg}>Vissza</Text>
          </TouchableOpacity>
        
        

        
          <TouchableOpacity style={styles.gombok}>
            <Text style={styles.gombszoveg}>Tovább</Text>
          </TouchableOpacity>
        

      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
    backgroundColor:'#113F67'
    
  },
  cim:{
    flex:0.7,
    //backgroundColor:'blue',
    margin: 2,
    paddingBottom:15
    
    

  },
  szakCim:{
    color:'white',
    fontSize:26,
    fontFamily:'inter',
    fontWeight:'600',

  },
  
  orvosok:{
    flex:3,
    backgroundColor:'#113F67'
  },
  orvosnev:{
    color:'white',
    fontSize:20,
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    backgroundColor:'#113F67'
  },

  datum:{
    flex:10,
    backgroundColor:'orange',
    width:200
    
  },
  datumvalaszto:{
    color:'white',
    fontSize:20,
    fontFamily:'inter',
    fontWeight:'400',
    
  },
  gombszoveg:{
    color:'#113F67',
    fontSize:20,
    fontFamily:'inter'
    
    
    
    
    
   
  },
  gombok:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'white',
    borderRadius:50,
    margin: 10,
    padding:20,
    width:150,
  },
  container2:{
    flex:2,
    flexDirection:'row',
    width: 350,
    justifyContent:'center',
    alignItems:'center'

  }
});