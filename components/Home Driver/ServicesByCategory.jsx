import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ListItem from "./ListItem";

export default function ServicesByCategory({ selectedCategory }) {
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      getServiceList(selectedCategory);
    }
  }, [selectedCategory]);

  const getServiceList = async (category) => {
    setServiceList([]);

    const q = query(
      collection(db, "Services"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    // querySnapshot.forEach(doc => {
    //     setServiceList(serviceList => [...serviceList, doc.data()])
    // })

    const newServiceList = [];
    querySnapshot.forEach((doc) => {
      newServiceList.push(doc.data());
    });

    setServiceList(newServiceList);
  };
  return (
    <View>
      {/* <Category category={(value) => getServiceList(value)} /> */}
      {/* <FlatList
                data={serviceList}
                style={{ marginTop: 10 }}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <ListItem service={item} />
                )}
            /> */}

      {serviceList.length > 0 ? (
        <FlatList
          data={serviceList}
          numColumns={2}
          style={{ marginTop: 10 }}
          //horizontal={true}
          renderItem={({ item }) => <ListItem service={item} />}
        />
      ) : (
        <Text>No service availabe</Text>
      )}
    </View>
  );
}
