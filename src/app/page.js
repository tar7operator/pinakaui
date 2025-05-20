"use client"
import Graph from "./components/Graph";
import MapComp from "./components/Map";
import styles from "./page.module.css";
import { useState, useEffect, useRef } from "react";
import Time from "./components/Time";

export default function Home() {
  let port;
  const [tab, setTab] = useState("maps");
  const [sidebar, toggleSidebar] = useState(true);

  const [connection, changeConnection] = useState({ status: false, message: "Telemetry not found." });
  const [baudrate, setBaudRate] = useState(115200);
  const [com, setCom] = useState("");

  const [terminalData, setTerminalData] = useState([]);
  const [rocketData, setRocketData] = useState([{
    tid: "2024 ASI ROCKETRY 047",
    t: 0,
    pc: 0,
    alt: 0,
    p: 0,
    temp: 0,
    volt: 0,
    gt: 0,
    Lat: 0,
    Lon: 0,
    galt: 0,
    sats: 0,
    Ax: 0,
    Ay: 0,
    Az: 0,
    Rx: 0,
    Ry: 0,
    Rz: 0,
    state: 0,
    Hum: 0,
    Mx: 0,
    My: 0,
    Mz: 0,
    dt: 0
  }]);
  const [cansatData, setCansatData] = useState([{
    tid: "2024 ASI ROCKETRY 047",
    t: 0,
    pc: 0,
    alt: 0,
    p: 0,
    temp: 0,
    volt: 0,
    gt: 0,
    Lat: 0,
    Lon: 0,
    galt: 0,
    sats: 0,
    Ax: 0,
    Ay: 0,
    Az: 0,
    Rx: 0,
    Ry: 0,
    Rz: 0,
    state: 0,
    Hum: 0,
    Mx: 0,
    My: 0,
    Mz: 0,
    dt: 0
  }]);


  const [dummy, setDummy] = useState(false);
  const terminalEndRef = useRef(null);

  const dummyData = [
    {
    tid: "2024-ASI ROCKETRY 047",
    t: 0,
    pc: 0,
    alt: 0,
    p: 0,
    temp: 0,
    volt: 0,
    gt: 0,
    Lat: 0,
    Lon: 0,
    galt: 0,
    sats: 0,
    Ax: 0,
    Ay: 0,
    Az: 0,
    Rx: 0,
    Ry: 0,
    Rz: 0,
    state: 0,
    Hum: 0,
    Mx: 0,
    My: 0,
    Mz: 0,
    dt: 0
  }
  ];

  useEffect(() => {
    terminalEndRef.current.scrollIntoView({
      block: "center", // Align the element in the center
    });
  }, [terminalData]);

  const sendCommand = (data) => {
    // Send command to the serial port

    // Append the command to the terminal
    setTerminalData(t => [...t, { time: new Date().toLocaleTimeString(), type: "com", src: "admin", msg: data }]);

    // Clear the input field
    setCom("");
  }

  async function requestPort() {
    try {
      port = await navigator.serial.requestPort();
      if (port) {
        try {
          await port.open({ baudRate: baudrate });
          readFromPort(port)
          changeConnection({ status: true, message: "PORT CONNECTED." });
        }
        catch (err) {
          changeConnection({ status: false, message: "CONNECTED BUT NOT READABLE." });
        }
      }
    } catch (err) {
      changeConnection({ status: false, message: "PORT NOT CONNECTED." });
    }
  }

  async function readFromPort() {
    if (port && port.connected) {
      const reader = port.readable.getReader();
      try {
        let buffer = ""; // Buffer to store incomplete lines
        while (port.connected) {
          const { value, done } = await reader.read();
          if (done) break;
          changeConnection({ status: true, message: "TELEMETRY CONNECTED......!" });

          // Decode the received value and append to the buffer
          buffer += new TextDecoder().decode(value);

          // Split the buffer using "2024" as the delimiter
          const parts = buffer.split("2024");

          // Keep the last part (it might be incomplete) in the buffer
          buffer = parts.pop();

          parts.forEach(part => {
            const line = "2024 " + part.trim(); // Re-add "2024" to each split part
            const headers = [
              "tid", "t", "pc", "alt", "p", "temp", "volt", "gt",
              "Lat", "Lon", "galt", "sats", "Ax", "Ay", "Az",
              "Rx", "Ry", "Rz", "state", "Hum", "Mx", "My", "Mz", "ds"
            ]
            const val = line.split(",");
            const data = {};
            headers.forEach((h, i) => {
              if (h == "Ax" || h == "Ay" || h == "Az") {
                data[h] = val[i]/1000;
              }
              else {
                data[h] = val[i];
              }
            });

            if (line.includes("047") && line.includes(",c")) {
              setTerminalData(term => [...term, { time: new Date().toLocaleTimeString(), type: "tel", src: "cansat", msg: line }]);
              setCansatData(d => [...d, data]);
            }
            else if (line.includes("047") && line.includes(",r")) {
              setTerminalData(term => [...term, { time: new Date().toLocaleTimeString(), type: "tel", src: "rocket", msg: line }]);
              setRocketData(d => [...d, data]);
            }
            else {
            }
          });

          // Introduce a delay of 0.25 seconds
          await new Promise(resolve => setTimeout(resolve));
          changeConnection({ status: true, message: "TELEMETRY CONNECTED.....!" });

        }
      } catch (error) {
        changeConnection({ status: false, message: "UNABLE TO READ FROM PORT." });
      } finally {
        reader.releaseLock();
      }
    }
  };


  //Serial data read

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => toggleSidebar(!sidebar)} className={styles.toggleSidebar}>
          {sidebar ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 20V4C21 3.44772 20.5523 3 20 3H15C14.4477 3 14 3.44772 14 4V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20Z" stroke="rgba(250, 235, 215, 0.7)" strokeWidth={1.5} strokeLinecap={"round"} strokeLinejoin={"round"} />
            <path d="M7 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H7" stroke="rgba(250, 235, 215, 0.7)" strokeWidth={1.5} strokeLinecap={"round"} strokeLinejoin={"round"} />
            <path d="M6 12L9 9M6 12L9 15M6 12L14 12" stroke="rgba(250, 235, 215, 0.7)" strokeWidth={1.5} strokeLinecap={"round"} strokeLinejoin={"round"} />
          </svg> :
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20V4C10 3.44772 9.55228 3 9 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20Z" stroke="rgba(250, 235, 215, 0.7)" strokeWidth={1.5} strokeLinecap={"round"} strokeLinejoin={"round"} />
              <path d="M17 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H17" stroke="rgba(250, 235, 215, 0.7)" strokeWidth={1.5} strokeLinecap={"round"} strokeLinejoin={"round"} />
              <path d="M18 12L15 9M18 12L15 15M18 12L10 12" stroke="rgba(250, 235, 215, 0.7)" strokeWidth={1.5} strokeLinecap={"round"} strokeLinejoin={"round"} />
            </svg>}
        </div>
        <div className={styles.timeTab}><Time></Time> {" IST"}</div>
        <div className={styles.satelliteTab} id={rocketData[rocketData.length - 1].sats > 0 ? "green" : null}>
          {rocketData[rocketData.length - 1].sats + " SATS"}
        </div>
      <div className={styles.satelliteTab2} id={cansatData[cansatData.length - 1 ].sats > 0 ? "green" : null}>
          {cansatData[cansatData.length - 1 ].sats + " SATS"}
        </div>
        <span>ASI ROCKETRY 2024-25 | Team Pinaka | ID: 047</span>

      </div>

      <div className={styles.section}>
        {sidebar ? <div className={styles.side}>

          <div className={styles.telemetryInput}>
            <div>BAUDRATE:</div>
            <div>
              
              <div className={"select"}>
              <select value={baudrate} onChange={e => setBaudRate(e.target.value)} className={"selectc"}>
                <option value="9600">9600 bps</option>
                <option value="115200">115200 bps</option>
              </select>
              <span className={"focus"}></span>
            </div>
            
            </div>
          </div>

          <ul className={styles.actionsGrid} >
            <li className={connection.status ? styles.greenAction : styles.redAction} onClick={() => connection.status ? null : requestPort()} id="openPort">{!connection.status ? "START" : "STOP"}</li>
            <li className={dummy ? styles.greenAction : styles.redAction} onClick={() => setDummy(!dummy)} id="openPort">DUMMY</li>
          </ul>


          <ul className={styles.selectTabs}>
            <li onClick={() => setTab("terminal")} className={tab == "terminal" ? styles.selected : null}>
              Terminal
            </li>
            <li onClick={() => setTab("rocketgraphs")} className={tab == "rocketgraphs" ? styles.selected : null}>
              <span>Rocket</span>
              <div className={styles.metrics}>
                <span>Voltage: </span>{rocketData[rocketData.length - 1].volt + " V"}
              </div>
              <div className={styles.metrics}>
                <span>Altitude: </span>{rocketData[rocketData.length - 1].alt + "m"}
              </div>
            </li>
            <li onClick={() => setTab("cansatgraphs")} className={tab == "cansatgraphs" ? styles.selected : null}>
              <span>CANSAT</span>
              <div className={styles.metrics}>
                <span>Voltage: </span>{cansatData[cansatData.length - 1 ].volt + " V"}
              </div>
              <div className={styles.metrics}>
                <span>Altitude: </span>{cansatData[cansatData.length - 1 ].alt + "m"}
              </div>
            </li>
            <li onClick={() => setTab("maps")} className={tab == "maps" ? styles.selected : null}>
              GeoLocation
            </li>
          </ul>

        </div> : null}
        <div className={styles.content}>

          <div className={tab == "rocketgraphs" ? styles.graphs : styles.none}>
            <div className={styles.acc}>
              <span className={styles.chartName}>Acceleration (m^2/s)</span>
              <Graph data={dummy ? dummyData : rocketData.length > 20 ? rocketData.slice(-20) : rocketData} keysArr={["Ax", "Ay", "Az"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.rot}>
              <span className={styles.chartName}>Angular Velocity (deg/s)</span>
              <Graph data={dummy ? dummyData : rocketData.length > 20 ? rocketData.slice(-20) : rocketData} keysArr={["Rx", "Ry", "Rz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.mag}>
              <span className={styles.chartName}>Magnetic Flux (µT)</span>
              <Graph data={dummy ? dummyData : rocketData.length > 20 ? rocketData.slice(-20) : rocketData} keysArr={["Mx", "My", "Mz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.alt}>
              <span className={styles.chartName}>Altitude (m)</span>
              <Graph data={dummy ? dummyData : rocketData.length > 20 ? rocketData.slice(-20) : rocketData} keysArr={["alt"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.cam}>
              <video src="/videos/dummy.mp4" autoPlay muted></video>
              <span className={styles.camName}>Rocket Cam 1</span>
            </div>
            <div className={styles.gps}>
            <span className={styles.chartName}>Temperature (^C) / Humidity </span>
              <Graph data={dummy ? dummyData : rocketData.length > 20 ? rocketData.slice(-20) : rocketData} keysArr={["temp", "Hum"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
          </div>

          <div className={tab == "cansatgraphs" ? styles.graphs : styles.none}>
            <div className={styles.acc}>
              <span className={styles.chartName}>Acceleration (m^2/s)</span>
              <Graph data={dummy ? dummyData : cansatData.length > 20 ? cansatData.slice(-20) : cansatData} keysArr={["Ax", "Ay", "Az"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.rot}>
              <span className={styles.chartName}>Angular Velocity (deg/s)</span>
              <Graph data={dummy ? dummyData : cansatData.length > 20 ? cansatData.slice(-20) : cansatData} keysArr={["Rx", "Ry", "Rz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.mag}>
              <span className={styles.chartName}>Altitude (m)</span>
              <Graph data={dummy ? dummyData : cansatData.length > 20 ? cansatData.slice(-20) : cansatData} keysArr={["alt"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.alt}>
              <span className={styles.chartName}>AQI (m)</span>
              <Graph  data={dummy ? dummyData : cansatData.length > 20 ? cansatData.slice(-20) : cansatData} keysArr={["alt"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.cam}>
              <span className={styles.chartName}>Temperature (^C) / Humidity </span>
              <Graph data={dummy ? dummyData : cansatData.length > 20 ? cansatData.slice(-20) : cansatData} keysArr={["temp", "Hum"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
            <div className={styles.gps}>
            <span className={styles.chartName}>Magnetic Flux (µT)</span>
              <Graph data={dummy ? dummyData : rocketData.length > 20 ? rocketData.slice(-20) : rocketData} keysArr={["Mx", "My", "Mz"]} />
              <span className={styles.chartXLabel}>T(s)</span>
            </div>
          </div>

          <div className={tab == "terminal" ? styles.terminal : styles.none}>
            <ul className={styles.monitor}>

              <div className={styles.welcomeMsg}>
                --------------------<br />
                | PINAKA UI V1.0.0 |<br />
                --------------------<br />
              </div>
              {terminalData.map((m, i) => (
                <li key={i}>
                  {"[ " + m.time + " | "}
                   <span style={{ margin: "0 8px" }} className={m.type == "tel" ? styles.green : m.type == "com" ? styles.purple : null}> {m.type} </span> 
                  {" ] " + m.msg}</li>
              ))}


              <div ref={terminalEndRef} />
            </ul>
            <div className={styles.base}>
              <span>{">_"}</span>
              <input className={styles.comInput} value={com} onChange={(e)=>setCom(e.target.value)} type="text" onKeyDown={(e)=> e.key == "Enter" ? sendCommand(com):null}></input>
              <button onClick={() => sendCommand(com)} className={styles.comSendBtn}>{">>"}</button>
            </div>

          </div>

          <div className={tab == "maps" ? styles.mapsTab : styles.none}>
            <MapComp></MapComp>
            
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
