import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
// import UpdateRoute from "../../app/Driver/forms/UpdateRoute";

const UpdateButton = ({ service }) => {
  const router = useRouter();

  const handlePress = () => {
    if (service?.category === "Trucks") {
      router.push(`/Driver/forms/UpdateTruck?id=${service.id}`);
    } else if (service?.category === "Routes") {
      router.push(`/Driver/forms/UpdateRoute?id=${service.id}`);
    } else if (service?.category === "Tasks") {
      router.push(`/Driver/forms/UpdateTask?id=${service.id}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          padding: 12,
          backgroundColor: Colors.LIGHT_PRIMARY,
          borderRadius: 50,
          marginTop: 10,
          width: "70%",
        }}
        onPress={handlePress}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 15,
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          {service?.category === "Trucks"
            ? "Update Truck"
            : service?.category === "Routes"
            ? "Update Route"
            : service?.category === "Tasks"
            ? "Update Task"
            : "Update"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateButton;
