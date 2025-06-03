import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { auth } from "../services/firebase";
import { getUserProfile } from "../services/users";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileData = await getUserProfile(user.uid);
        setProfile(profileData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja mesmo sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await signOut(auth);
          navigation.replace("Login");
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.loadingText}>Carregando seu perfil...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.name}>{profile?.name}</Text>
      <Text style={styles.email}>{profile?.email}</Text>
      <Text style={styles.phone}>{profile?.phone || "Telefone não informado"}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#f97316",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#f97316",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderColor: "#f87171",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  logoutText: {
    color: "#f87171",
    fontWeight: "bold",
    fontSize: 16,
  },
});
