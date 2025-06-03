import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { auth } from "../services/firebase";
import { getAppointmentsByUser } from "../services/appointments";
import AppointmentCard from "../components/AppointmentCard";
import colors from "../../colors";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const userId = auth.currentUser.uid;
      const data = await getAppointmentsByUser(userId);
      setAppointments(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os agendamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando agendamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>

      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AppointmentCard data={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.primary,
  },
  list: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    color: colors.gray,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: colors.gray,
  },
});
