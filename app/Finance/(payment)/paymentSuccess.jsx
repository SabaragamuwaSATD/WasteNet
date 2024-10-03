import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

const imageUrl =
  "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

export default function PaymentConfirmation() {
  const [logoBase64, setLogoBase64] = useState("");
  const logoImage = require("../../../assets/images/d.png");
  const { id, userName, billAddress, paymentDate } = useLocalSearchParams();

  const formattedDate = new Date(paymentDate).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  });

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
        <h1>Invoice</h1>
        <table>
          <tr>
            <th>Payment Id</th>
            <th>Payee Name</th>
            <th>Bill Address</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>${id}</td>
            <td>${userName}</td>
            <td>${billAddress}</td>
            <td>${paymentDate}</td>
            <td>Rs. 1500</td>
          </tr>
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
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 15, color: "#4caf50" }}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Add your Payment Information</Text>
      </View> */}

      <View style={styles.content}>
        <Text style={styles.title}>Payment Confirmation</Text>
        <View style={styles.card}>
          <Image source={logoImage} style={styles.paymentLogo}></Image>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Svg height="40" width="40" viewBox="0 0 24 24">
                <Path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  fill="#4CAF50"
                />
              </Svg>
            </View>
          </View>
          <View style={styles.contentPayDetails}>
            <Text style={styles.successText}>Payment Successful!</Text>
            <Text style={styles.paymentId}>Payment Id: {id}</Text>
            <Text style={styles.paymentId}>Payee Name: {userName}</Text>
            <Text style={styles.paymentId}>Bill Address: {billAddress}</Text>
            <Text style={styles.paymentId}>Date: {formattedDate}</Text>
            <Text style={[styles.paymentId, styles.amountText]}>
              Amount: Rs: 1500.00
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>To Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={createAndDownloadPDF}>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6efc9",
  },
  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 3,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 40,
    padding: 10,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentId: {
    fontSize: 16,
    color: "#333",
    textAlign: "left", // Align text to the left
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#3D550C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentLogo: {
    width: 240,
    height: 31,
    alignSelf: "center",
    marginVertical: 40,
    marginHorizontal: 10,
  },
  invoice: {
    backgroundColor: "#3D550C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  invoiceText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  amountText: {
    color: "#4CAF50",
    fontSize: 25,
    fontWeight: "bold",
  },
});
