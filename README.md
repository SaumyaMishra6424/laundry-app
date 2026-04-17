# 🧺  Laundry Order Management System

## 🚀 Project Overview

This is a **Laundry Order Management Web App** built using React and Firebase.
It allows users to create laundry orders, track their status, and view real-time updates through a dashboard.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SaumyaMishra6424/laundry-app
cd laundry-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root folder and add:

```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the Project

```bash
npm start
```

### 5️⃣ Build for Production

```bash
npm run build
```

---

## ✨ Features Implemented

### 🔹 Authentication

* User login/signup using Firebase Authentication

### 🔹 Order Creation

* Add garments (Shirt, Pants, Saree)
* Dynamic quantity selection
* Auto price calculation

### 🔹 Real-Time Dashboard

* Total orders count
* Total revenue calculation
* Order status tracking

### 🔹 Order Management

* View all orders
* Update order status (RECEIVED, PROCESSING, READY, DELIVERED)

### 🔹 Real-Time Updates

* Used Firebase `onSnapshot` for instant UI updates

### 🔹 UI/UX Enhancements

* Responsive design (mobile + desktop)
* Success confirmation screen after order submission
* Clean product card layout

---

## 🤖 AI Usage Report

### 🔹 Tools Used

* ChatGPT (for debugging)


---

### 🔹 Sample Prompts Used

* "Fix Firebase real-time update issue in React"
* "Create responsive order form UI like Swiggy/Zomato"
* "How to deploy React app on Vercel with environment variables"
* "Convert Firebase config to .env format"

---

### 🔹 What AI Got Wrong

* Initially mixed **Vite and CRA environment variables**
* Suggested incorrect Git setup (caused submodule issue)
* Needed corrections for Firebase real-time logic

---

### 🔹 Improvements Made Manually

* Fixed environment variable setup for CRA
* Implemented proper real-time updates using `onSnapshot`
* Improved UI layout and responsiveness
* Structured components for better readability

---

## 🛠️ Tech Stack

* Frontend: React.js
* Backend: Firebase (Firestore + Authentication)
* Deployment: Vercel

---

## 🌐 Live Demo

👉 https://laundry-app-git-main-saumya-mishras-projects-79140157.vercel.app/

---

## 📌 Future Improvements

* Add charts for analytics
* Admin panel for managing orders
* Push notifications
* Payment integration

---

## 👨‍💻 Author

Saumya Mishra
