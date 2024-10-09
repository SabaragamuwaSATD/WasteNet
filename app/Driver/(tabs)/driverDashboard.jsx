import { View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Home Driver/Header";
import Slider from "../../../components/Home Driver/Slider";
import ServicesByCategory from "../../../components/Home Driver/ServicesByCategory";
import { TouchableOpacity } from "react-native";
import Category from "../../../components/Home Driver/Category";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../../constants/Colors";
import { useRouter } from "expo-router";

export default function DriverDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Trucks");

  const router = useRouter();

  const handleButtonPress = () => {
    if (selectedCategory === "Trucks") {
      router.push("../forms/AddTruck");
    } else if (selectedCategory === "Routes") {
      router.push("../forms/AddRoute");
    } else if (selectedCategory === "Tasks") {
      router.push("../forms/AddTask");
    }
  };

  const renderButtonLabe = () => {
    if (selectedCategory === "Trucks") {
      return "Add new Truck";
    } else if (selectedCategory === "Routes") {
      return "Add new Route";
    } else if (selectedCategory === "Tasks") {
      return "Add new Task";
    } else {
      return `Add new ${selectedCategory}`;
    }
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <ScrollView>
        <View>
          {/* Header */}
          <Header />

          {/* Slider */}
          <Slider />

          {/* category selection */}
          <Category category={(name) => setSelectedCategory(name)} />

          {/*List of Services + Category */}
          <ServicesByCategory selectedCategory={selectedCategory} />
        </View>

        {/* Add new Truck */}
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            gap: 20,
            marginTop: 20,
            backgroundColor: Colors.LIGHT_PRIMARY,
            borderWidth: 1,
            borderColor: Colors.LIGHT_PRIMARY,
            borderRadius: 15,
            borderStyle: "dashed",
          }}
          onPress={handleButtonPress}
        >
          <Ionicons name="add-circle-sharp" size={24} color={Colors.BLACK} />
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.BLACK,
            }}
          >
            {renderButtonLabe()}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
