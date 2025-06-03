import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Image, SafeAreaView,
  TouchableOpacity, StatusBar, Alert, ActivityIndicator
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { createUserProfile } from "../services/users";

const backImage = require("../../assets/medicos.jpg"); 

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim()) {
      Alert.alert("Atenção", "Por favor, insira seu nome.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualiza o nome no Auth (opcional, mas recomendado)
      await updateProfile(user, { displayName: name });

      // Salva no Firestore
      await createUserProfile({
        uid: user.uid,
        name: name,
        email: user.email,
        phone: "",
      });

      navigation.replace("HomeDrawer"); // Redireciona após cadastro
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Crie seu cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#f57c00" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Pronto!</Text>
          </TouchableOpacity>
        )}

        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Já tem cadastro? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#B2DAF4', fontWeight: '600', fontSize: 14 }}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#B2DAF4",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#B2DAF4',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
