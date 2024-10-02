import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

const imageUrl =
  "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

export default function StaffSalaryDetails() {
  const {
    id,
    name,
    salary,
    workingHours,
    workingDays,
    role,
    otAmount,
    otRate,
    totalSalary,
  } = useLocalSearchParams();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [newOtRate, setNewOtRate] = useState(otRate);
  const [newOtAmount, setNewOtAmount] = useState(otAmount);
  const [newTotalSalary, setNewTotalSalary] = useState(totalSalary);
  const [staffData, setStaffData] = useState(null);

  // Fetch specific staff data from Firestore using the ID
  const fetchStaffData = async () => {
    try {
      const staffDoc = doc(db, "Register staff", id);
      const staffSnapshot = await getDoc(staffDoc);
      if (staffSnapshot.exists()) {
        setStaffData({ ...staffSnapshot.data(), id: staffSnapshot.id });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error fetching staff data: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStaffData();
    }
  }, [id]);

  if (!staffData) {
    return <Text>Loading...</Text>;
  }

  const handleUpdate = async () => {
    try {
      const staffSalRef = doc(db, "Register staff", id);
      await updateDoc(staffSalRef, {
        otRate: newOtRate,
        otAmount: newOtAmount,
        totalSalary: newTotalSalary,
      });
      setModalVisible(false);
      fetchStaffData();

      if (Platform.OS === "web") {
        window.alert("Finance Details successfully Updated!");
      } else {
        Alert.alert("Success", "Finance Details successfully Updated!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

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
          <Text style={styles.cardTitle}>{name}</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/avatar2.jpg")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>ID - {id}</Text>
            <Text style={styles.detailText}>Role - {role}</Text>
            <Text style={styles.detailText}>Basic Salary - {salary}</Text>
            <Text style={styles.detailText}>Working Days - {workingDays}</Text>
            <Text style={styles.detailText}>
              Working Hours - {workingHours}
            </Text>
            <Text style={styles.detailText}>OT Rate - {staffData.otRate}</Text>
            <Text style={styles.detailText}>
              OT Amount - {staffData.otAmount}
            </Text>
            <Text style={[styles.detailText, styles.salaryText]}>
              Salary - LKR: {staffData.totalSalary}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Details</Text>

            <TextInput
              style={styles.input}
              placeholder="OT Rate"
              value={newOtRate}
              onChangeText={setNewOtRate}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="OT Amount"
              value={newOtAmount}
              onChangeText={setNewOtAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Total Salary"
              value={newTotalSalary}
              onChangeText={setNewTotalSalary}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={[styles.modalbutton, styles.submitButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalbutton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flex: 2,
    width: "50%",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#3D550C",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#e23326",
    marginTop: 10,
  },
  modalbutton: {
    width: "50%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
