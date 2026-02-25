import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "./App.css";

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

  const [data, setData] = useState({
    temperature: "--",
    humidity: "--",
    soilMoisture: "--",
    waterLevel: "--",
    pumpStatus: "OFF"
  });

  useEffect(() => {
    const sensorRef = ref(database, "sensors");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const sensorData = snapshot.val();
      if (sensorData) {
        setData({
          temperature: sensorData.temperature || "--",
          humidity: sensorData.humidity || "--",
          soilMoisture: sensorData.soilMoisture || "--",
          waterLevel: sensorData.waterLevel || "--",
          pumpStatus: sensorData.pumpControl || "OFF"
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const turnPumpOn = () => {
    set(ref(database, "sensors/pumpControl"), "ON");
  };

  const turnPumpOff = () => {
    set(ref(database, "sensors/pumpControl"), "OFF");
  };

  return (
    <div className="main">
      <h1>🌱 Smart Agriculture Dashboard</h1>

      <div className="container">

        <div className="card">
          <h2>🌡 Temperature</h2>
          <p>{data.temperature} °C</p>
        </div>

        <div className="card">
          <h2>💧 Humidity</h2>
          <p>{data.humidity} %</p>
        </div>

        <div className="card">
          <h2>🌱 Soil Moisture</h2>
          <p>{data.soilMoisture}</p>
        </div>

        <div className="card">
          <h2>💦 Water Level</h2>
          <p>{data.waterLevel}</p>
        </div>

        <div className={`card ${data.pumpStatus === "ON" ? "alert" : "safe"}`}>
          <h2>🚿 Pump Status</h2>
          <p>{data.pumpStatus}</p>
          <button onClick={turnPumpOn}>Turn ON</button>
          <button onClick={turnPumpOff}>Turn OFF</button>
        </div>

      </div>

      <div className="footer">
        Live Data from ESP8266 • Firebase RTDB
      </div>
    </div>
  );
}

export default App;