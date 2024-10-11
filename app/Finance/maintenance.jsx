import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import * as Sharing from "expo-sharing";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import * as Print from "expo-print";

const Icon = ({ name }) => <Text style={styles.icon}>{name}</Text>;
const paymentImg = require("../../assets/images/payment-check.png");

const SalaryItem = ({
  id,
  imageUrl,
  make,
  name,
  quantity,
  vehiclePart,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.paymentItem}>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentText}>Mentainance Id - {id}</Text>
        <Text style={styles.paymentText}>Company - {make}</Text>
        <Text style={styles.paymentText}>Vehicle Name - {name}</Text>
        <Text style={styles.paymentText}>Part - {vehiclePart}</Text>
        <Text style={styles.paymentText}>Quantity - {quantity}</Text>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
    </View>
  </TouchableOpacity>
);

export default function Salary() {
  const router = useRouter();
  const imageUrl =
    "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

  const [searchQuery, setSearchQuery] = useState("");
  const [staffList, setStaffList] = useState([]); // To store fetched staff data
  const [filteredStaffList, setFilteredStaffList] = useState([]); // To store filtered staff data
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    // Fetch staff data from Firestore
    const fetchStaffData = async () => {
      try {
        const staffCollection = collection(db, "Services");
        const staffSnapshot = await getDocs(staffCollection);
        const staffData = staffSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const maintenanceStaff = staffData.filter(
          (staff) => staff.category === "Maintenance"
        );

        setStaffList(maintenanceStaff); // Set the fetched data to state
        // setFilteredStaffList(maintenanceStaff); // Initialize filtered list with full staff data
      } catch (error) {
        console.log("Error fetching staff data: ", error);
      }
    };

    fetchStaffData();
  }, []);

  const createAndDownloadPDF = async () => {
    const htmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table, th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>Registered Staff</h1>
      <table>
        <tr>
          <th>Maintainance ID</th>
          <th>Company</th>
          <th>Vehicle Name</th>
          <th>Part</th>
          <th>Quantity</th>
        </tr>
        ${staffList
          .map(
            (staff) => `
          <tr>
            <td>${staff.id}</td>
            <td>${staff.make}</td>
            <td>${staff.name}</td>
            <td>${staff.vehiclePart}</td>
            <td>${staff.quantity}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    </body>
  </html>
`;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Error generating PDF: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      </View>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#3D550C" />
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#3D550C"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Feather name="mic" size={20} color="#3D550C" />
          </View>
        </View>
        <View style={styles.titleAndFilter}>
          <Text style={styles.title}>Maintenance Request</Text>
          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity> */}
        </View>
        <ScrollView
          style={styles.staffList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {staffList.map((staff, index) => (
            <SalaryItem
              key={index}
              {...staff}
              onPress={() =>
                router.push({
                  pathname: "./maintainanceDetails", // Adjust the path to your details screen
                  params: {
                    id: staff.id,
                    name: staff.name,
                    image: staff.imageUrl,
                    make: staff.make,
                    part: staff.quantity,
                  },
                })
              }
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={createAndDownloadPDF}
        >
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Category</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleFilter("Driver")}
            >
              <Text style={styles.modalButtonText}>Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleFilter("Cleaner")}
            >
              <Text style={styles.modalButtonText}>Cleaner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleFilter("Office")}
            >
              <Text style={styles.modalButtonText}>Office</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleFilter("")}
            >
              <Text style={styles.modalButtonText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalcancelbutton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    color: "#4CAF50",
    marginRight: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4e3b5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 5,
    width: "85%", // or any percentage or specific width value you prefer
    alignSelf: "center",
    marginLeft: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#3D550C",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3D550C",
  },
  paymentList: {
    flex: 1,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentText: {
    color: "#4CAF50",
    marginBottom: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D550C",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    height: 50,
    width: "50%",
    alignSelf: "center",
  },
  downloadText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
  paymentTextNetSal: {
    color: "#4CAF50",
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 20,
  },
  titleAndFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterText: {
    color: "#3D550C",
    fontWeight: "bold",
    marginBottom: 11,
    fontSize: 16,
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
  modalButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D550C",
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalcancelbutton: {
    backgroundColor: "#e25d5d",
  },
});
