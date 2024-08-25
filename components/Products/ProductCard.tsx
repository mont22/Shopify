import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ProductResponse } from "@/Redux/slices/productSlice";
import { Href, useRouter } from "expo-router";

const ProductCard = ({ product }: { product: ProductResponse }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`product/${product.id.toString()}` as Href);
      }}
      className="bg-white flex-1 min-h-[200px] mx-2 w-full"
    >
      <View className="bg-gray-100 rounded-[15px] p-7 w-full flex flex-row justify-center">
        <Image
          source={{ uri: product.image }}
          style={{ width: 120, height: 120 }}
        />
      </View>
      <Text className="my-2 font-semibold">{product.title}</Text>
      <Text>{product.category}</Text>
      <Text className="text-black font-semibold my-2">${product.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
