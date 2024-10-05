import { useRouter } from "expo-router";
import UserIntro from "../../components/Home/UserIntro";
import MenuList from "../../components/Home/MenuList";
import { Image, View } from "react-native";

export default function StaffDashboard() {
  const router = useRouter();
  const logoImage = require("../../assets/images/d.png");

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#e6efc9",
        flex: 1,
      }}
    >
      {/* Logo */}

      <Image
        source={logoImage}
        style={{
          width: "50%", // Adjust the width as needed
          height: 100, // Adjust the height as needed
          resizeMode: "contain",
        }}
      />

      {/* User Info */}
      <UserIntro />

      {/* Menu List */}
      <MenuList />
    </View>
  );
}
