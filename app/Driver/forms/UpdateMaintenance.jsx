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

export default function UpdateMaintenance() {

    const [formdata, setFormData] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
        headerShown: false
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
        if (Object.keys(formdata).length < 5) {
        alert("Enter all details");
        return;
        }

        const docRef = doc(db, "Services", params.id);
        await updateDoc(docRef, formdata);
        alert("Maintenance details updated successfully!");
        navigation.goBack(); // Go back to the previous screen
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

  return (
    <View
    style={{
      flex: 1,
      backgroundColor: Colors.BACKGROUND,
    }}
  >
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
        Update Maintenance Report
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

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Vehicle Part </Text>
        <TextInput
          style={styles.input}
          value={formdata.vehiclePart || ""}
          onChangeText={(value) => handleInputChange("vehiclePart", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>Quantity </Text>
        <TextInput
          style={styles.input}
          value={formdata.quantity || ""}
          onChangeText={(value) => handleInputChange("quantity", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.lable}>About </Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          placeholder="Optional"
          value={formdata.about || ""}
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
  )
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