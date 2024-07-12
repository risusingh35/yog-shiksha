import { FC, useRef, useEffect } from "react";
import Highcharts, { Options, Chart } from "highcharts";
import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official";

interface ChartComponentProps {
  options: Options;
  drawTotal?: boolean;
}

const ChartComponent: FC<ChartComponentProps> = ({ options, drawTotal }) => {
  const chartRef = useRef<HighchartsReactRefObject>(null);

//   const calculateTotal = (chart: Chart) => {
//     const total = chart.series[0].data.reduce(
//       (acc, point) => acc + (point.y ? point.y : 0),
//       0
//     );

//     // Calculate the center dynamically based on chart dimensions
//     const centerX = (( chart.plotWidth)/2 ) ;
//     const centerY = chart.plotTop + chart.plotHeight / 2;
//     const x = chart.series.center[0] + chart.plotLeft;
//     chart.renderer
//       .text(`Total<br/><strong>${total}</strong>`,0,centerY)
//       .css({
//         color: "#000",
//         textAnchor: "middle",
//         fontSize: "16px",
//         fontWeight: "bold",
//         textAlign: "center",
//       })
//       .attr({ zIndex: 5 })
//       .add();
//   };

//   useEffect(() => {
//     if (drawTotal && chartRef.current && chartRef.current.chart) {
//       calculateTotal(chartRef.current.chart);
//     }
//   }, [drawTotal]);

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
  );
};

export default ChartComponent;
