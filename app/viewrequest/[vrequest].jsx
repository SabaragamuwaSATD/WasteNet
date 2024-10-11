import { router, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import MapView, { Marker } from "react-native-maps";

const RequestItem = ({
  id,
  name,
  date,
  area,
  paymentStatus,
  approvement,
  location,
}) => {
  const [status, setStatus] = useState(approvement);

  const handleAccept = async () => {
    try {
      const requestDocRef = doc(db, "Collection Requests", id);
      await updateDoc(requestDocRef, { approvement: "approved" });
      setStatus("approved");
      Alert.alert("Success", "approvement status updated to approved.");
      router.push("../(tab)/staff");
    } catch (error) {
      console.error("Error updating approvement status: ", error);
      Alert.alert(
        "Error",
        "Error updating approvement status. Please try again."
      );
    }
  };

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
            paymentStatus === "pending" && { color: "red" },
          ]}
        >
          Payment - {paymentStatus}
        </Text>
      </View>
      {/* <Image source={paymentImg} style={styles.avatar} /> */}
      {approvement === "pending" && paymentStatus === "pending" && (
        <View style={styles.acceptView}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
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

        setRequestList(requests);
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };
    fetchRequets();
  }, [user.fullName]);

  //   const createAndDownloadPDF = async () => {
  //     const htmlContent = `
  //     <html>
  //       <head>
  //         <style>
  //           body { font-family: Arial, sans-serif; padding: 20px; }
  //           h1 { text-align: center; }
  //           table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  //           table, th, td { border: 1px solid black; padding: 8px; text-align: left; }
  //           th { background-color: #f2f2f2; }
  //           .company-info { text-align: left; margin-bottom: 20px; }
  //           .company-logo { width: 100px; height: auto; }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="company-info">
  //           <h2>Wastenet PVT LTD</h2>
  //           <p>143/1, Kaduwela, Sri Lanka, 71430</p>
  //           <p>Phone: (123) 456-7890</p>
  //           <p>Email: wastenet@company.com</p>
  //         </div>
  //         <h1>Payment Records</h1>
  //         <table>
  //           <tr>
  //             <th>Payment Id</th>
  //             <th>Payee Name</th>
  //             <th>Bill Address</th>
  //             <th>Date</th>
  //             <th>Amount</th>
  //           </tr>
  //           ${paymentList
  //             .map(
  //               (payments) => `
  //             <tr>
  //             <td>${payments.id}</td>
  //             <td>${payments.userName}</td>
  //             <td>${payments.billAddress}</td>
  //             <td>${payments.paymentDate}</td>
  //             <td>Rs. 1500</td>

  //             </tr>
  //           `
  //             )
  //             .join("")}
  //         </table>
  //       </body>
  //     </html>
  //   `;

  //     try {
  //       const { uri } = await Print.printToFileAsync({ html: htmlContent });
  //       await Sharing.shareAsync(uri);
  //     } catch (error) {
  //       console.log("Error generating PDF: ", error);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      </View>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={40} color="black" />
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
        <Text style={styles.title}>Client Requests</Text>
        <ScrollView
          style={styles.paymentList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {requestList.map((request, index) => (
            <RequestItem key={index} {...request} />
          ))}
        </ScrollView>
        {/* <TouchableOpacity
          style={styles.downloadButton}
          onPress={createAndDownloadPDF}
        >
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity> */}
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
    padding: 20,
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
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
    marginBottom: 16,
    color: "#000",
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
    color: "#000",
    fontFamily: "outfit",
    fontSize: 14,
    marginBottom: 4,
  },
  avatar: {
    width: 50,
    height: 50,
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
  acceptView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#3D550C",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  acceptText: {
    color: "#fff",
    fontFamily: "outfit",
  },
});
