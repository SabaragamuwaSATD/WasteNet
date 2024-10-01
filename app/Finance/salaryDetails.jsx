import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const imageUrl =
  "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

export default function StaffSalaryDetails() {
  const { id, name, salary } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#4a4a4a" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#3D550C" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#3D550C"
            // value={searchQuery}
            // onChangeText={setSearchQuery}
          />
          <Feather name="mic" size={20} color="#3D550C" />
        </View>
        <Text style={styles.title}>Staff Salary Details</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Staff Id - {id}</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/avatar2.jpg")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Name - {name}</Text>
            <Text style={styles.detailText}>Working Hours - 90</Text>
            <Text style={styles.detailText}>OT Amount - LKR: 5000.00</Text>
            <Text style={[styles.detailText, styles.salaryText]}>
              Salary - LKR: {salary}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.updateButton]}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6efc9",
  },
  header: {
    height: 200,
    backgroundColor: "#4CAF50",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 15,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4e3b5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 15,
    width: "85%",
    alignSelf: "center",
    marginLeft: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#3D550C",
  },
  micIcon: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3D550C",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 10,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: "#efe7e7",
    borderRadius: 10,
    padding: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#4a4a4a",
    marginBottom: 5,
  },
  salaryText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#3D550C",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#3D550C",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
