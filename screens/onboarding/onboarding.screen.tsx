import React, { useEffect, useState } from "react";
import { onBoardingSlides } from "@/configs/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Slider from "@/components/onboarding/slider";
import Slide from "@/components/onboarding/slide";
import { router } from "expo-router"; // Use `router` for programmatic navigation
import { useAuth } from "@clerk/clerk-expo";

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const { isSignedIn } = useAuth();

  const prev = onBoardingSlides[index - 1];
  const next = onBoardingSlides[index + 1];

  useEffect(() => {
    // Redirect to the tabs screen if the user is signed in
    if (isSignedIn) {
      //@ts-ignore
      router.replace("/(tabs)");
    }
  }, [isSignedIn]); // Run the effect whenever `isSignedIn` changes

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={
          prev && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={prev}
              totalSlides={onBoardingSlides.length}
            />
          )
        }
        next={
          next && (
            <Slide
              index={index}
              setIndex={setIndex}
              slide={next}
              totalSlides={onBoardingSlides.length}
            />
          )
        }
      >
        <Slide
          slide={onBoardingSlides[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={onBoardingSlides.length}
        />
      </Slider>
    </GestureHandlerRootView>
  );
}