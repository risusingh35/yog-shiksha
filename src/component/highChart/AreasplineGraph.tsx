import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import generateRandomNumber from "@/utils/generateRandomNumber";

const generateInitialData = () => {
  const data = [];
  const now = Date.now();
  for (let i = -60000; i <= 0; i += 1000) {
    data.push([now + i, generateRandomNumber(1, 100)]);
  }
  return data;
};

const AreasplineGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current.chart;
    const series = chart.series[0];

    const updateData = () => {
        const lastPoint = series.data[series.data.length - 1];
        const lastTimestamp = lastPoint ? lastPoint.x : Date.now();
        const newPoint = [lastTimestamp + 1000, generateRandomNumber(1, 100)];
        series.addPoint(newPoint, true, false); // Do not remove old points
        
        // Shift x-axis to latest data point
        chart.xAxis[0].setExtremes(lastTimestamp - 60000, lastTimestamp + 1000);
      };

    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      zoomType: 'x',
      type: "areaspline",
    },
    title: {
      text: "Live Data Areaspline Graph",
    },
    xAxis: {
        type: "datetime",
        labels: {
          format: "{value:%H:%M:%S}",
        },
        tickInterval: 1000,
        max: Date.now() + 1000, // Show only the latest 1 minute of data
      },
    scrollbar: {
      enabled: true,
    },
    navigator: {
      enabled: false,
    },
    series: [
      {
        name: "Random Data",
        data: generateInitialData(),
      },
    ],
    plotOptions: {
      series: {
        animation: {
          duration: 2000,
        },
        turboThreshold: 0,
      },
    },
    time: {
      useUTC: false,
    },
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default AreasplineGraph;