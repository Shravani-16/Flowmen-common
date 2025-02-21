import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const linedata = [
  {
    name: "Jan",
    "Machine Running": 400,
    "Machine Down": 240,
    amt: 2000,
  },
  {
    name: "Feb",
    "Machine Running": 300,
    "Machine Down": 139,
    amt: 500,
  },
  {
    name: "Mar",
    "Machine Running": 435,
    "Machine Down": 942,
    amt: 1500,
  },
  {
    name: "Apr",
    "Machine Running": 452,
    "Machine Down": 355,
    amt: 3000,
  },
  {
    name: "May",
    "Machine Running": 784,
    "Machine Down": 480,
    amt: 2180,
  },
  {
    name: "Jun",
    "Machine Running": 239,
    "Machine Down": 380,
    amt: 2500,
  },
  {
    name: "Jul",
    "Machine Running": 349,
    "Machine Down": 430,
    amt: 342,
  },
  {
    name: "Aug",
    "Machine Running": 789,
    "Machine Down": 458,
    amt: 452,
  },
  {
    name: "Sep",
    "Machine Running": 442,
    "Machine Down": 785,
    amt: 2100,
  },
  {
    name: "Oct",
    "Machine Running": 349,
    "Machine Down": 430,
    amt: 1000,
  },
  {
    name: "Nov",
    "Machine Running": 349,
    "Machine Down": 430,
    amt: 2100,
  },
  {
    name: "Dec",
    "Machine Running": 785,
    "Machine Down": 452,
    amt: 2100,
  },
];

function LChart() {
  return (
    <div
      style={{
        marginTop: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <LineChart
        width={750}
        height={195}
        data={linedata}
        margin={{ top: 0, right: 15, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontal={false}
        />
        <XAxis dataKey="name" />
        <YAxis tickLine={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Machine Running"
          stroke="hsl(50.1deg 93.41% 48.78%)"
        />
        <Line
          type="monotone"
          dataKey="Machine Down"
          stroke="hsl(215.84deg 100% 15.1%)"
        />
      </LineChart>
    </div>
  );
}

export default LChart;
