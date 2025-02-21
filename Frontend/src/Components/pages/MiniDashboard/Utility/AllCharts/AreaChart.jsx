import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  {
    name: "Jan",
    uv: 400,
    pv: 240,
    amt: 2000,
  },
  {
    name: "Feb",
    uv: 300,
    pv: 139,
    amt: 500,
  },
  {
    name: "Mar",
    uv: 435,
    pv: 942,
    amt: 1500,
  },
  {
    name: "Apr",
    uv: 452,
    pv: 355,
    amt: 3000,
  },
  {
    name: "May",
    uv: 784,
    pv: 480,
    amt: 2180,
  },
  {
    name: "Jun",
    uv: 239,
    pv: 380,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 349,
    pv: 430,
    amt: 342,
  },
  {
    name: "Aug",
    uv: 789,
    pv: 458,
    amt: 452,
  },
  {
    name: "Sep",
    uv: 442,
    pv: 785,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 349,
    pv: 430,
    amt: 1000,
  },
  {
    name: "Nov",
    uv: 349,
    pv: 430,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 785,
    pv: 452,
    amt: 2100,
  },
];

const transformData = (chartData) => {
  return chartData.map((item) => ({
    ...item,
    "Running Machine": item.uv,
    "Down Machine": item.pv,
  }));
};

function AreaChart() {
  const transformedData = transformData(chartData);
  return (
    <div style={{ width: "100%", height: "200px" }}>
      <ResponsiveContainer>
        <RechartsAreaChart
          data={transformedData}
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="colorRunningMachine"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="hsl(50.1deg 93.41% 48.78%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(50.1deg 93.41% 48.78%)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorDownMachine" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(215.84deg 100% 15.1%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(215.84deg 100% 15.1%)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
          />
          <XAxis dataKey="name" />
          <YAxis tickLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Running Machine"
            stroke="hsl(50.1deg 93.41% 48.78%)"
            fillOpacity={1}
            fill="url(#colorRunningMachine)"
          />
          <Area
            type="monotone"
            dataKey="Down Machine"
            stroke="hsl(215.84deg 100% 15.1%)"
            fillOpacity={1}
            fill="url(#colorDownMachine)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChart;
