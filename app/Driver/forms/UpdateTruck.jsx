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

export default function UpdateTruck() {
  const [formdata, setFormData] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Update Truck",
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

  // // Fetch categories from the 'Categories' collection
  // const fetchCategories = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'Categories'))
  //     const categories = querySnapshot.docs.map(doc => ({
  //         name: doc.data().name,
  //         id: doc.id
  //     }))
  //     setCategoryList(categories)  // Update category list
  // }

  // Handling the form inputs
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async () => {
    if (Object.keys(formdata).length < 9) {
      alert("Enter all details");
      return;
    }

    const docRef = doc(db, "Services", params.id);
    await updateDoc(docRef, formdata);
    alert("Truck details updated successfully!");
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

      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
          Update Truck
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Truck Name </Text>
          <TextInput
            style={styles.input}
            value={formdata.name || ""}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Truck Make </Text>
          <TextInput
            style={styles.input}
            value={formdata.make || ""}
            onChangeText={(value) => handleInputChange("make", value)}
          />
        </View>

        {/* <View style={styles.inputContainer}>
                  <Text style={styles.lable}>Service Category *</Text>
                  <Picker
                      style={styles.input}
                      onValueChange={(itemValue) => handleInputChange('category', itemValue)}
                  >
                      {categoryList.map((category, index) => (
                          <Picker.Item key={index} label={category.name} value={category.name} />
                      ))}
                  </Picker>
              </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Driver Name </Text>
          <TextInput
            style={styles.input}
            value={formdata.driverName || ""}
            onChangeText={(value) => handleInputChange("driverName", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Fuel Type *</Text>
          <TextInput
            style={styles.input}
            value={formdata.fuel || ""}
            onChangeText={(value) => handleInputChange("fuel", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Engine Power *</Text>
          <TextInput
            style={styles.input}
            value={formdata.power || ""}
            onChangeText={(value) => handleInputChange("power", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Curb Weight *</Text>
          <TextInput
            style={styles.input}
            value={formdata.curbWeight || ""}
            onChangeText={(value) => handleInputChange("curbWeight", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>No Of Passengers </Text>
          <TextInput
            style={styles.input}
            value={formdata.passengers || ""}
            onChangeText={(value) => handleInputChange("passengers", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>About </Text>
          <TextInput
            style={styles.input}
            numberOfLines={5}
            multiline={true}
            value={formdata.about || ""}
            onChangeText={(value) => handleInputChange("about", value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
