import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/FirebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Trucks");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "GarbageCategory"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Category
      </Text>

      <FlatList
        data={categoryList}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
            style={{
              flex: 1,
            }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item.name &&
                  styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>

            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DGREEN,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.DGREEN,
    margin: 5,
  },

  selectedCategoryContainer: {
    backgroundColor: "#e1cc35",
    borderColor: "#e1cc35",
  },
});
