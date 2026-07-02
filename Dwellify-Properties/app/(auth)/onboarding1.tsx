import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen1() {
  useEffect(() => {
    // Keeps side-effects strictly confined to the post-mount cycle
    const timer = setTimeout(() => {
      router.push("/(auth)/onboarding2");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return React.createElement(
    SafeAreaView,
    { style: { backgroundColor: "#1583EB", flex: 1 } },
    React.createElement(Stack.Screen, { options: { headerShown: false } }),
    React.createElement(
      View,
      { className: "flex-1 justify-center items-center px-6" },
      React.createElement(
        View,
        { className: "w-20 h-20 bg-white/10 rounded-3xl justify-center items-center mb-6 border border-white/20 shadow-xl" },
        React.createElement(
          View,
          { className: "w-10 h-10 bg-white rounded-2xl rotate-45 justify-center items-center" },
          React.createElement(View, { className: "w-4 h-4 bg-blue-500 rounded-md -rotate-45" })
        )
      ),
      React.createElement(
        Text,
        { className: "text-white text-center text-4xl font-extrabold tracking-tight font-['Poppins']" },
        "Dwellify"
      ),
      React.createElement(
        Text,
        { className: "text-blue-100 text-center text-xs font-semibold tracking-[0.2em] uppercase mt-1.5 font-['Inter']" },
        "Properties"
      )
    )
  );
}