// src/services/doctors.js
import { collection, getDocs, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Buscar todos os médicos
export const getDoctors = async () => {
  const doctorsRef = collection(db, "doctors");
  const snapshot = await getDocs(doctorsRef);
  const doctors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return doctors;
};

// Buscar médico específico
export const getDoctorById = async (id) => {
  const doctorRef = doc(db, "doctors", id);
  const docSnap = await getDoc(doctorRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Médico não encontrado");
  }
};

// Cadastrar novo médico (opcional, se quiser via app)
export const addDoctor = async (doctorData) => {
  const doctorsRef = collection(db, "doctors");
  const newDoctor = await addDoc(doctorsRef, doctorData);
  return newDoctor.id;
};
