import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";
import React from "react";
import { ImageSliderType } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("window");

const SliderItem = ({ item, index, scrollX }: Props) => {
  const reAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.1, 0, width * 0.1],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, reAnimatedStyle]}>
      <Image source={item.image} style={styles.image} />
      <LinearGradient
        colors={["transparent", "#4c4c4e"]}
        style={styles.background}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="heart-outline" size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    marginHorizontal: 0,
  },
  background: {
    position: "absolute",
    width: "80%",
    height: "80%",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  description: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1.2,
  },
  icon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  image: {
    width: "86%",
    height: 270,
    borderRadius: 20,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
