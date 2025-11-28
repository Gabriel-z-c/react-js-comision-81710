import { getDoc, doc } from "firebase/firestore";
import { db } from "./services/firebase";

// Obtener un producto específico por ID desde Firestore
export const getProductById = async (id) => {
  console.log(`Buscando producto con ID: ${id}`);
  try {
    const docRef = doc(db, "productos", id); // Asegúrate de que el nombre de la colección sea 'productos'
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Producto encontrado:", docSnapshot.data());
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log("Producto no encontrado");
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("Error al obtener el producto");
  }
};
