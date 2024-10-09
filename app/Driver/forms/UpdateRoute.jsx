import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Colors from "../../../constants/Colors";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../configs/FirebaseConfig";
import { TouchableOpacity } from "react-native";

export default function UpdateRoute() {
  const [formdata, setFormData] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Update Route",
    });
    fetchTruckDetails(params.id); // Fetch existing truck details
  }, [params.id]);

  const fetchTruckDetails = async (id) => {
    const docRef = doc(db, "Services", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormData(docSnap.data());
    }
    setLoading(false);
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async () => {
    if (Object.keys(formdata).length < 7) {
      alert("Enter all details");
      return;
    }

    const docRef = doc(db, "Services", params.id);
    await updateDoc(docRef, formdata);
    alert("Route details updated successfully!");
    navigation.goBack(); // Go back to the previous screen
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Update Route
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Starting area - Ending area *</Text>
        <TextInput
          style={styles.input}
          value={formdata.name || ""}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>District *</Text>
        <TextInput
          style={styles.input}
          value={formdata.make || ""}
          onChangeText={(value) => handleInputChange("make", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Driver Name *</Text>
        <TextInput
          style={styles.input}
          value={formdata.valueDriver || ""}
          onChangeText={(value) => handleInputChange("valueDriver", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Contact No *</Text>
        <TextInput
          style={styles.input}
          value={formdata.valueContact || ""}
          onChangeText={(value) => handleInputChange("valueContact", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Service Dates *</Text>
        <TextInput
          style={styles.input}
          value={formdata.dates || ""}
          onChangeText={(value) => handleInputChange("dates", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Vehicle No *</Text>
        <TextInput
          style={styles.input}
          value={formdata.valueVehicleNo || ""}
          onChangeText={(value) => handleInputChange("valueVehicleNo", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Route Manager's Name *</Text>
        <TextInput
          style={styles.input}
          value={formdata.routeManagerName || ""}
          onChangeText={(value) => handleInputChange("routeManagerName", value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text
          style={{
            fontFamily: "outfit",
            textAlign: "center",
            fontSize: 15,
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
    // padding: 10
  },

  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },

  lable: {
    marginVertical: 5,
    fontFamily: "outfit",
  },

  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 50,
  },
});
