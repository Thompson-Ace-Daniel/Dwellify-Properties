import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Added this global handler import
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* The GestureHandlerRootView must wrap the navigator stack 
        with flex-1 to map gesture tracking points to the edge of the device display screen.
      */}
      <GestureHandlerRootView className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "Modal",
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}