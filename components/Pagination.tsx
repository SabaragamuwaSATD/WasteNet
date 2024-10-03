import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ImageSliderType } from "@/constants";

type Props = {
  items: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("window");

const Pagination = ({ items = [], paginationIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        const pgAnimationStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );

          return {
            width: dotWidth,
          };
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              // pgAnimationStyle,
              { backgroundColor: paginationIndex === index ? "#222" : "#aaa" },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  dot: {
    backgroundColor: "#aaa",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});
