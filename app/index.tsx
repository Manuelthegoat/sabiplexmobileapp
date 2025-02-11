import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router"; // Use `router` for programmatic navigation
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);

    // Ensure Clerk is fully loaded before proceeding
    if (!isLoaded) {
      console.log("Clerk is not loaded yet.");
      return;
    }

    // If Clerk is loaded, check authentication state
    if (isSignedIn) {
      console.log("User is signed in. Redirecting to /(tabs)...");
      //@ts-ignore
      router.replace("/(tabs)"); // Redirect to tabs screen
    } else {
      console.log("User is not signed in. Redirecting to /(routes)/onboarding...");
      router.replace("/(routes)/onboarding"); // Redirect to onboarding screen
    }

    // Update loading state
    setLoading(false);
  }, [isLoaded, isSignedIn]);

  // Show a loading indicator while waiting for Clerk to initialize
  if (!isLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading authentication state...</Text>
      </View>
    );
  }

  // Return an empty fragment (or a loading spinner) while waiting for the redirect
  return <></>;
}