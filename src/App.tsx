import { ReactNode, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

import "./App.css";

import UserData from "./data/data.json";

const TopBalance = () => {
  const [balance] = useState(921.48);

  return (
    <div className="topbalance">
      <div className="balance_wrapper">
        <h4>My Balance</h4>
        <p className="balance_num">
          $ <span className="balance_num">{balance}</span>
        </p>
      </div>
      <div className="circle_wrapper">
        <div className="white_circle"></div>
      </div>
    </div>
  );
};

interface MainProps {
  children: ReactNode;
}
const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="main_wrapper">
      <div className="main">
        <h1>Spending - Last 7 days</h1>
        {children}
      </div>
    </div>
  );
};

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface ChartProps {
  chartdata: ChartData;
  option: Record<string, unknown>;
}

const ChartCOM: React.FC<ChartProps> = ({ chartdata, option }) => {
  return <Bar data={chartdata} options={option}></Bar>;
};

interface BalanceInChartProps {
  total: ReactNode;
}

const BalanceInChart: React.FC<BalanceInChartProps> = ({ total }) => {
  return (
    <div className="balance_chart">
      <hr style={{ borderColor: "hsla(0, 0%, 0%,0.1)" }}></hr>
      <div className="bottom_balance_wrapper">
        <div className="monthly_balance">
          <h5>Total this month</h5>
          <p>
            <span>${total}</span>
          </p>
        </div>
        <div className="monthly_balance_per">
          <span>2.4%</span>
          <p>from last month</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  // const [total] = useState(() => {
  //   return UserData.map((data) => {
  //     return data.amount;
  //   }).reduce((acc, crr) => acc + crr);
  // });

  const [total] = useState(478.33);

  const [data] = useState({
    labels: UserData.map((data) => {
      return data.day;
    }),
    datasets: [
      {
        label: "",
        data: UserData.map((data) => {
          return data.amount;
        }),
        backgroundColor: [" hsl(10, 79%, 65%)"],
        hoverBackgroundColor: ["hsl(186, 34%, 60%)"],
      },
    ],
  });

  const option = {
    plugins: {
      tooltip: {
        displayColors: false, // Hide the color palette
        enabled: true, // Enable tooltips
        mode: "index", // Display one tooltip per data point
        intersect: false, // Show tooltip even if multiple bars are at the same point
        backgroundColor: "rgba(0, 0, 0, 1)", // Tooltip background color
        titleFont: {
          size: 16, // Title font size
        },
        bodyFont: {
          size: 13, // Body font size
          weight: "bold",
        },
        callbacks: {
          title: function () {
            return ""; // Hide the title
          },

          label: function (context: Record<string, unknown>) {
            // Customize the tooltip label content here

            return `$${context.raw}`;
          },
        },
      },
      title: {
        display: false, // Hide the top-level label
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis gridlines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false, // Hide Y-axis labels (ticks)
        },
        grid: {
          display: false, // Hide Y-axis gridlines
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 3,
      },
    },
  };

  return (
    <>
      <TopBalance></TopBalance>
      <Main>
        <ChartCOM chartdata={data} option={option}></ChartCOM>
        <BalanceInChart total={total}></BalanceInChart>
      </Main>
    </>
  );
}

export default App;
