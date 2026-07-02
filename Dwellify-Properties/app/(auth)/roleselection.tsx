import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { User, ShieldCheck } from "lucide-react-native";
import { AnimatedButton } from "../components/AnimatedButton";
import { SafeAreaView } from "react-native-safe-area-context";
type UserRole = "client" | "agent" | null;

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleProceed = () => {
    if (!selectedRole) return;
    router.push({
      pathname: "/(auth)/phone",
      params: { role: selectedRole },
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 px-6 mt-20">
        <View className="mb-10">
          <Text className="text-4xl mb-3 text-center font-bold text-slate-800 font-['Poppins'] tracking-tight">
            How will you <Text className="text-blue-500">use</Text> Dwellify?
          </Text>
          <Text className="text-slate-400 font-['Inter'] text-xl text-center mt-2 leading-5">
            Choose the option that best describes you. You can switch anytime in
            settings.
          </Text>
        </View>

        <View className="space-y-4 mb-10">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedRole("client")}
            className={`p-5 rounded-2xl border-2 flex-row items-center mb-4 ${
              selectedRole === "client"
                ? "border-blue-500 bg-blue-50/10"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <View
              className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                selectedRole === "client" ? "bg-blue-500" : "bg-slate-200"
              }`}
            >
              <User
                size={24}
                color={selectedRole === "client" ? "#FFFFFF" : "#64748B"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-slate-800 font-['Poppins']">
                I&apos;m a Client
              </Text>
              <Text className="text-sm text-slate-400 font-['Inter'] mt-0.5">
                I&apos;m looking to rent, buy, or browse properties
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedRole("agent")}
            className={`p-5 rounded-2xl border-2 flex-row items-center mb-4 ${
              selectedRole === "agent"
                ? "border-blue-500 bg-blue-50/10"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <View
              className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                selectedRole === "agent" ? "bg-blue-500" : "bg-slate-200"
              }`}
            >
              <ShieldCheck
                size={24}
                color={selectedRole === "agent" ? "#FFFFFF" : "#64748B"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-slate-800 font-['Poppins']">
                I&apos;m an Agent
              </Text>
              <Text className="text-sm text-slate-400 font-['Inter'] mt-0.5">
                I want to list properties and find clients.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <AnimatedButton
          title="Continue Setup"
          disabled={!selectedRole}
          onPress={handleProceed}
        />
      </View>
    </SafeAreaView>
  );
}
