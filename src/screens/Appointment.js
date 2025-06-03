import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebase";
import { createAppointment } from "../services/appointments";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import colors from "../../colors";

export default function Appointment() {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleConfirm = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setSaving(true);

    try {
      const appointment = {
        userId: user.uid,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        address: doctor.address,
        date: date.toISOString(),
        status: "confirmado",
        createdAt: new Date().toISOString(),
      };

      await createAppointment(appointment);

      Alert.alert("Sucesso", "Consulta agendada com sucesso!");
      navigation.navigate("MyAppointments");
    } catch (error) {
      console.error("Erro ao agendar:", error.message);
      Alert.alert("Erro", "Não foi possível realizar o agendamento.");
    } finally {
      setSaving(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate((prevDate) => {
        const updated = new Date(prevDate);
        updated.setFullYear(selectedDate.getFullYear());
        updated.setMonth(selectedDate.getMonth());
        updated.setDate(selectedDate.getDate());
        return updated;
      });
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDate((prevDate) => {
        const updated = new Date(prevDate);
        updated.setHours(selectedTime.getHours());
        updated.setMinutes(selectedTime.getMinutes());
        return updated;
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Médico/Clínica</Text>
        <Text style={styles.value}>{doctor.name}</Text>

        <Text style={styles.label}>Especialidade</Text>
        <Text style={styles.value}>{doctor.specialty}</Text>

        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.value}>{doctor.address}</Text>

        <Text style={styles.label}>Data e Horário</Text>
        <Text style={styles.value}>
          {date.toLocaleDateString()} às {date.toLocaleTimeString()}
        </Text>

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.pickerButtonText}>Escolher Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.pickerButtonText}>Escolher Horário</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeTime}
          />
        )}
      </View>

      <Button
        title={saving ? "Salvando..." : "Confirmar Agendamento"}
        onPress={handleConfirm}
        disabled={saving}
      />
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
    marginBottom: 20,
    color: colors.primary,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    color: colors.gray,
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 2,
  },
  pickerButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  pickerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
