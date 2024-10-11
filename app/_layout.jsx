import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import LoginScreen from "./../components/LoginScreen";
// import home from "../app/(tab)/home";
import * as SecureStore from "expo-secure-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import home from "../app/(tab)/home";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  async saveToken(key, vlaue) {
    try {
      return SecureStore.setItemAsync(key, vlaue);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <SignedIn>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* <Stack.Screen name="(tab)" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="Tabs" component={TabLayout} /> */}
          </Stack>
        </SignedIn>

        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
