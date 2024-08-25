import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartHeader: React.FC = () => {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-white">
      <Text className="text-2xl font-bold">Cart</Text>
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartHeader;
