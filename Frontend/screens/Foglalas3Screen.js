import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Foglalas3Screen({navigation, route}) {


    const {id,orvosId,idopont,datumMentese}=route.params




  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Személyes adatok</Text>
            {/*<Text>Időpont:  {idopont}</Text>
            <Text>Szakrendelés id: {id}</Text>
            <Text>Orvos Id: {orvosId}</Text>
            <Text>Dátum:  {datumMentese}</Text>
            */}

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}