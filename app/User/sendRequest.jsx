import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";

export default function CollectRequestScreen() {
  const { user } = useUser();
  const router = useRouter();
  const imageUrl =
    "https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg";

  const name = user.fullName;
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState({
    latitude: 7.8731,
    longitude: 80.7718,
  });
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onMapPress = (e) => {
    setLocation(e.nativeEvent.coordinate);
  };

  function create() {
    if (!name || !email || !phone || !area) {
      if (Platform.OS === "web") {
        window.alert("Please fill all the fields before submitting"); // For web
      } else {
        Alert.alert("Please fill all the fields before submitting"); // For mobile
      }
      return;
    }

    const newDocRef = doc(collection(db, "Collection Requests"));
    const id = newDocRef.id;

    addDoc(collection(db, "Collection Requests"), {
      id,
      name,
      email,
      date: Timestamp.fromDate(date),
      phone,
      area,
      location,
      paymentStatus: paymentStatus,
    })
      .then(() => {
        console.log("Collection Request Submitted with ID: ", id);

        if (Platform.OS === "web") {
          window.alert("Collection Request Submitted successfully!"); // Web alert
        } else {
          Alert.alert("Success", "Collection Request Submitted successfully!"); // Mobile alert
        }

        router.push("./UserHome");
      })
      .catch((error) => {
        console.log(error);

        // Show error message based on platform
        if (Platform.OS === "web") {
          window.alert("Error: Something went wrong"); // Web alert
        } else {
          Alert.alert("Error", "Something went wrong"); // Mobile alert
        }
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      </View>
      <View style={styles.content}></View>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
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
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Send New Collect Request</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          editable={false} // Make it non-editable if needed
        />
        <TextInput
          style={styles.input}
          placeholder="Email..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Phone..."
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Area..."
          value={area}
          onChangeText={setArea}
        />
        <MapView
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={onMapPress}
        >
          <Marker coordinate={location} />
        </MapView>
        <TouchableOpacity style={styles.sendButton} onPress={create}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
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
    height: "50%",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -250,
    marginRight: 10,
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
    width: "80%", // or any percentage or specific width value you prefer
    alignSelf: "center",
    marginLeft: 30,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#3D550C",
  },
  scrollContent: {
    padding: 20,
    marginTop: -20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e7d32",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  map: {
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: "#3D550C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButtonText: {
    marginLeft: 15,
  },
});
