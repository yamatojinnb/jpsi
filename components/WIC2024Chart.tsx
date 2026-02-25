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
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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

// Generate smooth interpolated data with many points
const generateSmoothData = (
  originalData: number[],
  targetPoints: number = 100
): number[] => {
  const result: number[] = [];
  const segmentCount = originalData.length - 1;
  const pointsPerSegment = Math.floor(targetPoints / segmentCount);

  for (let i = 0; i < originalData.length - 1; i++) {
    const start = originalData[i];
    const end = originalData[i + 1];

    for (let j = 0; j < pointsPerSegment; j++) {
      const t = j / pointsPerSegment;
      const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      result.push(start + (end - start) * easedT);
    }
  }

  result.push(originalData[originalData.length - 1]);
  return result;
};

// Generate corresponding date labels
const generateSmoothLabels = (
  originalLabels: string[],
  targetPoints: number = 100
): string[] => {
  const result: string[] = [];
  const segmentCount = originalLabels.length - 1;
  const pointsPerSegment = Math.floor(targetPoints / segmentCount);

  for (let i = 0; i < originalLabels.length - 1; i++) {
    for (let j = 0; j < pointsPerSegment; j++) {
      result.push("");
    }
  }
  result.push("");
  return result;
};

export default function WIC2024Chart() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [animationProgress, setAnimationProgress] = useState(0);

  // Original WIC2024 data
  const originalData1 = [100, 100, 100, 118, 122, 118, 129]; // TU München (1st)
  const originalData2 = [105, 112, 120, 113, 126, 127, 127]; // 2nd Place
  const originalData3 = [100, 101, 100, 102, 114, 115, 115]; // 3rd Place
  const originalLabels = [
    "10/13/24",
    "10/19/24",
    "10/26/24",
    "11/3/24",
    "11/10/24",
    "11/17/24",
    "11/21/24",
  ];

  const smoothData1 = generateSmoothData(originalData1, 100);
  const smoothData2 = generateSmoothData(originalData2, 100);
  const smoothData3 = generateSmoothData(originalData3, 100);
  const smoothLabels = generateSmoothLabels(originalLabels, 100);

  const totalPoints = smoothData1.length;

  const originalLabelIndices: number[] = [];
  const segmentCount = originalLabels.length - 1;
  const pointsPerSegment = Math.floor(totalPoints / segmentCount);
  for (let i = 0; i < originalLabels.length; i++) {
    originalLabelIndices.push(i * pointsPerSegment);
  }
  originalLabelIndices[originalLabelIndices.length - 1] = totalPoints - 1;

  // Smoother animation: 60 fps for 3 seconds = 180 frames
  const totalDuration = 3000;
  const fps = 60;
  const totalFrames = (totalDuration / 1000) * fps;

  useEffect(() => {
    if (inView) {
      let frame = 0;
      const animate = () => {
        frame++;
        const progress = (frame / totalFrames) * (totalPoints - 1);
        setAnimationProgress(Math.min(progress, totalPoints - 1));

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView]);

  // Create smooth interpolated data
  const getInterpolatedData = (fullData: number[]) => {
    const currentIndex = Math.floor(animationProgress);
    const progress = animationProgress - currentIndex;

    return fullData.map((value, index) => {
      if (index < currentIndex) {
        return value;
      } else if (index === currentIndex) {
        if (currentIndex === fullData.length - 1) {
          return value;
        } else {
          const nextValue = fullData[currentIndex + 1];
          return value + (nextValue - value) * progress;
        }
      } else {
        return null;
      }
    });
  };

  const data = {
    labels: smoothLabels,
    datasets: [
      {
        label: "TU München (1st)",
        data: getInterpolatedData(smoothData1),
        borderColor: "#8B0C19",
        backgroundColor: "rgba(139, 12, 25, 0.1)",
        borderWidth: 4,
        pointRadius: (context: any) => {
          const currentPoint = Math.floor(animationProgress);
          const atCurrentPoint = context.dataIndex === currentPoint;
          const beforeCurrentPoint = context.dataIndex < currentPoint;
          const isOriginalPoint = originalLabelIndices.includes(context.dataIndex);
          if ((beforeCurrentPoint || (atCurrentPoint && animationProgress - currentPoint > 0.95)) && isOriginalPoint) {
            return 6;
          }
          return 0;
        },
        pointHoverRadius: 8,
        tension: 0.4,
        pointBackgroundColor: "#8B0C19",
        pointBorderColor: "transparent",
        pointBorderWidth: 0,
        pointHoverBackgroundColor: "#8B0C19",
        pointHoverBorderColor: "transparent",
        pointHoverBorderWidth: 0,
        spanGaps: false,
        segment: {
          borderColor: (ctx: any) => {
            const currentPoint = Math.floor(animationProgress);
            if (ctx.p1DataIndex > currentPoint + 1) {
              return "transparent";
            }
            return undefined;
          },
        },
      },
      {
        label: "2nd Place",
        data: getInterpolatedData(smoothData2),
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        borderWidth: 3,
        pointRadius: (context: any) => {
          const currentPoint = Math.floor(animationProgress);
          const atCurrentPoint = context.dataIndex === currentPoint;
          const beforeCurrentPoint = context.dataIndex < currentPoint;
          const isOriginalPoint = originalLabelIndices.includes(context.dataIndex);
          if ((beforeCurrentPoint || (atCurrentPoint && animationProgress - currentPoint > 0.95)) && isOriginalPoint) {
            return 5;
          }
          return 0;
        },
        pointHoverRadius: 7,
        tension: 0.4,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "transparent",
        pointBorderWidth: 0,
        pointHoverBackgroundColor: "#F59E0B",
        pointHoverBorderColor: "transparent",
        pointHoverBorderWidth: 0,
        spanGaps: false,
        segment: {
          borderColor: (ctx: any) => {
            const currentPoint = Math.floor(animationProgress);
            if (ctx.p1DataIndex > currentPoint + 1) {
              return "transparent";
            }
            return undefined;
          },
        },
      },
      {
        label: "3rd Place",
        data: getInterpolatedData(smoothData3),
        borderColor: "#6B7280",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        borderWidth: 3,
        pointRadius: (context: any) => {
          const currentPoint = Math.floor(animationProgress);
          const atCurrentPoint = context.dataIndex === currentPoint;
          const beforeCurrentPoint = context.dataIndex < currentPoint;
          const isOriginalPoint = originalLabelIndices.includes(context.dataIndex);
          if ((beforeCurrentPoint || (atCurrentPoint && animationProgress - currentPoint > 0.95)) && isOriginalPoint) {
            return 5;
          }
          return 0;
        },
        pointHoverRadius: 7,
        tension: 0.4,
        pointBackgroundColor: "#6B7280",
        pointBorderColor: "transparent",
        pointBorderWidth: 0,
        pointHoverBackgroundColor: "#6B7280",
        pointHoverBorderColor: "transparent",
        pointHoverBorderWidth: 0,
        spanGaps: false,
        segment: {
          borderColor: (ctx: any) => {
            const currentPoint = Math.floor(animationProgress);
            if (ctx.p1DataIndex > currentPoint + 1) {
              return "transparent";
            }
            return undefined;
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.3,
    animation: {
      duration: 0,
    },
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
            xMin: ((smoothLabels.length - 1) / (originalLabels.length - 1)) * 2.5,
            xMax: ((smoothLabels.length - 1) / (originalLabels.length - 1)) * 4.5,
            backgroundColor: "rgba(252, 211, 77, 0.25)",
            borderWidth: 0,
            display: animationProgress > ((smoothLabels.length - 1) / (originalLabels.length - 1)) * 3.5,
          },
        },
      },
      datalabels: {
        display: function (context: any) {
          return (
            context.dataIndex === Math.floor(animationProgress) &&
            context.dataIndex === totalPoints - 1 &&
            animationProgress >= totalPoints - 1
          );
        },
        align: "right" as const,
        anchor: "end" as const,
        offset: 8,
        color: function (context: any) {
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
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 4,
        padding: {
          top: 4,
          right: 6,
          bottom: 4,
          left: 6,
        },
      },
      tooltip: {
        enabled: animationProgress >= totalPoints - 1,
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
          weight: "bold" as "bold",
        },
        bodyFont: {
          size: 12,
        },
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            if (context.parsed && context.parsed.y !== null) {
              return context.dataset.label + ": " + context.parsed.y.toFixed(0) + "%";
            }
            return "";
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
          autoSkip: false,
          callback: function (_value: any, index: number) {
            for (let i = 0; i < originalLabelIndices.length; i++) {
              if (index === originalLabelIndices[i]) {
                return originalLabels[i];
              }
            }
            return "";
          },
          maxRotation: 45,
          minRotation: 45,
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
    <div ref={ref} className="bg-white rounded-xl p-6 shadow-lg h-full">
      <div className="mb-4">
        <h4 className="text-2xl font-bold text-gray-900">Performance Chart</h4>
      </div>
      <div className="flex-1">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}





