import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

// Sample monthly data
const data = [
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

const transformData = (data) => {
  return data.map((item) => ({
    ...item,
    "Running Machine": item.uv,
    "Down Machine": item.pv,
  }));
};

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;
  const spacing = 8;
  return (
    <g>
      {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" /> */}
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

export default class Machine extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/bar-chart-with-min-height-9nmfg9";

  render() {
    const transformedData = transformData(data);
    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ fontWeight: "500" }}
      >
        <BarChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 25,
            right: 50,
            left: 10,
            bottom: 0,
          }}
          barSize={20}
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
          <Bar
            dataKey="Running Machine"
            fill="hsl(50.1deg 93.41% 48.78% / 68%)"
            minPointSize={5}
          >
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar
            dataKey="Down Machine"
            fill="hsl(215.84deg 100% 15.1%)"
            minPointSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
