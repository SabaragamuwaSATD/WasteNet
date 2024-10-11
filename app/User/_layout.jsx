import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.BTN,
      }}
    >
      <Tabs.Screen
        name="UserHome"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sendRequest"
        options={{
          tabBarLabel: "Send",
          tabBarIcon: ({ color }) => (
            <Ionicons name="send-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="userPayments"
        options={{
          tabBarLabel: "Payments",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="userRequests"
        options={{
          tabBarLabel: "Requests",
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
