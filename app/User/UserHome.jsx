import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import logoImage from "../../assets/images/d.png";
import UserIntro from "../../components/Home/UserIntro";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-react";
import ImageSlider from "../../components/ImageSlider";
import { sliderImages } from "../../constants";

const CategoryButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.categoryButton} onPress={onPress}>
    <View style={styles.categoryIconBackground}>
      <Image source={icon} style={styles.categoryIcon} />
    </View>
    <View style={styles.categoryLabelButton}>
      <Text style={styles.categoryLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const paymentImg = require("../../assets/images/growth.png");
const salaryImg = require("../../assets/images/salary.png");
const ordersImg = require("../../assets/images/cargo.png");

export default function UserHome() {
  const logoImage = require("../../assets/images/d.png");
  const { user } = useUser();

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={logoImage}
              style={{
                width: "70%",
                height: 100,
                resizeMode: "contain",
              }}
            />
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
        </View>

        <View style={styles.ImageSlider}>
          <ImageSlider itemList={sliderImages} />
        </View>

        <View style={styles.categoryGrid}>
          <CategoryButton
            icon={paymentImg}
            label="Request"
            onPress={() => router.push("./sendRequest")}
          />
          <CategoryButton
            icon={salaryImg}
            label="Payments"
            onPress={() => router.push("./userPayments")}
          />
          <CategoryButton
            icon={ordersImg}
            label="My Requets"
            onPress={() => router.push("./userRequests")}
          />
          {/* <CategoryButton
            icon={ordersImg}
            label="Requets Progress"
            onPress={() => router.push("./userRequests")}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
    // <View
    //   style={{
    //     padding: 20,
    //     backgroundColor: "#BDD695",
    //     flex: 1,
    //   }}
    // >
    //   {/* Logo */}

    //   <Image
    //     source={logoImage}
    //     style={{
    //       width: "50%", // Adjust the width as needed
    //       height: 100, // Adjust the height as needed
    //       resizeMode: "contain",
    //     }}
    //   />

    //   {/* User Info */}
    //   <UserIntro />

    //   {/* Menu List */}
    //   <MenuList />
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6efc9",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4e3b5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    marginTop: -20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#3D550C",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D550C",
    marginBottom: 16,
    marginTop: -20,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: -20,
  },
  categoryButton: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryIconBackground: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#a4be7b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  userInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryLabelButton: {
    backgroundColor: "#a4be7b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D550C",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    width: 130, // Set the desired width
    height: 50,
  },
  ImageSlider: {
    marginBottom: 16,
    justifyContent: "center",
    marginRight: -16,
    marginLeft: -16,
  },
});
