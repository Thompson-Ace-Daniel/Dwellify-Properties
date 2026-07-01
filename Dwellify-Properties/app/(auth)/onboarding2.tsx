import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { CheckCircle } from "lucide-react-native";
import { router, Stack } from "expo-router";
import { AnimatedButton } from "../components/AnimatedButton";

export default function PremiumBiodataScreen() {
  const [step, setStep] = useState(1);
  const progress = useSharedValue(0.33);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      progress.value = withSpring((step + 1) * 0.33);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      progress.value = withSpring((step - 1) * 0.33);
    }
  };

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    // Hardcoded safety container color to force visibility layout matching
    <SafeAreaView style={{ backgroundColor: "#F8FAFC", flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Top Header Indicators */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View className="w-10">
          {step > 1 && step < 4 && (
            <TouchableOpacity onPress={prevStep}>
              <Text className="text-sm font-semibold text-slate-500">Back</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-1 h-1.5 bg-slate-200 rounded-full mx-3">
          <Animated.View
            style={progressBarStyle}
            className="h-full bg-blue-500 rounded-full"
          />
        </View>
        <Text className="text-sm font-semibold text-slate-500 w-10 text-right">
          {step <= 3 ? `${step}/3` : ""}
        </Text>
      </View>

      {/* Core Component Screen Elements */}
      <View className="flex-1 px-6 justify-center items-center">
        {step === 1 && (
          <Animated.View
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(250)}
            className="w-full items-center"
          >
            <View className="w-64 h-52 mb-6 rounded-2xl overflow-hidden bg-slate-200">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-2xl font-bold text-center text-slate-900 mb-3">
              Find your <Text className="text-blue-500">perfect home,</Text>{" "}
              anywhere.
            </Text>
            <Text className="text-sm text-center text-slate-500 px-4 mb-8">
              Browse thousands of apartments and land curated just for you
              across Nigeria.
            </Text>
            <View className="w-full">
              <AnimatedButton title="Continue" onPress={nextStep} />
            </View>
          </Animated.View>
        )}

        {step === 2 && (
          <Animated.View
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(250)}
            className="w-full items-center"
          >
            <View className="w-64 h-52 mb-6 rounded-2xl overflow-hidden bg-slate-200">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-2xl font-bold text-center text-slate-900 mb-3">
              Connect with <Text className="text-blue-500">trusted</Text>{" "}
              agents.
            </Text>
            <Text className="text-sm text-center text-slate-500 px-4 mb-8">
              Talk directly with verified property agents and owners near you,
              no middlemen.
            </Text>
            <View className="w-full">
              <AnimatedButton title="Continue" onPress={nextStep} />
            </View>
          </Animated.View>
        )}

        {step === 3 && (
          <Animated.View
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(250)}
            className="w-full items-center"
          >
            <View className="w-64 h-52 mb-6 rounded-2xl overflow-hidden bg-slate-200">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-2xl font-bold text-center text-slate-900 mb-3">
              Secure your <Text className="text-blue-500">dream</Text> property.
            </Text>
            <Text className="text-sm text-center text-slate-500 px-4 mb-8">
              Complete your transactions safely and move into your new space
              with confidence.
            </Text>
            <View className="w-full">
              <AnimatedButton
                title="Get Started"
                variant="primary"
                onPress={() => router.push("/(auth)/phone")}
              />
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
