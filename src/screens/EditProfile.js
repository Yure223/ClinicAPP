import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth } from "../services/firebase";
import { getUserProfile, updateUserProfile } from "../services/users";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const data = await getUserProfile(user.uid);
        setProfile({
          name: data?.name || "",
          email: data?.email || user.email,
          phone: data?.phone || "",
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!profile.name.trim()) {
      Alert.alert("Atenção", "Por favor, preencha seu nome.");
      return;
    }

    setSaving(true);

    try {
      await updateUserProfile(user.uid, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu email"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Seu telefone"
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#111",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    color: "#f97316",
    textAlign: "center",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#f97316",
    fontSize: 16,
  },
});
