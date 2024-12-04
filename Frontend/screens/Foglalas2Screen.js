import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function Foglalas2Screen({ navigation, route }) {

    const letoltes=async ()=>{
      const x=await fetch("http://192.168.10.62:3000/orvosok")
      const y=await x.json()
      setAdatok(y)
      //alert(JSON.stringify(y))
    }

    const letoltes_2=async ()=>{
      const x=await fetch("http://192.168.10.62:3000/idopontok")
      const y=await x.json()
      setAdatok_2(y)
      //alert(JSON.stringify(y))
    }

      useEffect(()=>{
        letoltes()
        letoltes_2()
    },[])

    




    const {id,nev}=route.params
    const [adatok,setAdatok]=useState([])
    const [adatok_2,setAdatok_2]=useState([])
  
    //----------------------------------------------------
    //DatePicker statek

      const [date, setDate] = useState(new Date());
      const [datumMentese, setDatumMentese] = useState();
      //const [show, setShow] = useState(true);

      const datumok = (event, selectedDate ) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
        setDatumMentese(currentDate.toLocaleDateString())
      }
      


      

      




      //---------------------------------------------------
    function orvosKiiras(item){
      return item.szakterulet_id === id;
    }



    const [orvosId, SetOrvosId] = useState(null)
    const szinValtoztat = (orvosid, idopont) =>{
      
      //alert(orvosid)
      SetOrvosId(orvosid)
      SetIdopont(idopont)
      
    }

    const [idopont, SetIdopont] = useState(null)
    //const [foglalt, setFoglalt] = useState('')
   
    const szinValtoztatIdopont = (idopont, foglalt) =>{
      
      //alert(idopont)
      SetIdopont(idopont)

      const nemElerheto = adatok_2.some(
        (adat) => adat.if_orvosid === orvosId && adat.if_idopont === idopont 
      );
    
      if (nemElerheto) {
        alert('nem elérhető');
        SetIdopont(null)
        

      } else {
        SetIdopont(idopont)
      }
      
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
          data={adatok.filter(orvos => orvos.szakterulet_id === id)}
          renderItem={({ item }) => (
            <View>
            {item.orvos_id == orvosId ? <TouchableOpacity onPress={()=>szinValtoztat(item.orvos_id)}>
            <Text style={styles.orvosnevvaltoztatva}>{item.nev}</Text>
          </TouchableOpacity> 
          :

          <TouchableOpacity onPress={()=>szinValtoztat(item.orvos_id)}>
          <Text style={styles.orvosnev}>{item.nev}</Text>
        </TouchableOpacity>
        }
          </View>  
          )}
          keyExtractor={(item) => item.altalanos_id.toString()}
          scrollEnabled={false}
          
        />   
      </View>

        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
          }}
        />



      <Text style={styles.orvosnev}>Dátum kiválasztása</Text>

      <View style={styles.datum}>

        <View style={styles.kivalasztottDatum}>
          <Text style={styles.kivalasztottDatumSzoveg}>Kiválasztott dátum:</Text>
        </View>

        <View style={styles.datepicker}>
          <DateTimePicker
            value={date}
            mode="date" // Choose 'time' or 'datetime' for other modes
            display="default" // 'spinner', 'calendar', or 'default'
            onChange={datumok}
            //minimumDate={new Date()}
            //onTouchEnd={datumtarol()}
            
          />
          
        </View>
        
        
        
      </View>







      <View style={styles.idopontok}>


      <View style={styles.idopont_gombok}>
          
          
          <TouchableOpacity style={styles.gombstilus} onPress={()=> szinValtoztatIdopont('17:00')}>
            <Text style={styles.idopontgombszoveg}>17:00</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gombstilus} onPress={()=> szinValtoztatIdopont('17:30')}>
            <Text style={styles.idopontgombszoveg}>17:30</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gombstilus} onPress={()=> szinValtoztatIdopont('18:00')}>
            <Text  style={styles.idopontgombszoveg}>18:00</Text>
          </TouchableOpacity>

          
        </View>
        <View style={styles.idopont_gombok}>
        <TouchableOpacity style={styles.gombstilus_2} onPress={()=> szinValtoztatIdopont('18:30')}>
            <Text  style={styles.idopontgombszoveg}>18:30</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gombstilus_2} onPress={()=> szinValtoztatIdopont('19:00')}>
            <Text  style={styles.idopontgombszoveg}>19:00</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gombstilus_2} onPress={()=> szinValtoztatIdopont('19:30')}>
            <Text  style={styles.idopontgombszoveg}>19:30</Text>
          </TouchableOpacity>
          </View>
        
          {/*
        
          */}


          {/* 
        <View >
            <FlatList
            data={adatok_2}
            renderItem={({item}) => (
              
              <View>

              <TouchableOpacity style={styles.idopont_gombok} >
                <Text>{item.if_idopont}</Text>
              </TouchableOpacity>

              </View>
            )}
            keyExtractor={item=> item.if_id}
            />
          </View>
          */}

      </View>

          <View>
            <Text>Időpont:  {idopont}</Text>
            <Text>Szakrendelés id: {id}</Text>
            <Text>Orvos Id: {orvosId}</Text>
            <Text>Dátum:  {datumMentese}</Text>
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
    flex:2,
    backgroundColor:'orvosSzin',
    margin:3
  },
  orvosnev:{
    color:'white',
    fontSize:20,
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    backgroundColor: '#113F67'
  },
  orvosnevvaltoztatva:{
    backgroundColor: 'white',
    color: '#113F67',
    fontSize:20,
    fontFamily:'inter',
    fontWeight:'400',
    padding:10,
    backgroundColor: 'white',
    borderRadius:50
  },

  datum:{
    flex:1,
    backgroundColor:'white',
    width:350,
    borderRadius:20,
    alignContent:'center',
    justifyContent:'center',
    flexDirection:'row'
    
  },
  kivalasztottDatum:{
    flex:1,
    backgroundColor:'white',
    alignContent:'center',
    justifyContent:'center',
    //borderRadius:50,
    borderRadius:20,
    
  },
  kivalasztottDatumSzoveg:{
    color:'#113F67',
    fontSize:18,
    fontFamily:'inter',
    fontWeight:'400',
    padding:5,
    
    
    
  },
  datepicker:{
    flex:1,
    backgroundColor:'white',
    alignContent:'center',
    justifyContent:'center',
    //borderRadius:50,
    borderRadius:20,
  },
  idopontok:{

    flex:3,
    backgroundColor:'#113F67',
    
    
  },
  idopont_gombok:{
    flexDirection:'row',
    flex:1,
    backgroundColor:'#113F67',
    
    
  },
  gombstilus:{
    
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:20,

    
    
  },
  gombstilus_2:{
    
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:20,
    
    
  },
  idopontgombszoveg:{
    color:'#113F67',
    fontSize:15,
    fontFamily:'inter'
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