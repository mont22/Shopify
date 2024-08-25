import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { ArrowIcon } from "../navigation/TabBarIcon";
import ProductCard from "./ProductCard";
import { RootState, store } from "@/Redux/store";
import { fetchProducts, ProductResponse } from "@/Redux/slices/productSlice";
import { useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    store.dispatch(fetchProducts()).unwrap();
  }, []);

  const renderItem = ({ item }: { item: ProductResponse }) => (
    <ProductCard product={item} />
  );

  return (
    <>
      <View className="flex flex-row justify-between items-center pt-6 px-4">
        <Text className="text-3xl text-black font-bold">Flash Sale</Text>
        <TouchableOpacity className="flex flex-row items-center gap-2">
          <Text className="text-gray-400 m-0">See all</Text>
          <View className="bg-gray-200 h-7 w-7 flex items-center justify-center rounded-full">
            <ArrowIcon name="chevron-forward" />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-5" />}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default Products;
