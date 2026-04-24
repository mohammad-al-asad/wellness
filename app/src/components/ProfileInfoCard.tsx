import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { User, Pencil } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FontFamily, FontSize } from "../constants/typography";
import Colors from "../constants/colors";

const ProfileInfoCard = () => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <User size={40} color="#FFFFFF" />
          <Text style={styles.avatarLabel}>USER PROFILE</Text>
        </View>
        <TouchableOpacity
          style={styles.editBadge}
          onPress={() => router.push("/edit-profile")}
        >
          <Pencil size={12} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      <View style={styles.ageBadge}>
        <Text style={styles.ageText}>Age: 34</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push("/edit-profile")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5C4A7", // Peach/Tan color from image
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#F1F5F9",
  },
  avatarLabel: {
    fontSize: 6,
    color: "#FFFFFF",
    fontFamily: FontFamily.bold,
    marginTop: 2,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0D2B6E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  name: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    color: "#1E293B",
    marginBottom: 4,
  },
  email: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: "#64748B",
    marginBottom: 12,
  },
  ageBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  ageText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xs,
    color: "#0D2B6E",
  },
  editButton: {
    backgroundColor: "#0D2B6E",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  editButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.base,
    color: "#FFFFFF",
  },
});

export default ProfileInfoCard;
