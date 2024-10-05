import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "./../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MenuList() {
  const { signOut } = useAuth();
  const router = useRouter();

  // State to hold search query
  const [searchQuery, setSearchQuery] = useState("");

  // Menu list items
  const menuList = [
    {
      id: 1,
      name: "Client Requests",
      icon: require("./../../assets/images/analysis.png"),
      path: "/viewrequest/[vrequest]",
    },
    {
      id: 2,
      name: "Assign Tasks",
      icon: require("./../../assets/images/qa.png"),
      path: "/tasks/add_tasks",
    },
    {
      id: 3,
      name: "Register Staff",
      icon: require("./../../assets/images/website.png"),
      path: "/register/add_staff",
    },
    {
      id: 4,
      name: "Progress",
      icon: require("./../../assets/images/tracking.png"),
      path: "/viewtasks/[vtasks]",
    },
    {
      id: 5,
      name: "View Staff",
      icon: require("./../../assets/images/growth.png"),
      path: "/viewstaff/[vstaff]",
    },
    {
      id: 6,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  // Function to handle menu click
  const onMenuClick = (item) => {
    if (item.path === "logout") {
      signOut();
      return;
    }
    router.push(item.path);
  };

  // Filtered list based on search query
  const filteredMenuList = menuList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ marginTop: 10, marginBottom: 100 }}>
      {/* Container for Category and Search Bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        {/* Category Label */}
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Category
        </Text>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#a1a9a4",
            padding: 10,
            borderRadius: 8,
            width: "65%", // Adjust this width to suit your design
          }}
        >
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            placeholder="Search by Name..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={{
              fontFamily: "outfit",
              fontSize: 16,
              marginLeft: 10,
              flex: 1,
            }}
          />
        </View>
      </View>

      {/* FlatList to display menu items */}
      <FlatList
        data={filteredMenuList} // Use filtered menu list
        numColumns={2}
        keyExtractor={(item) => item.id.toString()} // Add key extractor for performance
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 18,
              borderWidth: 1,
              padding: 10,
              gap: 5,
              flex: 1,
              margin: 10,
              borderColor: Colors.ICON_BG,
              backgroundColor: Colors.ICON_BG,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 41,
                height: 41,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 15,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
