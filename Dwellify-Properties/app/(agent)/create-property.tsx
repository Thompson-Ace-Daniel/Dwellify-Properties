// screens/PremiumCreatePropertyScreen.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInUp,
  FadeInRight,
  Layout,
} from "react-native-reanimated";
import {
  Home,
  Layers,
  Plus,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Maximize,
} from "lucide-react-native";
import { AnimatedInput } from "../components/AnimatedInput";
import { AnimatedButton } from "../components/AnimatedButton";

export default function PremiumCreatePropertyScreen() {
  const [type, setType] = useState<"apartment" | "land">("apartment");
  const [form, setForm] = useState({
    title: "",
    price: "",
    desc: "",
    address: "",
    state: "",
    city: "",
    beds: "",
    baths: "",
    size: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Listing uploaded successfully to Dwellify Marketplace!");
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
      >
        <Animated.View entering={FadeInUp.duration(400)}>
          {/* Header section */}
          <Text style={styles.title}>New Listing</Text>
          <Text style={styles.subtitle}>
            Deploy a premium asset to the active marketplace.
          </Text>

          {/* Premium Type Toggle Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, type === "apartment" && styles.activeTab]}
              onPress={() => setType("apartment")}
            >
              <Home
                size={18}
                color={type === "apartment" ? "#3B82F6" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabText,
                  type === "apartment" && styles.activeTabText,
                ]}
              >
                Apartment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, type === "land" && styles.activeTab]}
              onPress={() => setType("land")}
            >
              <Layers
                size={18}
                color={type === "land" ? "#3B82F6" : "#64748B"}
              />
              <Text
                style={[
                  styles.tabText,
                  type === "land" && styles.activeTabText,
                ]}
              >
                Land Parcel
              </Text>
            </TouchableOpacity>
          </View>

          {/* Media Grid Box */}
          <Text style={styles.sectionLabel}>Media Gallery</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
          >
            <TouchableOpacity style={styles.imagePlaceholderCard}>
              <View style={styles.iconCircle}>
                <Plus size={20} color="#3B82F6" />
              </View>
              <Text style={styles.uploadText}>Upload Images</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Core Information Section */}
          <Text style={styles.sectionLabel}>Asset Valuation & Title</Text>
          <AnimatedInput
            label="Listing Title"
            value={form.title}
            onChangeText={(t) => setForm({ ...form, title: t })}
          />
          <AnimatedInput
            label="Price (USD)"
            keyboardType="numeric"
            value={form.price}
            onChangeText={(t) => setForm({ ...form, price: t })}
          />

          {/* Dynamic Structural Switcher */}
          <Animated.View layout={Layout.springify()}>
            {type === "apartment" ? (
              <Animated.View
                entering={FadeInRight.duration(200)}
                style={styles.row}
              >
                <View style={{ flex: 1, marginRight: 12 }}>
                  <AnimatedInput
                    label="Bedrooms"
                    keyboardType="numeric"
                    value={form.beds}
                    onChangeText={(t) => setForm({ ...form, beds: t })}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AnimatedInput
                    label="Bathrooms"
                    keyboardType="numeric"
                    value={form.baths}
                    onChangeText={(t) => setForm({ ...form, baths: t })}
                  />
                </View>
              </Animated.View>
            ) : (
              <Animated.View entering={FadeInRight.duration(200)}>
                <AnimatedInput
                  label="Total Area Dimensions (e.g., 1,200 sqm)"
                  value={form.size}
                  onChangeText={(t) => setForm({ ...form, size: t })}
                />
              </Animated.View>
            )}
          </Animated.View>

          <AnimatedInput
            label="Detailed Description"
            multiline
            numberOfLines={4}
            value={form.desc}
            onChangeText={(t) => setForm({ ...form, desc: t })}
          />

          {/* Location Parameters */}
          <Text style={styles.sectionLabel}>Geographic Parameters</Text>
          <AnimatedInput
            label="Street Address"
            value={form.address}
            onChangeText={(t) => setForm({ ...form, address: t })}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <AnimatedInput
                label="City"
                value={form.city}
                onChangeText={(t) => setForm({ ...form, city: t })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AnimatedInput
                label="State"
                value={form.state}
                onChangeText={(t) => setForm({ ...form, state: t })}
              />
            </View>
          </View>

          {/* Action Trigger */}
          <View style={styles.actionSpacer}>
            <AnimatedButton
              title="Publish Premium Asset"
              loading={isSubmitting}
              onPress={handlePublish}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" }, // Premium Ice White Slate Canvas
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E293B",
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 24,
    marginTop: 4,
    fontFamily: "Inter",
  },

  // Tab Switcher Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 4,
    marginBottom: 28,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  tabText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  activeTabText: { color: "#3B82F6" },

  // Section Headers
  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 16,
    marginTop: 8,
    fontFamily: "Poppins",
    letterSpacing: 0.3,
  },

  // Media Input Container
  imageScroll: { marginBottom: 28 },
  imagePlaceholderCard: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#BFDBFE",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
    fontFamily: "Inter",
  },

  row: { flexDirection: "row", justifyContent: "space-between" },
  actionSpacer: { marginTop: 16, marginBottom: 32 },
});
