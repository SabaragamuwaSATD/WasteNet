import { View, Text } from "react-native";
import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useUser } from "@clerk/clerk-react";

export default function Header() {
  const user = useUser();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
          }}
        >
          Welcome
        </Text>

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {user.fullname}
        </Text>
      </View>

      <EvilIcons name="user" size={50} color="black" />
    </View>
  );
}
