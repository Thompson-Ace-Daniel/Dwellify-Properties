// components/AnimatedButton.tsx
import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "success" | "danger";
  loading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return { bg: "#10B981", text: "#FFFFFF" };
      case "danger":
        return { bg: "#EF4444", text: "#FFFFFF" };
      default:
        return { bg: "#2563EB", text: "#FFFFFF" };
    }
  };

  const colors = getVariantStyles();

  return (
    <AnimatedPressable
      style={[styles.button, { backgroundColor: colors.bg }, animatedStyle]}
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    marginVertical: 10,
  },
  text: { fontSize: 16, fontWeight: "600", fontFamily: "Poppins" },
});
