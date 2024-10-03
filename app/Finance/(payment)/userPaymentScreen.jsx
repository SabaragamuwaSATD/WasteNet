import { useRouter } from "expo-router";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { db } from "../../../configs/FirebaseConfig";

const imageUrl =
  "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

export default function UserPaymentScreen() {
  const logoImage = require("../../../assets/images/d.png");
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [billAddress, setBillAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvc, setCvc] = useState("");

  function create() {
    if (!userName || !billAddress || !cardNumber || !expireDate || !cvc) {
      if (Platform.OS === "web") {
        window.alert("Please fill all the fields before submitting");
      } else {
        Alert.alert("Please fill all the fields before submitting");
      }
      return;
    }

    const newDocRef = doc(collection(db, "Payments"));
    const id = newDocRef.id;

    const paymentDate = new Date();

    addDoc(collection(db, "Payments"), {
      id,
      userName: userName,
      billAddress: billAddress,
      cardNumber: cardNumber,
      expireDate: expireDate,
      cvc: cvc,
      paymentDate: paymentDate.toISOString(),
    })
      .then(() => {
        console.log("Data submitted successfully");

        if (Platform.OS === "web") {
          window.alert("Payment submitted successfully");
        } else {
          Alert.alert("Payment submitted successfully");
        }

        router.push({
          pathname: "./paymentSuccess",
          params: { id, userName, billAddress, paymentDate },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 15, color: "#4caf50" }}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Add your Payment Information</Text>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <Image source={logoImage} style={styles.paymentLogo}></Image>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={userName}
            onChangeText={(userName) => setUserName(userName)}
            keyboardType="text"
          />
          <Text style={styles.label}>Card Information</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={(cardNumber) => setCardNumber(cardNumber)}
            placeholder="Card Number"
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Expire Date</Text>
              <TextInput
                value={expireDate}
                onChangeText={(expireDate) => setExpireDate(expireDate)}
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>CVC</Text>
              <TextInput
                value={cvc}
                onChangeText={(cvc) => setCvc(cvc)}
                style={styles.input}
                placeholder="Ex:123"
                keyboardType="numeric"
              />
            </View>
          </View>
          <Text style={styles.label}>Billing Address</Text>
          <TextInput
            style={styles.input}
            value={billAddress}
            onChangeText={(billAddress) => setBillAddress(billAddress)}
            placeholder="Ex: No.144, Galle rd, Colombo"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={create}>
          <Text style={styles.buttonText}>Pay: LKR. 1500</Text>
        </TouchableOpacity>
      </ScrollView>
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
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4caf50",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  button: {
    backgroundColor: "#3D550C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
    marginTop: 10,
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
});
