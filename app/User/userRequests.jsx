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
  Touchable,
  Modal,
  Button,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";

const RequestItem = ({
  id,
  name,
  date,
  area,
  approvement,
  location,
  paymentStatus,
  onUpdate,
}) => {
  const [requestList, setRequestList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDate, setUpdatedDate] = useState(new Date(date.seconds * 1000));
  const [updatedArea, setUpdatedArea] = useState(area);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata", // UTC+5:30
    hour12: false,
  };

  const formattedDate = new Date(date.seconds * 1000)
    .toLocaleString("en-US", options)
    .replace(",", " at");
  // Handle Delete Request..................................................................

  const handleDelete = async (id) => {
    console.log("Deleting request with id: ", id);
    try {
      await deleteDoc(doc(db, "Collection Requests", id));
      setRequestList((prevList) =>
        prevList.filter((request) => request.id !== id)
      );

      Alert.alert("Success", "Request deleted successfully!");
      router.push("./UserHome");
    } catch (error) {
      console.log("Error deleting request: ", error);
      Alert.alert("Error", "Error deleting request. Please try again.");
    }
  };

  // Handle Update Request..................................................................

  const handleUpdate = async () => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata", // UTC+5:30
      hour12: false,
    };

    try {
      const requestDoc = doc(db, "Collection Requests", id);
      await updateDoc(requestDoc, {
        name: updatedName,
        date: updatedDate,
        area: updatedArea,
        location: updatedLocation,
      });

      const formattedDate = new Date(updatedDate)
        .toLocaleString("en-US", options)
        .replace(",", " at");

      onUpdate(id, {
        name: updatedName,
        date: formattedDate,
        area: updatedArea,
        location: updatedLocation,
      });

      setModalVisible(false);
      Alert.alert("Success", "Request updated successfully!");
    } catch (error) {
      console.log("Error updating request: ", error);
      Alert.alert("Error", "Error updating request. Please try again.");
    }
  };

  const updateHandler = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.paymentItem}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentText}>Request id - {id}</Text>
        <Text style={styles.paymentText}>Name - {name}</Text>
        <Text style={styles.paymentText}>Date - {formattedDate}</Text>
        <Text style={styles.paymentText}>Area - {area}</Text>
        <Text
          style={[
            styles.paymentText,
            approvement === "pending" && { color: "red" },
          ]}
        >
          Approval - {approvement}
        </Text>
        {approvement === "approved" && paymentStatus === "pending" && (
          <View style={styles.payButtonView}>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() =>
                router.push({
                  pathname: "../Finance/(payment)/userPaymentScreen",
                  params: { reqId: id },
                })
              }
            >
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonContainer}>
          {approvement === "pending" && (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updateHandler}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Update Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Request</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={updatedName}
              onChangeText={setUpdatedName}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>
                {updatedDate.toLocaleString("en-US", options)}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={updatedDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setUpdatedDate(selectedDate);
                  }
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Area"
              value={updatedArea}
              onChangeText={setUpdatedArea}
            />
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: updatedLocation.latitude,
                longitude: updatedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={(e) => setUpdatedLocation(e.nativeEvent.coordinate)}
            >
              <Marker coordinate={updatedLocation} />
            </MapView>
            <View style={styles.modalButtonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Update" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function UserRequests() {
  const imageUrl =
    "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

  const router = useRouter();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const fetchRequets = async () => {
      try {
        const requestCollection = collection(db, "Collection Requests");
        const requestSnapshot = await getDocs(requestCollection);
        const requests = requestSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const filteredRequests = requests.filter(
          (request) => request.name === user.fullName
        );

        setRequestList(filteredRequests);
      } catch (error) {
        console.error("Error fetching Requests", error);
      }
    };
    fetchRequets();
  }, [user.fullName]);

  const handleUpdate = (id, updatedData) => {
    setRequestList((prevList) =>
      prevList.map((request) =>
        request.id === id ? { ...request, ...updatedData } : request
      )
    );
  };

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
            .company-info { text-align: left; margin-bottom: 20px; }
            .company-logo { width: 100px; height: auto; }
          </style>
        </head>
        <body>
          <div class="company-info">
            <h2>Wastenet PVT LTD</h2>
            <p>143/1, Kaduwela, Sri Lanka, 71430</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: wastenet@company.com</p>
          </div>
          <h1>Payment Records</h1>
          <table>
            <tr>
              <th>Request ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Area</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Payment Status</th>
            </tr>
            ${requestList
              .map(
                (requests) => `
              <tr>
              <td>${requests.id}</td>
              <td>${requests.name}</td>
              <td>${new Date(requests.date.seconds * 1000).toLocaleString(
                "en-US"
                // options
              )}</td>
              <td>${requests.email}</td>
              <td>${requests.area}</td>
              <td>${requests.location.latitude}, ${
                  requests.location.longitude
                }</td>
              <td>${requests.phone}</td>
              <td>${requests.paymentStatus}</td>
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
        <Text style={styles.title}>My Requests</Text>
        <ScrollView
          style={styles.paymentList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {requestList.map((request, index) => (
            <RequestItem key={index} {...request} onUpdate={handleUpdate} />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={createAndDownloadPDF}
        >
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentText: {
    color: "#4CAF50",
    marginBottom: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  payButtonView: {
    marginTop: 10,
  },
  payButton: {
    backgroundColor: "#6775df",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#f3eaea",
    borderRadius: 20,
    padding: 20,
    alignItems: "left",
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 5,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
