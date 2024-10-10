import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Colors from "../../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../configs/FirebaseConfig";
import { TouchableOpacity } from "react-native";

export default function UpdateTask() {
  const [formdata, setFormData] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Update Task",
    });
    fetchTaskDetails(params.id);
  }, [params.id]);

  const fetchTaskDetails = async (id) => {
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
    if (Object.keys(formdata).length < 8) {
      alert("Enter all details");
      return;
    }

    const docRef = doc(db, "Services", params.id);
    await updateDoc(docRef, formdata);
    alert("Task details updated successfully!");
    navigation.goBack(); // Go back to the previous screen
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{
      flex:1,
      backgroundColor:Colors.BACKGROUND
    }}>
      <Image
        source={require("../../../assets/images/Form Header.jpeg")}
        style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
          marginTop: 0,
        }}
      />

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
          Update Taks
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Address </Text>
          <TextInput
            style={styles.input}
            value={formdata.address || ""}
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Customer Name </Text>
          <TextInput
            style={styles.input}
            value={formdata.customerName || ""}
            onChangeText={(value) => handleInputChange("customerName", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Task Manager's Name </Text>
          <TextInput
            style={styles.input}
            value={formdata.managerName || ""}
            onChangeText={(value) => handleInputChange("managerName", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Contact No </Text>
          <TextInput
            style={styles.input}
            value={formdata.valuePhone || ""}
            onChangeText={(value) => handleInputChange("valuePhone", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Task Date </Text>
          <TextInput
            style={styles.input}
            value={formdata.valueDate || ""}
            placeholder="DD/MM/YYYY"
            onChangeText={(value) => handleInputChange("valueDate", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Waste Type </Text>
          <TextInput
            style={styles.input}
            value={formdata.valueWasteType || ""}
            onChangeText={(value) => handleInputChange("valueWasteType", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Approximate Weight </Text>
          <TextInput
            style={styles.input}
            value={formdata.valueWeight || ""}
            placeholder="KG"
            onChangeText={(value) => handleInputChange("valueWeight", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>About </Text>
          <TextInput
            style={styles.input}
            value={formdata.about || ""}
            numberOfLines={5}
            multiline={true}
            placeholder="About Task"
            onChangeText={(value) => handleInputChange("about", value)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
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
  buttonText: {
    fontFamily: "outfit",
    textAlign: "center",
    fontSize: 15,
  },
});
