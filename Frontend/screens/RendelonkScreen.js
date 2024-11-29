import React from 'react';
import { View, Text, Button } from 'react-native';

export default function RendelonkScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Rendelőnk screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}