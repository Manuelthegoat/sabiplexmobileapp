import { View, Text } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider } from "@/context/theme.context";
import {
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";

// Prevent the splash screen from auto-hiding before asset loading is complete.
//  SplashScreen.preventAutoHideAsync();

export default function _layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
   
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(routes)/onboarding/index" />
          </Stack>
        </ThemeProvider>
     
    </ClerkProvider>
  );
}
