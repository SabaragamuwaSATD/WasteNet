import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
  } from "react-native";
  import React, { useState } from "react";
  import { Colors } from "../../constants/Colors";
  import { useRouter } from "expo-router";
  import { useAuth } from "@clerk/clerk-expo";
  import Ionicons from "@expo/vector-icons/Ionicons";
  
  // Get the screen width
  const { width } = Dimensions.get("window");
  
  export default function MenuList2() {
    const { signOut } = useAuth();
    const router = useRouter();
  
    // State to hold search query
    const [searchQuery, setSearchQuery] = useState("");
  
    // Menu list items
    const menuList = [
      {
        id: 1,
        name: "User Home",
        icon: require("./../../assets/images/analysis.png"),
        path: "../User/UserHome",
      },
      {
        id: 2,
        name: "Assign Tasks",
        icon: require("./../../assets/images/qa.png"),
        path: "/tasks/add_tasks",
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
      <View style={{ flex: 1, padding: 10, backgroundColor: Colors.BACKGROUND }}>
        {/* Container for Category and Search Bar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {/* Category Label */}
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 22,
            }}
          >
            Category
          </Text>
  
          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#d4e3b5",
              padding: 10,
              borderRadius: 8,
              width: "65%",
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
          numColumns={2} // Two columns for the layout
          keyExtractor={(item) => item.id.toString()} // Add key extractor for performance
          contentContainerStyle={{ paddingBottom: 50 }} // Space at bottom
          columnWrapperStyle={{ justifyContent: "space-between" }} // Spread items evenly
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onMenuClick(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center", // Center content
                borderRadius: (width * 0.4) / 2, // Ensures a circular shape
                width: width * 0.4, // 40% of screen width for circle size
                height: width * 0.4, // Equal width and height for circle
                padding: 10,
                marginBottom: 20, // Space between rows
                backgroundColor: Colors.ICON_BG,
                borderWidth: 1,
                borderColor: Colors.ICON_BG,
              }}
            >
              <Image
                source={item.icon}
                style={{
                  width: 60, // Adjust the icon size
                  height: 60, // Adjust the icon size
                }}
              />
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 15,
                  marginTop: 10, // Space between icon and text
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false} // Disable vertical scrollbar
        />
      </View>
    );
  }
  