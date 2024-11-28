import React from 'react';
//import DateTimePicker from 'react-native-ui-datepicker';
import DatePicker from 'react-native-neat-date-picker'
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

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

    function orvosKiiras(adatok){
      if (adatok.szakterulet_id == id ){
        return <Text>{adatok.nev}</Text>
      }
      else return null
    }



    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)


  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const openDatePickerSingle = () => setShowDatePickerSingle(true)
 

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false)
  }

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false)

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    console.log(output)
    setDate(output.dateString)
  }

  

  






  return (
    <View style={styles.container}>



      <View style={styles.cim}>
        {/*<Text>{id}</Text>*/}
        <Text style={{fontSize:25}}>{nev}</Text>
      </View>


      <View style={styles.orvosok}>
        <Text>Orvosok:</Text>
        <FlatList
          data={adatok}
          renderItem={({item}) => (
              <View>
               
                  {orvosKiiras(item)}
                
              </View>
            )}
          keyExtractor={item => item.orvos_id}
          scrollEnabled={false}
        />   
      </View>

      <View style={styles.datum}>
        <Text>Dátum kiválasztása</Text>
            <View style={styles.datumvalaszto}>
                  {/* Single Date */}
              <Button title={'Dátum kiválasztása'} onPress={openDatePickerSingle} />
              <DatePicker
                isVisible={showDatePickerSingle}
                mode={'single'}
                onCancel={onCancelSingle}

                onConfirm={onConfirmSingle}
                modalStyles={{
                  height:400,
                  width:200,
                  margin:0,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor:'transparent'
                }}
              />
              <Text style={{fontSize:20}}>{date}</Text>
              </View>
      </View>


      <View style={styles.visszagomb}>
        <Button  title="Go back" onPress={() => navigation.goBack()} />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  cim:{
    flex:1,
    backgroundColor:'blue'
  },
  visszagomb:{
    flex:1,
    backgroundColor:'red'
  },
  orvosok:{
    flex:1,
    backgroundColor:'green'
  },
  datum:{
    flex:4,
    backgroundColor:'orange',
    width:200
  },
  datumvalaszto:{
    
    
  }
});