import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Header from "../../../components/Home Driver/Header";
import Slider from "../../../components/Home Driver/Slider";
import ServicesByCategory from "../../../components/Home Driver/ServicesByCategory";
import { TouchableOpacity } from "react-native";
import Category from "../../../components/Home Driver/Category";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../../constants/Colors";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-react";


export default function DriverDashboard() {
  const logoImage = require("../../../assets/images/d.png");
  const [selectedCategory, setSelectedCategory] = useState("Trucks");

  const router = useRouter();
  const user = useUser();

  const handleButtonPress = () => {
    if (selectedCategory === "Trucks") {
      router.push("../../Driver/forms/AddTruck");
    } else if (selectedCategory === "Routes") {
      router.push("../../Driver/forms/AddRoute");
    } else if (selectedCategory === "Tasks") {
      router.push("../../Driver/forms/AddTask");
    } else if (selectedCategory === "Maintenance"){
      router.push("../../Driver/forms/AddMaintenance");
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
        // marginTop: 20,
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <ScrollView>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={logoImage}
                style={{
                  width: "70%", // Adjust the width as needed
                  height: 100, // Adjust the height as needed
                  resizeMode: "contain",
                }}
              />
              {/* <Text style={styles.title}>WasteNet</Text> */}
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5,
                marginTop: 10,
              }}
            >
              <Image
                source={{ uri: user?.imageUrl }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 99,
                }}
              />
            </View>
            {/* <Feather name="user" size={24} color="#3D550C" /> */}
          </View>

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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D550C",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3D550C",
    marginBottom: 16,
  },
});
