"use client"
import Image from "next/image";
import "leaflet/dist/leaflet.css"
import Graph from "./components/Graph";
import Map from "./components/Map";
import styles from "./page.module.css";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  const [tab, setTab] = useState("terminal");
  const [sidebar, toggleSidebar] = useState(true);
  const [ctime, getTime] = useState("00:00:00");
  const [sats, getSats] = useState(5);
  const [data, setData] = useState([]);
  const [connection, changeConnection] = useState({ status: false, message: "Telemetry not found." });
  const [terminal, setTerminal] = useState([
    { datetime: new Date('2024-12-27 00:00:00').toISOString(), type: 'com', message: 'Hello, world!' }
  ]);
  const [dummy, setDummy] = useState(true);
  const terminalEndRef = useRef(null);

  const dummyData = [
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

  useEffect(() => {

    const intervalId = setInterval(() => {
      getTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric", second: "numeric"
      }));
    }, 1000);
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    return () => clearInterval(intervalId);

  }, [terminal]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => toggleSidebar(!sidebar)} className={styles.toggleSidebar}>
          {sidebar ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 20V4C21 3.44772 20.5523 3 20 3H15C14.4477 3 14 3.44772 14 4V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20Z" stroke="rgba(250, 235, 215, 0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H7" stroke="rgba(250, 235, 215, 0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 12L9 9M6 12L9 15M6 12L14 12" stroke="rgba(250, 235, 215, 0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg> :
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20V4C10 3.44772 9.55228 3 9 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20Z" stroke="rgba(250, 235, 215, 0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H17" stroke="rgba(250, 235, 215, 0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18 12L15 9M18 12L15 15M18 12L10 12" stroke="rgba(250, 235, 215, 0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
        </div>
        <div className={styles.timeTab}>{ctime + " IST"}</div>
        <div className={styles.satelliteTab} id={sats > 0 ? "green" : null}>{sats + " SATS"}</div>
        <span>ASI ROCKETRY 2024-24 | Team Pinaka | ID: 047</span>

      </div>

      <div className={styles.section}>
        {sidebar ? <div className={styles.side}>

          <div className={styles.telemetryInput}>
            <div>PORT:</div>
            <div><div className={styles.select}>
              <select className={styles.selectc}>
                <option value="COM3">COM3</option>
                <option value="COM4">COM4</option>
                <option value="COM5">COM5</option>
                <option value="COM6">COM6</option>
              </select>
              <span className={styles.focus}></span>
            </div></div>
          </div>
          <div className={styles.telemetryInput}>
            <div>BAUDRATE:</div>
            <div><div className={styles.select}>
              <select className={styles.selectc}>
                <option value="4800">4800 bps</option>
                <option value="9600">96600 bps</option>
                <option value="19200">19200 bps</option>
                <option value="115200">115200 bps</option>
              </select>
              <span className={styles.focus}></span>
            </div></div>
          </div>

          <ul className={styles.actionsGrid} >
            <li onClick={() => setDummy(!dummy)} className={dummy ? styles.greenAction : styles.redAction}>DUMMY</li>
            <li>UPDATE</li>
            <li>RESET</li>
            <li>CLEAR</li>
          </ul>


          <ul className={styles.selectTabs}>
            <li onClick={() => setTab("rocketgraphs")} className={tab == "rocketgraphs" ? styles.selected : null}>Rocket</li>
            <li onClick={() => setTab("cansatgraphs")} className={tab == "cansatgraphs" ? styles.selected : null}>Cansat</li>
            <li onClick={() => setTab("terminal")} className={tab == "terminal" ? styles.selected : null}>Terminal</li>
          </ul>

        </div> : null}
        <div className={styles.content}>

          <div className={tab == "rocketgraphs" ? styles.graphs : styles.none}>
            <div className={styles.acc}>
              <span className={styles.chartName}>Acceleration (m^2/s)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Ax", "Ay", "Az"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.rot}>
              <span className={styles.chartName}>Angular Velocity (rad/s)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Rx", "Ry", "Rz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.mag}>
              <span className={styles.chartName}>Magnetic Flux (µT)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Mx", "My", "Mz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.alt}>
              <span className={styles.chartName}>Altitude (m)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Altitude"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.cam}>
              <video src="/videos/dummy.mp4" autoPlay muted></video>
              <span className={styles.camName}>Rocket Cam 1</span>
            </div>
            <div className={styles.gps} id="map">
              <Map></Map>
            </div>
          </div>

          <div className={tab == "cansatgraphs" ? styles.graphs : styles.none}>
            <div className={styles.acc}>
              <span className={styles.chartName}>Acceleration (m^2/s)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Ax", "Ay", "Az"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.rot}>
              <span className={styles.chartName}>Angular Velocity (rad/s)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Rx", "Ry", "Rz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.mag}>
              <span className={styles.chartName}>Altitude (m)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Altitude"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.alt}>
              <span className={styles.chartName}>AQI (m)</span>
              <Graph data={dummy ? dummyData : data} keysArr={["Altitude"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.cam}>
              <span className={styles.chartName}>Temperature (^C) / Humidity </span>
              <Graph data={dummy ? dummyData : data} keysArr={["Altitude"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.gps} id="map">
              <Map></Map>
            </div>
          </div>

          <div className={tab == "terminal" ? styles.terminal : styles.none}>
            <ul className={styles.monitor}>

              <div className={styles.welcomeMsg}>
                --------------------<br />
                | PINAKA UI V1.0.0 |<br />
                --------------------<br />
              </div>

              {terminal.map((message, index) => (
                <li key={index}>
                  [{message.datetime + " "}<span> - {message.type}  </span>] {message.message}
                </li>
              ))}

              <div ref={terminalEndRef} />

            </ul>
            <div className={styles.base}>
              <span>{">_"}</span>
              <input className={styles.comInput} type="text"></input>
              <button className={styles.comSendBtn}>{">>"}</button>
            </div>

          </div>

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
