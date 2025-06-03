import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../colors";

import data from "../services/MedicosData.json";
import DoctorCard from "../components/DoctorCard.js";

export default function Home() {
  const navigation = useNavigation();
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setClinics(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDoctorPress = (doctor) => {
    navigation.navigate("DoctorDetail", { doctor });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando clínicas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clínicas e Médicos</Text>
      <FlatList
        data={clinics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard data={item} onPress={() => handleDoctorPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    marginBottom: 15,
    color: colors.primary,
  },
  list: {
    paddingBottom: 20,
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
