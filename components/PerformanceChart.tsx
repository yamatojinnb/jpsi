"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from "chartjs-plugin-annotation";

// Custom plugin for white background
const backgroundPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels,
  annotationPlugin,
  backgroundPlugin
);

export default function PerformanceChart() {
  // Competition performance data (Oct 13 - Nov 21, 2024)
  const data = {
    labels: [
      "10/13/24",
      "10/19/24",
      "10/26/24",
      "11/3/24",
      "11/10/24",
      "11/17/24",
      "11/21/24",
    ],
    datasets: [
      {
        label: "TU München (1st)",
        data: [100, 100, 100, 118, 122, 118, 129],
        borderColor: "#8B0C19",
        backgroundColor: "rgba(139, 12, 25, 0.1)",
        borderWidth: 4,
        pointRadius: 6,
        pointHoverRadius: 10,
        tension: 0.4,
        pointBackgroundColor: "#8B0C19",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#8B0C19",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
      },
      {
        label: "2nd Place",
        data: [105, 112, 120, 113, 126, 127, 127],
        borderColor: "#D97706",
        backgroundColor: "rgba(217, 119, 6, 0.1)",
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        pointBackgroundColor: "#D97706",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#D97706",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
      },
      {
        label: "3rd Place",
        data: [100, 101, 100, 102, 114, 115, 115],
        borderColor: "#6B7280",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        pointBackgroundColor: "#6B7280",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#6B7280",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.3,
    layout: {
      padding: {
        right: 60,
        top: 10,
        bottom: 0,
        left: 0,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 12,
          font: {
            size: 12,
            family: "inherit",
          },
          color: "#1F2937",
        },
      },
      title: {
        display: false,
      },
      annotation: {
        annotations: {
          trumpElection: {
            type: "box" as const,
            xMin: 2.5,
            xMax: 4.5,
            backgroundColor: "rgba(251, 191, 36, 0.2)",
            borderColor: "rgba(251, 191, 36, 0.5)",
            borderWidth: 1,
            borderDash: [3, 3],
          },
        },
      },
      datalabels: {
        display: function (context: any) {
          // Only show label on the last data point
          return context.dataIndex === context.dataset.data.length - 1;
        },
        align: "right" as const,
        anchor: "end" as const,
        offset: 8,
        color: function (context: any) {
          // Match line color
          return context.dataset.borderColor;
        },
        font: {
          weight: "bold" as const,
          size: 14,
          family: "inherit",
        },
        formatter: function (value: any) {
          return value + "%";
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: function (context: any) {
          return context.dataset.borderColor;
        },
        borderWidth: 1,
        borderRadius: 4,
        padding: {
          top: 4,
          right: 6,
          bottom: 4,
          left: 6,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        titleColor: "#FFFFFF",
        bodyColor: "#E5E7EB",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 13,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return context.dataset.label + ": " + context.parsed.y + "%";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 95,
        max: 130,
        ticks: {
          stepSize: 5,
          callback: function (value: any) {
            return value + "%";
          },
          font: {
            size: 12,
          },
          color: "#374151",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
          lineWidth: 1,
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: "#374151",
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg h-full">
      <div className="mb-4">
        <h4 className="text-2xl font-bold text-gray-900">Performance Chart</h4>
      </div>

      <div className="flex-1">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
