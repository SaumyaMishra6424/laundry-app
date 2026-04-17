import { db } from "../firebase/config";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

// ✅ Real-time orders listener
export const listenOrders = (callback) => {
  return onSnapshot(collection(db, "orders"), (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(orders);
  });
};

// ✅ Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  await updateDoc(doc(db, "orders", orderId), {
    status: newStatus
  });
};