'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AreaChart, Area } from 'recharts';

const Graph = ({ data, keysArr }) => {

  const keyColors = {
    "t": "rgba(26, 188, 156, 1)",      // Time
    "Ax": "rgba(22, 160, 133, 1)",    // Acceleration X
    "Ay": "rgba(46, 204, 113, 1)",    // Acceleration Y
    "Az": "rgba(39, 174, 96, 1)",     // Acceleration Z
    "Rx": "rgba(52, 152, 219, 1)",    // Rotation X
    "Ry": "rgba(41, 128, 185, 1)",    // Rotation Y
    "Rz": "rgba(155, 89, 182, 1)",    // Rotation Z
    "Mx": "rgba(142, 68, 173, 1)",    // Magnetometer X
    "My": "rgba(241, 196, 15, 1)",    // Magnetometer Y
    "Mz": "rgba(243, 156, 18, 1)",    // Magnetometer Z
    "Altitude": "rgba(230, 126, 34, 1)", // Altitude
    "Hd": "rgba(231, 76, 60, 1)",     // Humidity
    "Aqi": "rgba(192, 57, 43, 1)",    // Air Quality Index
    "Temp": "rgba(255, 127, 80, 1)"   // Temperature
  };
  
  const keyShades = {
    "t": "rgba(26, 188, 156, 0.2)",      // Time
    "Ax": "rgba(22, 160, 133, 0.2)",    // Acceleration X
    "Ay": "rgba(46, 204, 113, 0.2)",    // Acceleration Y
    "Az": "rgba(39, 174, 96, 0.2)",     // Acceleration Z
    "Rx": "rgba(52, 152, 219, 0.2)",    // Rotation X
    "Ry": "rgba(41, 128, 185, 0.2)",    // Rotation Y
    "Rz": "rgba(155, 89, 182, 0.2)",    // Rotation Z
    "Mx": "rgba(142, 68, 173, 0.2)",    // Magnetometer X
    "My": "rgba(241, 196, 15, 0.2)",    // Magnetometer Y
    "Mz": "rgba(243, 156, 18, 0.2)",    // Magnetometer Z
    "Altitude": "rgba(230, 126, 34, 0.2)", // Altitude
    "Hd": "rgba(231, 76, 60, 0.2)",     // Humidity
    "Aqi": "rgba(192, 57, 43, 0.2)",    // Air Quality Index
    "Temp": "rgba(255, 127, 80, 0.2)"   // Temperature
  };


  return (
    <ResponsiveContainer width="100%" height="95%">
      <AreaChart
        width={550}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 25,
          left: -35,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" stroke="rgba(245, 245, 220, 0.25)" />
        <XAxis dataKey="t" fontSize={9} />
        <YAxis fontSize={9} />
        <Tooltip />
        {(keysArr.length >= 1) ? <Area type="monotone" dataKey={keysArr[0]} stroke={keyColors[keysArr[0]]} fill={keyShades[keysArr[0]]} /> : null}
        {(keysArr.length >= 2) ? <Area type="monotone" dataKey={keysArr[1]} stroke={keyColors[keysArr[1]]} fill={keyShades[keysArr[1]]} /> : null}
        {(keysArr.length >= 3) ? <Area type="monotone" dataKey={keysArr[2]} stroke={keyColors[keysArr[2]]} fill={keyShades[keysArr[2]]} /> : null}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Ax:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Ay:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
};