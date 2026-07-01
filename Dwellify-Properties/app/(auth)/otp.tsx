import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function Otp() {
  const { phoneNumber, role } = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const intervalId = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setCode(["", "", "", "", "", ""]);
    inputs.current[0]?.focus();
  };

  const handleChange = (text: string, index: number) => {
    const cleanText = text.slice(-1);
    if (!/^\d*$/.test(cleanText)) return;

    const newCode = [...code];
    newCode[index] = cleanText;
    setCode(newCode);

    if (cleanText && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputs.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handleVerify = () => {
    if (!isValid || isSubmitting) return;
      router.navigate({
        pathname: "/(auth)/biodata",
        params: { role: role },
      });
  };

  const finalCode = code.join("");
  const isValid = finalCode.length === 6;

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
        <Text className="text-3xl font-bold text-slate-800 font-['Poppins'] text-center tracking-tight">
          <Text className="text-blue-500">Verify</Text> number
        </Text>
        <Text className="text-slate-400 font-['Inter'] text-sm mt-2 text-center">
          Enter the 6 digit code safely routed to{" "}
          <Text className="text-slate-700 font-semibold">
            {phoneNumber}
          </Text>
        </Text>
      </View>

      <View className="flex-row justify-between mt-10 mb-6 px-6">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={index === 0}
            selectTextOnFocus
            style={{ textAlign: "center" }}
            className={`w-12 h-14 border text-xl font-bold rounded-2xl ${
              focusedIndex === index
                ? "border-blue-500 bg-blue-50/20 text-blue-600"
                : digit
                  ? "border-slate-400 bg-slate-50 text-slate-800"
                  : "border-slate-200 text-slate-400"
            }`}
          />
        ))}
      </View>
      {/* 4. Resend Timer Component Layout Block */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
          marginBottom: 32,
        }}
      >
        {timer > 0 ? (
          <Text style={{ color: "#64748B", fontSize: 14 }}>
            Resend code in{" "}
            <Text style={{ color: "#3B82F6", fontWeight: "700" }}>
              {timer}s
            </Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
            <Text
              style={{
                color: "#3B82F6",
                fontSize: 14,
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              Resend verification code
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="px-6 mt-auto mb-6">
        <Pressable
          disabled={!isValid}
          onPress={handleVerify}
          className={`h-14 rounded-2xl justify-center items-center ${isValid ? "bg-blue-500" : "bg-blue-500/40"}`}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-base font-semibold font-['Poppins']">
              Verify & Proceed
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
