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
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../../configs/FirebaseConfig";
import { TouchableOpacity } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
// import diverDashboard from "../(tabs)/driverDashboard"

export default function AddRoute() {
  const navigation = useNavigation();

  const [categoryList, setCategoryList] = useState([]);

  const [formdata, setFormData] = useState({
    category: "Routes",
  });

  const [image, setImage] = useState();

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getCategories();
  }, []);

  //Handling the form inputs
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  //Getting the categories from the database
  const getCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "GarbageCategory"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const onSubmit = () => {
    if (Object.keys(formdata).length != 8) {
      // ToastAndroid.show('Enter all details',ToastAndroid.BOTTOM)
      alert("Enter All Details");
      return;
    }
    uploadImage();
  };

  const uploadImage = async () => {
    const blobImage = await fetch(image).then((r) => r.blob());
    const storageRef = ref(storage, "garbageRoutes/" + Date.now());

    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("File uploaded");
      })
      .then((response) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          saveFormData(downloadUrl);
        });
      });

    router.push("../(tabs)/driverDashboard");
  };

  const saveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Services", docId), {
      ...formdata,
      imageUrl: imageUrl,
      id: docId,
    });
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
          Add New Route
        </Text>

        <Pressable onPress={imagePicker}>
          {!image ? (
            <Image
              source={require("../../../assets/images/routes.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                backgroundColor: Colors.GRAY,
              }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.GRAY,
              }}
            />
          )}
        </Pressable>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Starting area - Ending area *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>District *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("make", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Service Category *</Text>
          <Picker
            style={styles.input}
            selectedValue={formdata.category}
            onValueChange={(itemValue, itemIndex) => {
              handleInputChange("category", itemValue);
            }}
          >
            {categoryList.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Driver Name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("valueDriver", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Contact No *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("valueContact", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Service Dates *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("dates", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Vehicle No *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("valueVehicleNo", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.lable}>Route Manager's Name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              handleInputChange("routeManagerName", value)
            }
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
