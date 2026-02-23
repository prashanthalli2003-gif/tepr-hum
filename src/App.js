import React, { useEffect, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

/* 🔥 UPDATED FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyACRZUr-_A7Agv9QAZfW627F4fl-3mBifQ",
  authDomain: "projectt2-1b1f4.firebaseapp.com",
  databaseURL: "https://projectt2-1b1f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectt2-1b1f4",
  storageBucket: "projectt2-1b1f4.firebasestorage.app",
  messagingSenderId: "899239791218",
  appId: "1:899239791218:web:878be3c7fb7dfb6d1d90eb",
  measurementId: "G-CZC3G356BP"
};

/* INIT FIREBASE */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [led, setLed] = useState(false);

  /* 🔄 READ FROM FIREBASE */
  useEffect(() => {
    const ledRef = ref(db, "LED");

    onValue(ledRef, (snapshot) => {
      const value = snapshot.val();
      setLed(value === 1);
    });
  }, []);

  /* 🎛 TOGGLE LED */
  const toggleLed = () => {
    set(ref(db, "LED"), led ? 0 : 1);
  };

  return (
    <div className="container">
      <h1 className="title">Smart LED Dashboard</h1>

      <div className="grid">

        {/* LED CONTROL */}
        <div className="card">
          <h2>LED Control</h2>

          <label className="switch">
            <input
              type="checkbox"
              checked={led}
              onChange={toggleLed}
            />
            <span className="slider"></span>
          </label>

          <p className={led ? "on" : "off"}>
            {led ? "LED ON" : "LED OFF"}
          </p>
        </div>

        {/* STATS */}
        <div className="card">
          <h2>Statistics</h2>
          <div className="stats">
            <div>
              <h3>Power</h3>
              <p>{led ? "20W" : "0W"}</p>
            </div>
            <div>
              <h3>Status</h3>
              <p>{led ? "Active" : "Idle"}</p>
            </div>
            <div>
              <h3>Cloud</h3>
              <p>Connected</p>
            </div>
          </div>
        </div>

        {/* LOGS */}
        <div className="card logs">
          <h2>Activity Logs</h2>
          <ul>
            <li>System Online</li>
            <li>Firebase Connected</li>
            <li>{led ? "LED Turned ON" : "LED Turned OFF"}</li>
          </ul>
        </div>

        {/* DEVICE INFO */}
        <div className="card">
          <h2>Device Info</h2>
          <p>Board: ESP8266</p>
          <p>Database: Realtime</p>
          <p>Location: Cloud</p>
          <p>Status: Online</p>
        </div>

      </div>
    </div>
  );
}