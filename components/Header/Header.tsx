import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { SearchIcon } from "../navigation/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Header = () => {
  return (
    <View
      className={`h-[220px] bg-white px-5 rounded-b-[25px] mb-3 flex flex-column pt-2`}
    >
      <View className="flex flex-row justify-between items-center pb-3">
        <TouchableOpacity className="bg-primary h-12 w-12 rounded-full justify-center items-center">
          <Ionicons
            name="menu"
            size={25}
            color="black"
            className="text-center mx-1"
          />
        </TouchableOpacity>
        <View>
          <Text className="text-3xl font-bold">Store</Text>
        </View>
        <TouchableOpacity className="bg-gray-100 h-12 w-12 rounded-full justify-center items-center">
          <Ionicons
            name="notifications-outline"
            size={25}
            color="gray"
            className="text-center mx-1"
          />
        </TouchableOpacity>
      </View>
      <View
        className={`mt-2 bg-gray-100 p-2 flex-row items-center w-full h-[55px] rounded-xl justify-center`}
      >
        <SearchIcon
          name="search"
          size={25}
          color="gray"
          className="text-center mx-1"
        />
        <TextInput className={`text-center`} placeholder="Search..." />
      </View>
      <LinearGradient
        colors={["#f9fafb", "transparent"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        className="p-2 mt-3 rounded-xl h-[55px] flex flex-row items-center w-full justify-center"
      >
        <Text className="text-black font-semibold text-center">
          Delivery is 50% cheaper
        </Text>
      </LinearGradient>
    </View>
  );
};

export default Header;
