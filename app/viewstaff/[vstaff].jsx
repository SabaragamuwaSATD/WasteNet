import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "./../../configs/FirebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import * as Print from "expo-print"; // Expo's Print API
import * as Sharing from "expo-sharing"; // Sharing API

export default function ViewStaff() {
  const router = useRouter();
  const [staffList, setStaffList] = useState([]); // To store fetched staff data
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [filteredStaffList, setFilteredStaffList] = useState([]); // To store filtered staff data
  const [editingStaff, setEditingStaff] = useState(null); // For handling staff update
  const imageUrl =
    "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

  useEffect(() => {
    // Fetch staff data from Firestore
    const fetchStaffData = async () => {
      try {
        const staffCollection = collection(db, "Register staff");
        const staffSnapshot = await getDocs(staffCollection);
        const staffData = staffSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStaffList(staffData); // Set the fetched data to state
        setFilteredStaffList(staffData); // Initialize filtered list with full staff data
      } catch (error) {
        console.log("Error fetching staff data: ", error);
      }
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    // Filter staff list based on search query
    const filteredList = staffList.filter((staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStaffList(filteredList);
  }, [searchQuery, staffList]);

  // Function to create PDF and download
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
              <th>Name</th>
              <th>BirthDate</th>
              <th>NIC</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Working Days</th>
              <th>Gender</th>
              <th>Role</th>
            </tr>
            ${filteredStaffList
              .map(
                (staff) => `
              <tr>
                <td>${staff.name}</td>
                <td>${staff.birthDate}</td>
                <td>${staff.nic}</td>
                <td>${staff.phone}</td>
                <td>${staff.salary}</td>
                <td>${staff.address}</td>
                <td>${staff.workingDays}</td>
                <td>${staff.gender}</td>
                <td>${staff.role}</td>
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

  // Handle delete staff member
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Register staff", id));
      setStaffList((prevList) => prevList.filter((staff) => staff.id !== id));
      setFilteredStaffList((prevList) =>
        prevList.filter((staff) => staff.id !== id)
      );

      if (Platform.OS === "web") {
        window.alert("Staff member deleted successfully!");
      } else {
        Alert.alert("Success", "Staff member deleted successfully!");
      }
    } catch (error) {
      console.log("Error deleting staff member: ", error);
    }
  };

  // Handle update staff member
  const handleUpdate = async () => {
    if (!editingStaff) return;

    try {
      const staffDocRef = doc(db, "Register staff", editingStaff.id);
      await updateDoc(staffDocRef, editingStaff);
      setStaffList((prevList) =>
        prevList.map((staff) =>
          staff.id === editingStaff.id ? editingStaff : staff
        )
      );
      setFilteredStaffList((prevList) =>
        prevList.map((staff) =>
          staff.id === editingStaff.id ? editingStaff : staff
        )
      );
      setEditingStaff(null);

      if (Platform.OS === "web") {
        window.alert("Staff member updated successfully!");
      } else {
        Alert.alert("Success", "Staff member updated successfully!");
      }
    } catch (error) {
      console.log("Error updating staff member: ", error);
    }
  };

  const handleEditPress = (staff) => {
    setEditingStaff({ ...staff });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e6efc9" }}>
      {/* Header Image */}
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 2,
          marginBottom: 5,
        }}
      />

      {/* Back Button */}
      <View style={{ marginTop: 1, padding: 10 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#a1a9a4",
          padding: 10,
          marginVertical: 10,
          marginTop: 2,
          borderRadius: 8,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          placeholder="Search by Name..."
          placeholderTextColor=""
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            marginLeft: 10,
            flex: 1,
          }}
        />
      </View>

      {/* Title */}
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            padding: 10,
            fontSize: 20,
          }}
        >
          View Registrations
        </Text>
      </View>

      {/* List of Staff */}
      <ScrollView>
        <FlatList
          data={filteredStaffList}
          keyExtractor={(item) => item.id} // Ensure each list item has a unique key
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                margin: 10,
                padding: 15,
                borderRadius: 18,
                borderColor: Colors.BTN,
                borderWidth: 1,
              }}
            >
              <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                {item.name}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Birth Date: {item.birthDate}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                NIC: {item.nic}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Phone: {item.phone}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Salary: {item.salary}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Gender: {item.gender}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Role: {item.role}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Address: {item.address}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Working Days: {item.workingDays}
              </Text>
              <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
                Working Hours: {item.workingHours}
              </Text>
              {/* Action Buttons */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                {/* Update Button */}
                <TouchableOpacity
                  onPress={() => handleEditPress(item)}
                  style={{
                    backgroundColor: "#5F812A",
                    padding: 10,
                    borderRadius: 10,
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontFamily: "outfit-bold",
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: "#FF4D4D",
                    padding: 10,
                    borderRadius: 10,
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontFamily: "outfit-bold",
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* PDF Download Button */}
        <View style={{ alignItems: "center", margin: 20 }}>
          <TouchableOpacity
            onPress={createAndDownloadPDF}
            style={{
              backgroundColor: Colors.BTN,
              padding: 15,
              borderRadius: 10,
              width: "60%",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#fff", fontSize: 18, fontFamily: "outfit-bold" }}
            >
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Staff Modal */}
      {editingStaff && (
        <View
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            right: "10%",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            elevation: 5,
            maxHeight: "70%", // Limiting height for scrollable content
          }}
        >
          <ScrollView>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
              Update Registration
            </Text>
            <TextInput
              placeholder="Name"
              value={editingStaff.name}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, name: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Birth Date"
              value={editingStaff.birthDate}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, birthDate: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="NIC"
              value={editingStaff.nic}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, nic: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Phone"
              value={editingStaff.phone}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, phone: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Salary"
              value={editingStaff.salary}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, salary: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Gender"
              value={editingStaff.gender}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, gender: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Role"
              value={editingStaff.role}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, role: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Address"
              value={editingStaff.address}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, address: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Working Days"
              value={editingStaff.workingDays}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, workingDays: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TextInput
              placeholder="Working Hours"
              value={editingStaff.workingHours}
              onChangeText={(text) =>
                setEditingStaff((prev) => ({ ...prev, workingHours: text }))
              }
              style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            />
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                backgroundColor: Colors.BTN,
                padding: 10, // Reduced padding for smaller button
                borderRadius: 5,
                marginVertical: 10,
                width: "60%", // Reduced width for smaller button
                alignItems: "center",
                alignSelf: "center", // Centers the button horizontally
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditingStaff(null)}
              style={{
                backgroundColor: "#FF4D4D",
                padding: 10, // Reduced padding for smaller button
                borderRadius: 5,
                marginVertical: 10,
                width: "60%", // Reduced width for smaller button
                alignItems: "center",
                alignSelf: "center", // Centers the button horizontally
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
