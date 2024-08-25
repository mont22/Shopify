import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CheckoutButton: React.FC = () => {
  return (
    <View className="px-4 py-3">
      <TouchableOpacity className="bg-primary p-4 rounded-full items-center">
        <Text className="text-white text-lg font-semibold">Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutButton;
