import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

export default function Slider() {
  const sliderList = [
    { id: 1, image: require("../../assets/images/slider1 copy.jpeg") },
    { id: 2, image: require("../../assets/images/slider2.jpeg") },
    { id: 3, image: require("../../assets/images/slider3.jpeg") },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <FlatList
        ref={flatListRef}
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
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
}
