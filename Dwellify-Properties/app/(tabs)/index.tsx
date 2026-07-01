import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="" style={styles.container}>
      <Text className="text-white text-center text-xl">
        Hi, welcome to Dwellify-Properties
      </Text>
      <Pressable onPress={() => router.push("/(auth)/onboarding1")} className="border w-xs mx-auto py-4 rounded-md bg-blue-500">
        <Text className="text-white text-center">Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
});
