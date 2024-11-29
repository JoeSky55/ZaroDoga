import React from 'react';
import { View, Text, Button } from 'react-native';

export default function KapcsolatScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Kapcsolat Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}