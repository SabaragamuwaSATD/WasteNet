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
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const Icon = ({ name }) => <Text style={styles.icon}>{name}</Text>;
const paymentImg = require("../../assets/images/payment-check.png");

const PaymentItem = ({ id, name, reason }) => (
  <View style={styles.paymentItem}>
    <View style={styles.paymentInfo}>
      <Text style={styles.paymentText}>Payment id - {id}</Text>
      <Text style={styles.paymentText}>Name - {name}</Text>
      <Text style={styles.paymentText}>Reason - {reason}</Text>
    </View>
    <Image source={paymentImg} style={styles.avatar} />
  </View>
);

export default function EcoPayScreen() {
  const imageUrl =
    "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);

  const payments = [
    { id: "P001", name: "Saman Perera", reason: "Collect" },
    { id: "100", name: "Saman Perera", reason: "Collect" },
    { id: "100", name: "Saman Perera", reason: "Collect" },
    { id: "100", name: "Saman Perera", reason: "Collect" },
    { id: "100", name: "Saman Perera", reason: "Collect" },
    { id: "100", name: "Kamal Perera", reason: "Collect" },
  ];

  useEffect(() => {
    setFilteredPayments(
      payments.filter((payment) =>
        payment.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const downloadReport = async () => {
    try {
      // Generate HTML content for the PDF
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { color: #007386; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <h1>Payments Report</h1>
            <table>
              <tr>
                <th>Payment ID</th>
                <th>Name</th>
                <th>Reason</th>
              </tr>
              ${filteredPayments
                .map(
                  (payment) => `
                <tr>
                  <td>${payment.id}</td>
                  <td>${payment.name}</td>
                  <td>${payment.reason}</td>
                </tr>
              `
                )
                .join("")}
            </table>
          </body>
        </html>
      `;

      // Create a PDF from the HTML content
      const pdfOptions = {
        html: htmlContent,
        fileName: "report",
        directory: "Documents",
      };
      const pdf = await RNHTMLtoPDF.convert(pdfOptions);

      // Share the PDF file
      await Sharing.shareAsync(pdf.filePath);
    } catch (error) {
      console.error("Error generating or sharing the PDF:", error);
      Alert.alert("Error", "Failed to download the report.");
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
        <Text style={styles.title}>Recent Payments</Text>
        <ScrollView
          style={styles.paymentList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {filteredPayments.map((payment, index) => (
            <PaymentItem key={index} {...payment} />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={downloadReport}
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
