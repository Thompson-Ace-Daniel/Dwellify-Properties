import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { User, ShieldCheck } from "lucide-react-native";
import { AnimatedButton } from "../components/AnimatedButton";

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
      <View className="flex-1 px-6 justify-center">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-slate-800 font-['Poppins'] tracking-tight">
            Join Dwellify as a...
          </Text>
          <Text className="text-slate-400 font-['Inter'] text-sm mt-2 leading-5">
            Choose your account profile to customize your properties dashboard.
          </Text>
        </View>

        <View className="space-y-4 mb-10">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedRole("client")}
            className={`p-5 rounded-2xl border-2 flex-row items-center mb-4 ${
              selectedRole === "client" ? "border-blue-500 bg-blue-50/10" : "border-slate-100 bg-slate-50"
            }`}
          >
            <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
              selectedRole === "client" ? "bg-blue-500" : "bg-slate-200"
            }`}>
              <User size={24} color={selectedRole === "client" ? "#FFFFFF" : "#64748B"} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-slate-800 font-['Poppins']">Property Seeker</Text>
              <Text className="text-xs text-slate-400 font-['Inter'] mt-0.5">I want to buy or rent apartments.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedRole("agent")}
            className={`p-5 rounded-2xl border-2 flex-row items-center mb-4 ${
              selectedRole === "agent" ? "border-blue-500 bg-blue-50/10" : "border-slate-100 bg-slate-50"
            }`}
          >
            <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
              selectedRole === "agent" ? "bg-blue-500" : "bg-slate-200"
            }`}>
              <ShieldCheck size={24} color={selectedRole === "agent" ? "#FFFFFF" : "#64748B"} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-slate-800 font-['Poppins']">Verified Agent</Text>
              <Text className="text-xs text-slate-400 font-['Inter'] mt-0.5">I want to list properties and find clients.</Text>
            </View>
          </TouchableOpacity>
        </View>

        <AnimatedButton title="Continue Setup" disabled={!selectedRole} onPress={handleProceed} />
      </View>
    </SafeAreaView>
  );
}