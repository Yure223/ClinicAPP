import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../colors";
import Button from "../components/Button";

export default function DoctorDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${doctor.phone}`);
  };

  const handleAppointment = () => {
    navigation.navigate("Appointment", { doctor });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{doctor.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{doctor.phone}</Text>
        </View>

        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.bio}>{doctor.bio}</Text>

        <Text style={styles.sectionTitle}>Serviços</Text>
        <View style={styles.serviceItem}>
          <FontAwesome5 name="stethoscope" size={18} color={colors.primary} />
          <Text style={styles.serviceText}>Consultas presenciais e online</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons name="medkit-outline" size={18} color={colors.primary} />
          <Text style={styles.serviceText}>Exames clínicos e laboratoriais</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons name="heart-outline" size={18} color={colors.primary} />
          <Text style={styles.serviceText}>Acompanhamento especializado</Text>
        </View>

        <Button title="Agendar Consulta" onPress={handleAppointment} style={{ marginTop: 30 }} />

        <TouchableOpacity onPress={handleCall} style={styles.callButton}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={styles.callText}>Ligar para a Clínica</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 220,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.dark,
  },
  specialty: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  infoText: {
    marginLeft: 6,
    color: colors.gray,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    marginTop: 20,
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceText: {
    marginLeft: 10,
    color: "#444",
    fontSize: 14,
  },
  callButton: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  callText: {
    color: colors.primary,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },
});
