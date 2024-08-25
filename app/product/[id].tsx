import {
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RootState, store } from "@/Redux/store";
import { fetchSingleProduct, Product } from "@/Redux/slices/singleProductSlice"; // Import Product here
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { addToCart } from "@/Redux/slices/cart/addToCartSlice";

const ProductComponent = () => {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const numericProductId = Number(productId);

  const { product } = useSelector((state: RootState) => state.singleProduct as { product: Product | null });
  const router = useRouter();

  useEffect(() => {
    store.dispatch(fetchSingleProduct({ productId: numericProductId })).unwrap();
  }, [id]);

  const handleAddToCart = () => {
    const cart = {
      userId: 2,
      date: "2020-02-03",
      products: [{ productId: numericProductId, quantity: 1 }],
    };
    store
      .dispatch(addToCart(cart))
      .unwrap()
      .then((res) => {
        router.push("/cart");
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row justify-between items-center px-4 mt-2">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View className="flex-row space-x-4">
            <TouchableOpacity>
              <Ionicons name="heart" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full items-center mt-4">
          <Image
            source={{ uri: product?.image }}
            className="h-80 w-80"
            resizeMode="contain"
          />
        </View>

        <View className="mt-6 px-4">
          <Text className="text-2xl font-semibold text-gray-800">
            {product?.title}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-lg font-bold text-green-600">{`£${product?.price}`}</Text>
            <Text className="text-sm text-gray-500 ml-2">
              from £14 per month
            </Text>
          </View>
          <Text className="text-sm text-gray-600 mt-2">
            {product?.description}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddToCart}
        className="bg-primary py-4 rounded-full absolute bottom-[70px] left-4 right-4"
        disabled={!product}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Add to cart
        </Text>
      </TouchableOpacity>

      {/* Delivery Info */}
      <Text className="text-center text-gray-500 text-sm mt-2">
        Delivery on 26 October
      </Text>
    </SafeAreaView>
  );
};

export default ProductComponent;
