import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useFonts({
    outfit: require("../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="login/index" options={{ headerShown: false }} /> */}
      </Stack>
    </GestureHandlerRootView>
  );
}
