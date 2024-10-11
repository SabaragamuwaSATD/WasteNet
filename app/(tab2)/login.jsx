import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  Button,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import UserIntro from "../../components/Home/UserIntro";
import { useRouter } from "expo-router";

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
const maintenanceImg = require("../../assets/images/cargo.png");

export default function home() {
  const logoImage = require("../../assets/images/d.png");

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleAdminPress = () => {
    setModalVisible(true);
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === "admin123") {
      setModalVisible(false);
      router.push("/home");
    } else {
      Alert.alert("Error", "Incorrect Password!");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          </View>

          <View style={styles.userInfo}>
            <UserIntro />
          </View>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#3D550C" />
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#3D550C"
            />
            <Feather name="mic" size={20} color="#3D550C" />
          </View>

          <Text style={styles.categoryTitle}>Category</Text>

          <View style={styles.categoryGrid}>
            <CategoryButton
              icon={paymentImg}
              label="Admin"
              onPress={handleAdminPress}
            />
            <CategoryButton
              icon={maintenanceImg}
              label="User"
              onPress={() => router.push("../User/UserHome")}
            />
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Admin Access</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.modalInput}
              secureTextEntry={true}
              onChangeText={setEnteredPassword}
              value={enteredPassword}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button title="OK" onPress={handlePasswordSubmit} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6efc9",
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4e3b5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
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
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "50%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
