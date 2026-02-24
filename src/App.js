import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import "./App.css";

// 🔥 Firebase Config (projectt2-1b1f4)
const firebaseConfig = {
  apiKey: "AIzaSyACRZUr-_A7Agv9QAZfW627F4fl-3mBifQ",
  authDomain: "projectt2-1b1f4.firebaseapp.com",
  databaseURL: "https://projectt2-1b1f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectt2-1b1f4",
  storageBucket: "projectt2-1b1f4.firebasestorage.app",
  messagingSenderId: "899239791218",
  appId: "1:899239791218:web:878be3c7fb7dfb6d1d90eb"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {

  const [soilMoisture, setSoilMoisture] = useState("--");

  useEffect(() => {

    const soilRef = ref(database, "sensors/soilMoisture");

    onValue(soilRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        setSoilMoisture(value);
      }
    });

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🌱 Soil Moisture Monitor</h1>
      <h2 style={{ fontSize: "60px", color: "#22c55e" }}>
        {soilMoisture} %
      </h2>
    </div>
  );
}

export default App;