// screens/CreatePropertyScreen.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInRight,
  Layout,
} from "react-native-reanimated";
// import { Home, Layers, Plus, DollarSign } from 'lucide-react-native';
import { AnimatedInput } from "../components/AnimatedInput";
import { AnimatedButton } from "../components/AnimatedButton";

const { width } = Dimensions.get("window");

export default function CreatePropertyScreen() {
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Animated.View entering={FadeInUp.duration(400)}>
        <Text style={styles.title}>List Property</Text>
        <Text style={styles.subtitle}>
          Upload premium listings directly to the active market.
        </Text>

        {/* Dynamic Premium Type Picker */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, type === "apartment" && styles.activeTab]}
            onPress={() => setType("apartment")}
          >
            {/* <Home size={20} color={type === 'apartment' ? '#2563EB' : '#6B7280'} /> */}
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
            {/* <Layers size={20} color={type === 'land' ? '#2563EB' : '#6B7280'} /> */}
            <Text
              style={[styles.tabText, type === "land" && styles.activeTabText]}
            >
              Land Unit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Slots Matrix */}
        <Text style={styles.sectionLabel}>Media Uploads</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          <TouchableOpacity style={styles.imagePlaceholderCard}>
            {/* <Plus size={24} color="#2563EB" /> */}
            <Text style={styles.uploadText}>Add Photo</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Shared Base Inputs Matrix */}
        <Text style={styles.sectionLabel}>Core Information</Text>
        <AnimatedInput
          label="Listing Title"
          value={form.title}
          onChangeText={(t) => setForm({ ...form, title: t })}
        />
        <AnimatedInput
          label="Price (USD / ₦)"
          keyboardType="numeric"
          value={form.price}
          onChangeText={(t) => setForm({ ...form, price: t })}
        />

        {/* Conditional Layout Animation Injection */}
        <Animated.View layout={Layout.springify()}>
          {type === "apartment" ? (
            <Animated.View entering={FadeInRight} style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
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
            <Animated.View entering={FadeInRight}>
              <AnimatedInput
                label="Land Size (e.g., 600 sqm / Acres)"
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

        <Text style={styles.sectionLabel}>Location Metrics</Text>
        <AnimatedInput
          label="Street Address"
          value={form.address}
          onChangeText={(t) => setForm({ ...form, address: t })}
        />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
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

        <AnimatedButton
          title="Publish Premium Listing"
          variant="success"
          onPress={() => alert("Validated and Saved!")}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "Poppins",
  },
  subtitle: { fontSize: 15, color: "#6B7280", marginBottom: 24, marginTop: 4 },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tabText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  activeTabText: { color: "#2563EB" },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 14,
    marginTop: 8,
    fontFamily: "Poppins",
  },
  imageScroll: { marginBottom: 24 },
  imagePlaceholderCard: {
    width: 110,
    height: 110,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  uploadText: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
    fontFamily: "Inter",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
