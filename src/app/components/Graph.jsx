'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AreaChart, Area } from 'recharts';

const Graph = ({ data, keysArr }) => {

  const colors = [
    "rgba(26, 188, 156, 1)",
    "rgba(22, 160, 133, 1)",
    "rgba(46, 204, 113, 1)",
    "rgba(39, 174, 96, 1)",
    "rgba(52, 152, 219, 1)",
    "rgba(41, 128, 185, 1)",
    "rgba(155, 89, 182, 1)",
    "rgba(142, 68, 173, 1)",
    "rgba(52, 73, 94, 1)",
    "rgba(44, 62, 80, 1)",
    "rgba(241, 196, 15, 1)",
    "rgba(243, 156, 18, 1)",
    "rgba(230, 126, 34, 1)",
    "rgba(211, 84, 0, 1)",
    "rgba(231, 76, 60, 1)",
    "rgba(192, 57, 43, 1)",
    "rgba(236, 240, 241, 1)",
    "rgba(189, 195, 199, 1)",
    "rgba(149, 165, 166, 1)",
    "rgba(127, 140, 141, 1)"
  ];
  
  const colorshaded = [
    "rgba(26, 188, 156, 0.2)",
    "rgba(22, 160, 133, 0.2)",
    "rgba(46, 204, 113, 0.2)",
    "rgba(39, 174, 96, 0.2)",
    "rgba(52, 152, 219, 0.2)",
    "rgba(41, 128, 185, 0.2)",
    "rgba(155, 89, 182, 0.2)",
    "rgba(142, 68, 173, 0.2)",
    "rgba(52, 73, 94, 0.2)",
    "rgba(44, 62, 80, 0.2)",
    "rgba(241, 196, 15, 0.2)",
    "rgba(243, 156, 18, 0.2)",
    "rgba(230, 126, 34, 0.2)",
    "rgba(211, 84, 0, 0.2)",
    "rgba(231, 76, 60, 0.2)",
    "rgba(192, 57, 43, 0.2)",
    "rgba(236, 240, 241, 0.2)",
    "rgba(189, 195, 199, 0.2)",
    "rgba(149, 165, 166, 0.2)",
    "rgba(127, 140, 141, 0.2)"
  ];
  
  const rand1 = Math.floor(Math.random() * colors.length);
  const rand2 = Math.floor(Math.random() * colors.length);
  const rand3 = Math.floor(Math.random() * colors.length);


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
        {(keysArr.length >= 1) ? <Area type="monotone" dataKey={keysArr[0]} stroke={colors[rand1]} fill={colorshaded[rand1]} /> : null}
        {(keysArr.length >= 2) ? <Area type="monotone" dataKey={keysArr[1]} stroke={colors[rand2]} fill={colorshaded[rand2]} /> : null}
        {(keysArr.length >= 3) ? <Area type="monotone" dataKey={keysArr[2]} stroke={colors[rand3]} fill={colorshaded[rand3]} /> : null}
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