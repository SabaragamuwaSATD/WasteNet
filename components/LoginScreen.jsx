import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const router = useRouter();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.error("Email sign-in failed: No session created");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const onEmailSignInPress = async () => {
    try {
      const { createdSessionId, setActive } = await signIn.create({
        identifier: email,
        password,
      });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.error("Email sign-in failed: No session created");
      }
    } catch (err) {
      console.error("Email sign-in error", err);
      if (err.response) {
        console.error("Error details:", err.response.data);
      } else {
        console.error("Error message:", err.message);
      }
    }
  };

  const logoImage = require("../assets/images/d.png");

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#BDD695" }}>
        <Image
          source={logoImage}
          style={{
            width: "50%",
            height: 100,
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
        {/* <View style={{ backgroundColor: "#BDD695" }}> */}
        <View style={{ backgroundColor: "#BDD695", padding: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.btn} onPress={onEmailSignInPress}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 20,
              }}
            >
              Sign In with Email
            </Text>
          </TouchableOpacity>
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
    </ScrollView>
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
