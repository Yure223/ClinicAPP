import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../colors";

export default function AppointmentCard({ data, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{data.doctorName}</Text>
        <Text style={styles.specialty}>{data.specialty}</Text>
        <Text style={styles.date}>🗓 {data.date}</Text>
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
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    flexDirection: "column",
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
  date: {
    fontSize: 14,
    color: colors.gray,
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
