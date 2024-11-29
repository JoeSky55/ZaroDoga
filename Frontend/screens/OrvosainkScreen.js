import React from 'react';
import { View, Text, Button } from 'react-native';

export default function OrvosainkScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orvosaink Screen</Text>
      <Text>teszt</Text>

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}