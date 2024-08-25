import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeliveryAddress: React.FC = () => {
  return (
    <View className="bg-gray-100 p-4 mx-4 my-2 rounded-lg flex-row items-center">
      <Ionicons name="location-outline" size={24} color="black" />
      <Text className="ml-2">92 High Street, London</Text>
      <TouchableOpacity className="ml-auto">
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryAddress;
