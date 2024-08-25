import Categories from "@/components/Categories/Categories";
import Header from "@/components/Header/Header";
import Products from "@/components/Products/Products";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-gray-100 flex-1"
      >
        <Header />
        <View className="bg-white rounded-t-[25px]">
          <Categories />
          <Products />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
