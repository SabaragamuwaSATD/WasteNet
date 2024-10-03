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
} from "react-native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";

const Icon = ({ name }) => <Text style={styles.icon}>{name}</Text>;
const paymentImg = require("../../assets/images/payment-check.png");

const RequestItem = ({ id, name, date, area }) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <View style={styles.paymentItem}>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentText}>Request id - {id}</Text>
        <Text style={styles.paymentText}>Name - {name}</Text>
        <Text style={styles.paymentText}>Date - {formattedDate}</Text>
        <Text style={styles.paymentText}>Area - {area}</Text>
      </View>
      <Image source={paymentImg} style={styles.avatar} />
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
});
