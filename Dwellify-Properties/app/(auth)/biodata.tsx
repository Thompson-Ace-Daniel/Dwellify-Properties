// app/(auth)/premium-biodata.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight } from "react-native-reanimated";
import { CheckCircle, User, Mail, Briefcase, Award } from "lucide-react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { AnimatedButton } from "../components/AnimatedButton";

export default function PremiumBiodataScreen() {
  const { role } = useLocalSearchParams();
  const isAgent = role === "agent";

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [licenseNo, setLicenseNo] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation
  const isEmailValid = (emailStr: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  const isFormValid = isAgent
    ? fullName.trim().length > 2 &&
      isEmailValid(email) &&
      companyName.trim().length > 2
    : fullName.trim().length > 2 && isEmailValid(email);

  const handleSubmit = () => {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);

    // Simulate saving profile data to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <SafeAreaView style={{ backgroundColor: "#F8FAFC", flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 justify-center items-center px-6">
          <Animated.View
            entering={FadeInRight.springify()}
            className="items-center w-full"
          >
            <View className="mb-8 w-32 h-32 bg-blue-50 rounded-full justify-center items-center">
              <View className="w-24 h-24 bg-blue-100 rounded-full justify-center items-center">
                <CheckCircle size={64} color="#3B82F6" strokeWidth={1.5} />
              </View>
            </View>
            <Text className="text-2xl font-bold text-slate-800 mb-3 font-['Poppins']">
              Profile Created!
            </Text>
            <Text className="text-[15px] text-center text-slate-500 mb-10 leading-6 font-['Inter']">
              Welcome to Dwellify. Your premium {isAgent ? "Agent" : "Client"}{" "}
              account is now completely set up.
            </Text>
            <View className="w-full">
              <AnimatedButton
                title="Enter Dashboard"
                onPress={() => {
                  router.dismissAll();
                  router.replace(
                    isAgent ? "/(agent)/create-property" : "/(tabs)/explore",
                  );
                }}
              />
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-center py-8">
          {/* Header Typography */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-slate-800 font-['Poppins'] tracking-tight">
              Complete your <Text className="text-blue-500">Profile</Text>
            </Text>
            <Text className="text-slate-400 font-['Inter'] text-sm mt-2 leading-5">
              {isAgent
                ? "Provide your professional credentials to start listing properties."
                : "Fill in your basic information to begin your home search."}
            </Text>
          </View>

          {/* Form Fields Block */}
          <View className="space-y-5">
            {/* FULL NAME */}
            <View className="mb-4">
              <Text className="text-slate-600 font-semibold mb-2 text-sm font-['Inter']">
                Full Name
              </Text>
              <View className="flex-row items-center border border-slate-200 rounded-2xl bg-slate-50/50 px-4 h-14 focus-within:border-blue-500">
                <User size={20} color="#94A3B8" className="mr-3" />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  placeholderTextColor="#94A3B8"
                  className="flex-1 text-slate-800 text-base font-['Inter'] ml-2"
                />
              </View>
            </View>

            {/* EMAIL ADDRESS */}
            <View className="mb-4">
              <Text className="text-slate-600 font-semibold mb-2 text-sm font-['Inter']">
                Email Address
              </Text>
              <View className="flex-row items-center border border-slate-200 rounded-2xl bg-slate-50/50 px-4 h-14">
                <Mail size={20} color="#94A3B8" className="mr-3" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="johndoe@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 text-slate-800 text-base font-['Inter'] ml-2"
                />
              </View>
            </View>

            {/* AGENT ONLY: COMPANY NAME */}
            {isAgent && (
              <Animated.View
                entering={FadeInRight.duration(200)}
                className="mb-4"
              >
                <Text className="text-slate-600 font-semibold mb-2 text-sm font-['Inter']">
                  Agency / Business Name
                </Text>
                <View className="flex-row items-center border border-slate-200 rounded-2xl bg-slate-50/50 px-4 h-14">
                  <Briefcase size={20} color="#94A3B8" className="mr-3" />
                  <TextInput
                    value={companyName}
                    onChangeText={setCompanyName}
                    placeholder="Dwellify Real Estate Ltd"
                    placeholderTextColor="#94A3B8"
                    className="flex-1 text-slate-800 text-base font-['Inter'] ml-2"
                  />
                </View>
              </Animated.View>
            )}

            {/* AGENT ONLY: LICENSE NUMBER (OPTIONAL) */}
            {isAgent && (
              <Animated.View
                entering={FadeInRight.duration(300)}
                className="mb-4"
              >
                <Text className="text-slate-600 font-semibold mb-2 text-sm font-['Inter']">
                  License / Registration No.{" "}
                  <Text className="text-slate-400 font-normal">(Optional)</Text>
                </Text>
                <View className="flex-row items-center border border-slate-200 rounded-2xl bg-slate-50/50 px-4 h-14">
                  <Award size={20} color="#94A3B8" className="mr-3" />
                  <TextInput
                    value={licenseNo}
                    onChangeText={setLicenseNo}
                    placeholder="RE-123456"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="characters"
                    className="flex-1 text-slate-800 text-base font-['Inter'] ml-2"
                  />
                </View>
              </Animated.View>
            )}
          </View>

          {/* Action Footer Button */}
          <View className="mt-10">
            <Pressable
              disabled={!isFormValid || isSubmitting}
              onPress={handleSubmit}
              className={`h-14 rounded-2xl justify-center items-center ${
                isFormValid && !isSubmitting ? "bg-blue-500" : "bg-blue-500/40"
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold font-['Poppins']">
                  Save & Finish
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
