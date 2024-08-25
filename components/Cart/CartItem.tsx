import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/Redux/slices/singleProductSlice';

interface CartItemProps {
  product: Product;
  item: any;
  isSelected: boolean;
  toggleSelectItem: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, item, isSelected, toggleSelectItem }) => {
  return (
    <View className="flex-row items-center px-4 py-2 border-b border-gray-200">
      <TouchableOpacity onPress={() => toggleSelectItem(item.productId)}>
        <Ionicons
          name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color="green"
        />
      </TouchableOpacity>
      {product && (
        <>
          <Image source={{ uri: product.image }} className="w-16 h-16 rounded-md ml-2" />
          <View className="ml-4 flex-1">
            <Text className="text-md font-semibold w-[170px] mb-2">{product.title}</Text>
            <Text className="text-gray-500">£{product.price}</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity>
              <Ionicons name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text className="mx-2">{item.quantity}</Text>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartItem;
