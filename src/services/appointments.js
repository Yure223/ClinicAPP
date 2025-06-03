// src/services/appointments.js
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Criar agendamento
export const createAppointment = async (appointment) => {
  const appointmentsRef = collection(db, "appointments");
  const docRef = await addDoc(appointmentsRef, appointment);
  return docRef.id;
};

// Buscar agendamentos de um usuário
export const getAppointmentsByUser = async (userId) => {
  const appointmentsRef = collection(db, "appointments");
  const q = query(appointmentsRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const appointments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return appointments;
};
