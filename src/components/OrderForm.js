import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const products = [
  { type: "Shirt", price: 50, img: "https://static.vecteezy.com/system/resources/thumbnails/012/705/555/small/men-s-shirts-mockup-design-template-mockup-free-photo.jpg" },
  { type: "Pants", price: 80, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShopPnE-TPvISwH1U_OoSzfoA57qG2NGEYSw&s" },
  { type: "Saree", price: 120, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWeKL7APSJ88QIsI06hioWaXoTaTW3aT2AQw&s" },
  { type: "Blankets", price: 500, img: "https://5.imimg.com/data5/SELLER/Default/2020/11/BO/LL/OM/44012517/blanket-washing-services.jpg" },
  { type: "Suit", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4q64aqjBAiaB7WxEiVHc7OPsBvEszc05RQw&s" }
];

function OrderForm() {

  const [showSuccess, setShowSuccess] = useState(false);
const [orderIdState, setOrderIdState] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState(
    products.map((p) => ({ ...p, qty: 0 }))
  );

  const updateQty = (index, change) => {
    const updated = [...items];
    updated[index].qty = Math.max(0, updated[index].qty + change);
    setItems(updated);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const handleSubmit = async () => {
  if (!name || !phone) {
    alert("Please fill all fields");
    return;
  }

  const total = calculateTotal();

  if (total === 0) {
    alert("Please add at least one garment");
    return;
  }

  const orderId = uuidv4();

  try {
    await addDoc(collection(db, "orders"), {
      orderId,
      name,
      phone,
      items,
      total,
      status: "RECEIVED",
      userId: auth.currentUser?.uid || null,
      createdAt: new Date()
    });

    // ✅ SHOW SUCCESS SCREEN
    setOrderIdState(orderId);
    setShowSuccess(true);

    // ⏳ Auto hide after 3 sec
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    // 🔄 Reset form
    setName("");
    setPhone("");
    setItems(products.map((p) => ({ ...p, qty: 0 })));

  } catch (error) {
    console.error(error);
    alert("❌ Error creating order");
  }
};
   
   
  if (showSuccess) {
  return (
    <div className="success-screen">
      <div className="success-card">
        <div className="checkmark">✔</div>
        <h2>Order Confirmed</h2>
        <p>ID: {orderIdState}</p>
      </div>
    </div>
  );
}

  return (
    <div className="page-container">

     
      <div className="container">
        <h2>Create Order</h2>

        {/* Inputs */}
        <input
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Products */}
        {items.map((item, index) => (
          <div key={index} className="product-card">

            {/* LEFT */}
            <img src={item.img} alt={item.type} />

            {/* MIDDLE */}
            <div className="product-info">
              <h4>{item.type}</h4>
              <div className="product-stars">⭐⭐⭐⭐☆</div>
              <p>₹{item.price}</p>
            </div>

            {/* RIGHT */}
            <div className="product-action">
              {item.qty === 0 ? (
                <button
                  className="add-btn"
                  onClick={() => updateQty(index, 1)}
                >
                  Add
                </button>
              ) : (
                <div className="qty-box">
                  <button onClick={() => updateQty(index, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(index, 1)}>+</button>
                </div>
              )}
            </div>

          </div>
        ))}

        {/* Total */}
        <h3 style={{ textAlign: "center" }}>
          Total: ₹{calculateTotal()}
        </h3>

        {/* Submit */}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default OrderForm;