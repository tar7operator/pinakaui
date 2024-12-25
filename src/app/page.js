"use client"
import Image from "next/image";
import "leaflet/dist/leaflet.css"
import Graph from "./components/Graph";
import Map from "./components/Map";
import styles from "./page.module.css";
import { useState } from "react";
export default function Home() {

  const [tab, setTab] = useState("rocketgraphs");
  const [sidebar, toggleSidebar] = useState(true);
  const [connection, changeConnection] = useState({ status: false, message: "Telemetry not found." });

  const data = [
    {
      "t": 12200593,
      "Ax": 40.00,
      "Ay": 24.00,
      "Az": 9.81,
      "Rx": 40.00,
      "Ry": 24.00,
      "Rz": 9.81,
      "Mx": 40.00,
      "My": 24.00,
      "Mz": 9.81,
      "Altitude": 40.00
    },
    {
      "t": 12200594,
      "Ax": 30.00,
      "Ay": 13.98,
      "Az": 9.81,
      "Rx": 30.00,
      "Ry": 13.98,
      "Rz": 9.81,
      "Mx": 30.00,
      "My": 13.98,
      "Mz": 9.81,
      "Altitude": 30.00
    },
    {
      "t": 12200595,
      "Ax": 20.00,
      "Ay": 98.00,
      "Az": 9.81,
      "Rx": 20.00,
      "Ry": 98.00,
      "Rz": 9.81,
      "Mx": 20.00,
      "My": 98.00,
      "Mz": 9.81,
      "Altitude": 20.00
    },
    {
      "t": 12200596,
      "Ax": 27.80,
      "Ay": 39.08,
      "Az": 9.81,
      "Rx": 27.80,
      "Ry": 39.08,
      "Rz": 9.81,
      "Mx": 27.80,
      "My": 39.08,
      "Mz": 9.81,
      "Altitude": 27.80
    },
    {
      "t": 12200597,
      "Ax": 18.90,
      "Ay": 48.00,
      "Az": 9.81,
      "Rx": 18.90,
      "Ry": 48.00,
      "Rz": 9.81,
      "Mx": 18.90,
      "My": 48.00,
      "Mz": 9.81,
      "Altitude": 18.90
    },
    {
      "t": 12200598,
      "Ax": 23.90,
      "Ay": 38.00,
      "Az": 9.81,
      "Rx": 23.90,
      "Ry": 38.00,
      "Rz": 9.81,
      "Mx": 23.90,
      "My": 38.00,
      "Mz": 9.81,
      "Altitude": 23.90
    },
    {
      "t": 12200599,
      "Ax": 34.90,
      "Ay": 43.00,
      "Az": 9.81,
      "Rx": 34.90,
      "Ry": 43.00,
      "Rz": 9.81,
      "Mx": 34.90,
      "My": 43.00,
      "Mz": 9.81,
      "Altitude": 34.9
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => toggleSidebar(!sidebar)} className={styles.toggleSidebar}></div>
      </div>

      <div className={styles.section}>
        {sidebar ? <div className={styles.side}>
          <ul>
            <li onClick={() => setTab("rocketgraphs")} className={tab == "rocketgraphs" ? styles.selected : null}>Rocket</li>
            <li onClick={() => setTab("cansatgraphs")} className={tab == "cansatgraphs" ? styles.selected : null}>Cansat</li>
            <li onClick={() => setTab("flight")} className={tab == "flight" ? styles.selected : null}>Flight</li>
            <li onClick={() => setTab("terminal")} className={tab == "terminal" ? styles.selected : null}>Terminal</li>
          </ul>
        </div> : null}
        <div className={styles.content}>
          {tab == "rocketgraphs" ? <div className={styles.rocketgraphs}>
            <div className={styles.acc}>
              <span className={styles.chartName}>Acceleration (m^2/s)</span>
              <Graph data={data.length > 20 ? data.slice(-20,) : data} keysArr={["Ax", "Ay", "Az"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.rot}>
              <span className={styles.chartName}>Angular Velocity (rad/s)</span>
              <Graph data={data.length > 20 ? data.slice(-20,) : data} keysArr={["Rx", "Ry", "Rz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.mag}>
              <span className={styles.chartName}>Magnetic Flux (µT)</span>
              <Graph data={data.length > 20 ? data.slice(-20,) : data} keysArr={["Mx", "My", "Mz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.alt}>
              <span className={styles.chartName}>Altitude (m)</span>
              <Graph data={data.length > 20 ? data.slice(-20,) : data} keysArr={["Altitude"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.cam}>
            <video src="/videos/dummy.mp4" autoPlay muted></video>
            </div>
            <div className={styles.gps} id="map">
              <Map></Map>
            </div>
          </div> : null}
        </div>
      </div>

      <div className={styles.footer}>
        <span> © Pinaka Rocketry Team 2024-2025 | All rights reserved.</span>
        <span className={styles.widespace} />
        <span className={connection.status ? styles.green : styles.red}> {connection.message}</span><span>|</span>
        <span> Pinaka GUI V1.0.0</span>
      </div>

    </div>
  );
}
