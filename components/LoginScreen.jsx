import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const logoImage = require("../assets/images/d.png");

  return (
    <View style={{ backgroundColor: "#BDD695" }}>
      <Image
        source={logoImage}
        style={{
          width: "50%", // Adjust the width as needed
          height: 100, // Adjust the height as needed
          resizeMode: "contain",
          margin: 10,
        }}
      />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 15,
          backgroundColor: "#BDD695",
        }}
      >
        <Image
          source={require("./../assets/images/login2.jpeg")}
          style={{
            width: 342,
            height: 228,
            borderRadius: 20,
            borderColor: "#000",
          }}
        />
      </View>

      <View style={{ backgroundColor: "#BDD695", padding: 20, marginTop: 0 }}>
        <Text
          style={{
            fontSize: 32,
            fontFamily: "outfit",
            textAlign: "center",
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            fontSize: 64,
            fontFamily: "outfit-bold",
            textAlign: "center",
            color: "#2f9a5c",
          }}
        >
          WasteNet!
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your service and get the work done
        </Text>
      </View>
      <View style={{ backgroundColor: "#BDD695" }}>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.BTN,
    padding: 16,
    width: "90%",
    alingnSelf: "center",
    borderRadius: 8,
    marginTop: 10,
    margin: 18,
    marginBottom: 2000,
  },
});
