import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { AnimatedButton } from "../components/AnimatedButton";
import { AnimatedInput } from "../components/AnimatedInput";

export default function Phone() {
  const { role } = useLocalSearchParams();
  const [phone, setPhone] = useState("");
  
  const cleanPhone = phone.replace(/\D/g, "");
  const isValid = cleanPhone.length >= 10 && cleanPhone.length <= 11;

  const handleNext = () => {
    if (!isValid) return;
    router.push({
      pathname: "/(auth)/otp",
      params: { phoneNumber: cleanPhone, role: role },
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="mt-4 px-6 py-2">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100"
        >
          <ChevronLeft size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <View className="px-6 mt-8">
        <Text className="text-3xl font-bold text-slate-800 font-['Poppins'] tracking-tight">
          Let's get you <Text className="text-blue-500">in</Text>.
        </Text>
        <Text className="text-slate-400 font-['Inter'] text-sm mt-2 leading-6">
          Enter your phone number to receive a secure login verification code.
        </Text>
      </View>

      <View className="px-6 mt-12 flex-row items-center">
        <View className="h-13.5 w-18.5 rounded-2xl bg-slate-50 border border-slate-200 justify-center items-center mb-5 mr-3">
          <Text className="text-base font-bold text-slate-700 font-['Poppins']">🇳🇬 +234</Text>
        </View>
        <View className="flex-1">
          <AnimatedInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={11}
            autoFocus
            placeholder="800 000 0000"
          />
        </View>
      </View>

      <View className="px-6 mt-auto mb-6">
        <AnimatedButton title="Send Verification Code" disabled={!isValid} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}