// src/services/firebase.js
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4fIO901i2SDSc8r-MIWwlrGT-RgP3b6s",
  authDomain: "coder-lex-81710.firebaseapp.com",
  projectId: "coder-lex-81710",
  storageBucket: "coder-lex-81710.firebasestorage.app",
  messagingSenderId: "269916809520",
  appId: "1:269916809520:web:8778bc7ed2f1e7693c80f5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener productos desde Firestore
export const getProductsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    console.log(`Número de productos encontrados: ${querySnapshot.size}`);

    const productos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Productos obtenidos desde Firestore:", productos);
    return productos; 
  } catch (error) {
    console.error("Error al obtener productos desde Firestore:", error);
    return [];  // Si hay error, retornamos un arreglo vacío
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "productos", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("Error al obtener el producto");
  }
};

export { db };

