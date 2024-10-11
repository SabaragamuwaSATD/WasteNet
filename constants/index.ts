import { ImageSourcePropType } from "react-native";
import dotenv from "dotenv";

export type ImageSliderType = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export const rapidApiKey = process.env.RAPID_API_KEY;

export const sliderImages: ImageSliderType[] = [
  {
    title: "Collecting",
    image: require("../assets/images/gb2.jpg"),
    description:
      "Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot.",
  },
  {
    title: "Recycling",
    image: require("../assets/images/gb1.jpg"),
    description:
      "Recycling is the process of converting waste materials into new materials and objects.",
  },
  {
    title: "Environment Frindly",
    image: require("../assets/images/gb3.jpg"),
    description:
      "Environmentally friendly or environment-friendly, are sustainability and marketing terms referring to goods and services, laws, guidelines and policies that claim reduced, minimal, or no harm upon ecosystems or the environment.",
  },
  {
    title: "Food Waste",
    image: require("../assets/images/gb4.jpg"),
    description:
      "Food waste or food loss is food that is not eaten. The causes of food waste or loss are numerous and occur at the stages of producing, processing, retailing and consuming.",
  },
  {
    title: "Waste Management",
    image: require("../assets/images/gb4.jpg"),
    description:
      "Waste management are the activities and actions required to manage waste from its inception to its final disposal.",
  },
];
