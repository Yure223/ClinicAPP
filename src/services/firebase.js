import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getFirestore } from 'firebase/firestore';

// ✅ Config oficial do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGHbeJVXmM_v9397vGhLOQ_f8-wSbGzO4",
  authDomain: "teste-d67d5.firebaseapp.com",
  projectId: "teste-d67d5",
  storageBucket: "teste-d67d5.firebasestorage.app",
  messagingSenderId: "319447135749",
  appId: "1:319447135749:web:9569bb182772c643510e6c",
  measurementId: "G-GQT8Z87LP4"
};
const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {

  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Initialize Firestore
const db = getFirestore(app);

// Exporte tanto auth quanto db
export { auth, db };