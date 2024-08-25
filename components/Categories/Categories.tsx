import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { ArrowIcon } from "@/components/navigation/TabBarIcon";
import { RootState, store } from "@/Redux/store";
import {
  CategoryResponse,
  fetchCategories,
} from "@/Redux/slices/categoriesSlice";
import { useSelector } from "react-redux";

const Categories = () => {
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    store.dispatch(fetchCategories()).unwrap();
  }, []);

  const renderItem = ({ item }: { item: CategoryResponse }) => {
    return (
      <View className="items-center justify-center gap-3">
        <View className="bg-gray-200 h-20 w-20 rounded-full items-center justify-center">
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/dark-themed-mobile-phone-surrounded-by-apps_52683-23826.jpg?w=1380&t=st=1724616117~exp=1724616717~hmac=440b6466d85ad04c1119619eb863f7e6e20e87aed469ab839ccd20ba73041347",
            }}
            style={{ height: 40, width: 40 }}
          />
        </View>
        <Text className="text-black font-semibold text-center">
          {item.length > 11 ? item.slice(0, 11) + "..." : item}
        </Text>
      </View>
    );
  };
  return (
    <>
      <View className="flex flex-row justify-between items-center pt-6 px-4">
        <Text className="text-3xl text-black font-bold">Categories</Text>
        <TouchableOpacity className="flex flex-row items-center gap-2">
          <Text className="text-gray-400 m-0">See all</Text>
          <View className="bg-gray-200 h-7 w-7 flex items-center justify-center rounded-full">
            <ArrowIcon name="chevron-forward" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row my-4 pl-4">
        <FlatList
          data={categories || []}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View className="w-5" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Categories;
