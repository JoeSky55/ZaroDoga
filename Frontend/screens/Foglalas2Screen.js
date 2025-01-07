import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function Foglalas2Screen({ navigation, route }) {

    const {id,nev}=route.params
    const [adatok,setAdatok]=useState([])
    const [adatok_2,setAdatok_2]=useState([])
    const [idopont, SetIdopont] = useState(null)
    const [orvosId, SetOrvosId] = useState(null)
    const [orvosNeve, SetOrvosNeve] = useState()
    const [date, setDate] = useState(new Date());
    const [datumMentese, setDatumMentese] = useState();
    const [igaze,setIgaze] = useState(false)
    //const [show, setShow] = useState(true);




    const letoltes=async ()=>{
      const x=await fetch("http://192.168.10.62:3000/orvosok")
      const y=await x.json()
      setAdatok(y)
      //alert(JSON.stringify(y))
    }

    const letoltes_2=async ()=>{
      let adatok = {
        "bevitel1":orvosNeve,
        "bevitel2":datumMentese
      }
      const x=await fetch("http://192.168.10.62:3000/foglaltIdopontok",{
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      const y=await x.json()
      setAdatok_2(y)
  
           
      //alert(JSON.stringify(y))
      setIgaze(true)
    }

      useEffect(()=>{
        letoltes()
        
    },[])

    




   
  
    //----------------------------------------------------
    //DatePicker statek

     

      const datumok = (event, selectedDate ) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
        setDatumMentese(currentDate.toISOString().split('T')[0]);
        //alert(orvosNeve) undefinednél hibauzenet kiirasa 
        // ha dátum nincs meg arra is kell hibauzenet
        //alert(datumMentese)
        
        if (orvosNeve != undefined && datumMentese!= undefined) {
          //alert('ok')
          letoltes_2()
          
        }
       
        

      }
      //---------------------------------------------------
    function orvosKiiras(item){
      return item.szakterulet_id === id;
    }

    const szinValtoztat = (orvosid, orvosneve ) =>{
      
      //alert(orvosneve)
      SetOrvosId(orvosid)
      SetOrvosNeve(orvosneve)
      //SetIdopont(idopont)
      SetIdopont(null)
      setDatumMentese(null)
      setIgaze(false)
      setKivalasztottId(null)
    }

    const [kivalasztottId, setKivalasztottId] = useState(null);

    const szinValtoztatIdopont = (idopont) =>{
      //alert(orvosNeve)
      //alert(idopont)
      SetIdopont(idopont)
      setKivalasztottId(idopont)
      
      /*
      const nemElerheto = adatok_2.some(
        (adat) => adat.if_orvosid === orvosId && adat.if_idopont === idopont || adat.if_datum === datumMentese
      );
      
      adatok_2.forEach(elem => {
        
      });
   
      if (nemElerheto) {
        alert('nem elérhető');
        SetIdopont(null)
        

      } else {
        SetIdopont(idopont)
      }
      */
    } 
    const szinValtoztatIdopontNemElerheto = () =>{
      alert("Az időpont nem elérhető")
    }
    
    function TovabbGomb(){
      
      if (idopont != null && orvosId != null && datumMentese != null  && id != null) {
        navigation.navigate("  ",{id:id,nev:nev,orvosId:orvosId,idopont:idopont,datumMentese:datumMentese, orvosNeve:orvosNeve})
      }
      else{
        alert('Add meg az összes adatot')
      }
      
    }
      
    const Elerheto=(ido)=>{
      for (let index = 0; index < adatok_2.length; index++) {
        const elem = adatok_2[index].if_idopont;
        if(elem==ido){
          return true
        }
      }
      return false
    
    
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
          <Text style={styles.orvosnev}>Válasszon orvost:</Text>
        <FlatList
          data={adatok.filter(orvos => orvos.szakterulet_id === id)}
          renderItem={({ item }) => (
            <View>
            {item.orvos_id == orvosId ? <TouchableOpacity onPress={()=>szinValtoztat(item.orvos_id, item.nev)}>
            <Text style={styles.orvosnevvaltoztatva}>{item.nev}</Text>
          </TouchableOpacity> 
          :

          <TouchableOpacity onPress={()=>szinValtoztat(item.orvos_id, item.nev)}>
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
            minimumDate={new Date()}
            //onTouchEnd={datumtarol()}
            
          />
          
        </View>
        
        
        
      </View>






{igaze?
      <View style={styles.idopontok}>
     
      <View style={styles.idopont_gombok}>
          {Elerheto('17:00')?<TouchableOpacity style={styles.gombstilus_valtoztat} onPress={()=> szinValtoztatIdopontNemElerheto('17:00')}>
            <Text style={styles.idopontgombszoveg}>17:00</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.gombstilus,kivalasztottId === '17:00' && styles.kivalasztottGomb]} onPress={()=> szinValtoztatIdopont('17:00')}>
            <Text style={styles.idopontgombszoveg}>17:00</Text>
          </TouchableOpacity>
          }
          

          {Elerheto('17:30')?<TouchableOpacity style={styles.gombstilus_valtoztat} onPress={()=> szinValtoztatIdopontNemElerheto('17:30')}>
            <Text style={styles.idopontgombszoveg}>17:30</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.gombstilus,kivalasztottId === '17:30' && styles.kivalasztottGomb]} onPress={()=> szinValtoztatIdopont('17:30')}>
            <Text style={styles.idopontgombszoveg}>17:30</Text>
          </TouchableOpacity>
          }

          {/*<TouchableOpacity style={styles.gombstilus} onPress={()=> szinValtoztatIdopont('17:30')}>
            <Text style={styles.idopontgombszoveg}>17:30</Text>
          </TouchableOpacity>
          */}

          {Elerheto('18:00')?<TouchableOpacity style={styles.gombstilus_valtoztat} onPress={()=> szinValtoztatIdopontNemElerheto('18:00')}>
            <Text style={styles.idopontgombszoveg}>18:00</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.gombstilus,kivalasztottId === '18:00' && styles.kivalasztottGomb]} onPress={()=> szinValtoztatIdopont('18:00')}>
            <Text style={styles.idopontgombszoveg}>18:00</Text>
          </TouchableOpacity>
          }
{/*
          <TouchableOpacity style={styles.gombstilus} onPress={()=> szinValtoztatIdopont('18:00')}>
            <Text  style={styles.idopontgombszoveg}>18:00</Text>
          </TouchableOpacity>
*/}
          
        </View>
        <View style={styles.idopont_gombok}>




          {Elerheto('18:30')?<TouchableOpacity style={styles.gombstilus_2_valtoztat} onPress={()=> szinValtoztatIdopontNemElerheto('18:30')}>
            <Text style={styles.idopontgombszoveg}>18:30</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.gombstilus_2,kivalasztottId === '18:30' && styles.kivalasztottGomb]} onPress={()=> szinValtoztatIdopont('18:30')}>
            <Text style={styles.idopontgombszoveg}>18:30</Text>
          </TouchableOpacity>
          }

          {Elerheto('19:00')?<TouchableOpacity style={styles.gombstilus_2_valtoztat} onPress={()=> szinValtoztatIdopontNemElerheto('19:00')}>
            <Text style={styles.idopontgombszoveg}>19:00</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.gombstilus_2,kivalasztottId === '19:00' && styles.kivalasztottGomb]} onPress={()=> szinValtoztatIdopont('19:00')}>
            <Text style={styles.idopontgombszoveg}>19:00</Text>
          </TouchableOpacity>
          }
        
          {Elerheto('19:30')?<TouchableOpacity style={styles.gombstilus_2_valtoztat} onPress={()=> szinValtoztatIdopontNemElerheto('19:30')}>
            <Text style={styles.idopontgombszoveg}>19:30</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.gombstilus_2,kivalasztottId === '19:30' && styles.kivalasztottGomb]} onPress={()=> szinValtoztatIdopont('19:30')}>
            <Text style={styles.idopontgombszoveg}>19:30</Text>
          </TouchableOpacity>
          }
          

          

          </View>
          </View>
          :<View></View>
          }
         
          
         
        
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

      

          <View>
            <Text>Időpont:  {idopont}</Text>
            <Text>Szakrendelés id: {id}</Text>
            <Text>Orvos Id: {orvosId}</Text>
            <Text>Dátum:  {datumMentese}</Text>
            <Text>Orvos neve:  {orvosNeve}</Text>
          
          </View>






      <View style={styles.container2}>

        
          <TouchableOpacity style={styles.gombok} onPress={() => navigation.goBack()}>
            <Text style={styles.gombszoveg}>Vissza</Text>
          </TouchableOpacity>
        
        

        
          <TouchableOpacity style={styles.gombok} onPress={()=>TovabbGomb()}>
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
    flex:3.5,
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
  gombstilus_valtoztat:{
    
    flex:1,
    backgroundColor:'gray',
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
  gombstilus_2_valtoztat:{
    
    flex:1,
    backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:20,
    
    
  },
  kivalasztottGomb: {
    backgroundColor: 'green', 
    opacity:50
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