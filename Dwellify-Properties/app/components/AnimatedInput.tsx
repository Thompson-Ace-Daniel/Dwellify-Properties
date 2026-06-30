// components/AnimatedInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  error,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(value ? 1 : 0);
  const shakeAnim = useSharedValue(0);

  React.useEffect(() => {
    focusAnim.value = withTiming(isFocused || value ? 1 : 0, { duration: 200 });
  }, [isFocused, value]);

  React.useEffect(() => {
    if (error) {
      shakeAnim.value = withSequence(
        withTiming(-6, { duration: 40 }),
        withTiming(6, { duration: 40 }),
        withTiming(-3, { duration: 40 }),
        withTiming(3, { duration: 40 }),
        withTiming(0, { duration: 40 }),
      );
    }
  }, [error]);

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(focusAnim.value, [0, 1], [14, -10]) },
        { scale: interpolate(focusAnim.value, [0, 1], [1, 0.85]) },
      ],
      backgroundColor: focusAnim.value > 0.5 ? "#FFFFFF" : "transparent",
      paddingHorizontal: focusAnim.value > 0.5 ? 4 : 0,
    };
  });

  const inputContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: error ? "#EF4444" : isFocused ? "#2563EB" : "#E5E7EB",
      borderWidth: isFocused || error ? 1.5 : 1,
      transform: [{ translateX: shakeAnim.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          labelStyle,
          isFocused && styles.focusedLabel,
          error && styles.errorLabel,
        ]}
      >
        {label}
      </Animated.Text>
      <Animated.View style={[styles.inputWrapper, inputContainerStyle]}>
        <TextInput
          {...props}
          value={value}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderClassName="text-transparent"
        />
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20, position: "relative" },
  label: {
    position: "absolute",
    left: 16,
    color: "#9CA3AF",
    zIndex: 1,
    fontFamily: "Inter",
  },
  focusedLabel: { color: "#2563EB", fontWeight: "600" },
  errorLabel: { color: "#EF4444" },
  inputWrapper: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    color: "#1F2937",
    fontSize: 16,
    fontFamily: "Inter",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: "Inter",
  },
});
