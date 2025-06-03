import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Criar perfil de usuário
export const createUserProfile = async (user) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email,
    phone: "",
    createdAt: new Date().toISOString(),
  }, { merge: true });
};

// Atualizar perfil do usuário
export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, data, { merge: true });
};

// Buscar perfil do usuário
export const getUserProfile = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};
