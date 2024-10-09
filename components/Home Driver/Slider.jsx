import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

export default function Slider() {
  const sliderList = [
    { id: 1, image: require("../../assets/images/slider1 copy.jpeg") },
    { id: 2, image: require("../../assets/images/slider2.jpeg") },
    { id: 3, image: require("../../assets/images/slider3.jpeg") },
  ];
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <FlatList
        data={sliderList}
        horizontal={true}
        renderItem={({ item }) => (
          <View>
            <Image
              source={item.image}
              style={{
                width: Dimensions.get("window").width * 0.9,
                height: 160,
                borderRadius: 15,
                marginRight: 15,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
