// screens/BiodataScreen.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
// import { User, Briefcase, MapPin, Camera, CheckCircle2 } from 'lucide-react-native';
import { AnimatedInput } from "../components/AnimatedInput";
import { AnimatedButton } from "../components/AnimatedButton";

export default function BiodataScreen({ route }: { route: any }) {
  const role = route?.params?.role || "agent"; // Dynamically change contextual strings based on Auth role
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    company: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <Animated.View entering={FadeInUp.springify()}>
          {/* <CheckCircle2 size={100} color="#10B981" /> */}
        </Animated.View>
        <Text style={styles.successTitle}>Profile Setup Complete!</Text>
        <Text style={styles.successSub}>
          Your premium setup is ready on Dwellify.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Animated.View
        entering={FadeInUp.delay(100).duration(500)}
        layout={Layout.springify()}
      >
        <Text style={styles.headerTitle}>Setup your profile</Text>
        <Text style={styles.subtext}>
          Let's configure your Dwellify digital {role} card.
        </Text>

        {/* Profile Pic Upload Frame */}
        <View style={styles.avatarWrapper}>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              {/* <User size={40} color="#9CA3AF" /> */}
              <View style={styles.cameraBadge}>
                {/* <Camera size={14} color="#FFF" /> */}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Floating Forms Matrix */}
        <AnimatedInput
          label="Full Name"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
        />
        <AnimatedInput
          label="Phone Number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
        />
        <AnimatedInput
          label="Location (City, Country)"
          value={form.location}
          onChangeText={(t) => setForm({ ...form, location: t })}
        />

        {role === "agent" && (
          <AnimatedInput
            label="Agency/Company Name"
            value={form.company}
            onChangeText={(t) => setForm({ ...form, company: t })}
          />
        )}

        <AnimatedInput
          label="Bio / About Me"
          multiline
          numberOfLines={3}
          value={form.bio}
          onChangeText={(t) => setForm({ ...form, bio: t })}
        />

        <AnimatedButton
          title="Save Profile Details"
          variant="primary"
          onPress={handleSave}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "Poppins",
    marginBottom: 6,
  },
  subtext: { fontSize: 15, color: "#6B7280", marginBottom: 32 },
  avatarWrapper: { alignItems: "center", marginBottom: 32 },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E5E7EB",
    padding: 4,
  },
  avatarPlaceholder: {
    flex: 1,
    borderRadius: 55,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#2563EB",
    padding: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 24,
    fontFamily: "Poppins",
  },
  successSub: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
