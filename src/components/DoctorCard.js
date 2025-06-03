import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../colors";

export default function DoctorCard({ data, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.specialty}>{data.specialty}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={colors.gray} />
          <Text style={styles.location}>{data.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.dark,
  },
  specialty: {
    fontSize: 14,
    color: colors.primary,
    marginVertical: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  location: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 5,
  },
});
