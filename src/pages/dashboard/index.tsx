import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";
import Spinner from "@/component/spinner/Spinner";
import { FC, useState, useEffect, useRef } from "react";
import Highcharts, { Options, Chart } from "highcharts";
import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official";
import dynamic from "next/dynamic";

const WorldMapper = dynamic(() => import("@/component/mapper/WorldMapper"), {
  ssr: false,
});
const IndiaStateMapper = dynamic(
  () => import("@/component/mapper/IndiaStateMapper"),
  {
    ssr: false,
  }
);

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const donutChartRef1 = useRef<HighchartsReactRefObject>(null);
  const donutChartRef2 = useRef<HighchartsReactRefObject>(null);

  const drawTotal = (chart: Chart) => {
    const total = chart.series[0].data.reduce(
      (acc, point) => acc + (point.y ? point.y : 0),
      0
    );
    chart.renderer
      .text(`Total: ${total}`, 100, chart.plotHeight / 2 + chart.plotTop)
      .css({
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
      })
      .attr({ zIndex: 5 })
      .add();
  };

  useEffect(() => {
    if (donutChartRef1.current && donutChartRef1.current.chart) {
      drawTotal(donutChartRef1.current.chart);
    }
    if (donutChartRef2.current && donutChartRef2.current.chart) {
      drawTotal(donutChartRef2.current.chart);
    }
  }, []);

  const data1 = [
    { name: "Active", y: 30 },
    { name: "Subscription", y: 50 },
    { name: "Delete", y: 64 },
    { name: "Inactive", y: 80 },
  ];
  const data2 = [
    { name: "Active", y: 20 },
    { name: "Subscription", y: 50 },
    { name: "Delete", y: 40 },
    { name: "Inactive", y: 50 },
  ];
  const data3 = [
    { name: "Active", y: 30 },
    { name: "Subscription", y: 50 },
    { name: "Delete", y: 60 },
    { name: "Inactive", y: 50 },
  ];
  const data4 = [
    { name: "Active", y: 40 },
    { name: "Subscription", y: 50 },
    { name: "Delete", y: 24 },
    { name: "Inactive", y: 120 },
  ];
  const pieDataLabelsStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "1rem",
    textOutline: "none",
  };
  const donutDataLabelsStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "0.8rem",
    textOutline: "none",
  };
  const piePlotOptions = {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        distance: -50,
        format: "{point.percentage:.1f} %",
        style: pieDataLabelsStyle,
      },
    },
  };
  const donutPlotOptions = {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        distance: -35,
        format: "{point.percentage:.1f}%",
        style: donutDataLabelsStyle,
      },
      // center: ["50%", "50%"],
      // borderWidth: 3,
    },
    series: {
      animation: false,
      showInLegend: true,
    },
  };
  const options1: Options = {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Users",
    },
    subtitle: {
      text: "Active, Subscription, Delete, and Inactive",
    },
    plotOptions: piePlotOptions,
    series: [
      {
        type: "pie",
        name: "Users",
        data: data1,
      },
    ],
  };

  const options2: Options = {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Users",
    },
    subtitle: {
      text: "Active, Subscription, Delete, and Inactive",
    },
    plotOptions: piePlotOptions,
    series: [
      {
        type: "pie",
        name: "Users",
        data: data2,
      },
    ],
  };

  const donutChartOptions1: Options = {
    colors: ["#01BAF2", "#71BF45", "#FAA74B", "#B37CD2"],
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    title: {
      text: "Users",
    },
    subtitle: {
      text: "Active, Subscription, Delete, and Inactive",
    },
    tooltip: {
      pointFormat: "<b>{point.name}: {point.y}</b>",
    },
    plotOptions: donutPlotOptions,
    series: [
      {
        type: "pie",
        name: "Users",
        size: "100%",
        innerSize: "50%",
        data: data3,
      },
    ],
  };

  const donutChartOptions2: Options = {
    colors: ["#01BAF2", "#71BF45", "#FAA74B", "#B37CD2"],
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    title: {
      text: "Users",
    },
    subtitle: {
      text: "Active, Subscription, Delete, and Inactive",
    },
    tooltip: {
      pointFormat: "<b>{point.name}: {point.y}</b>",
    },
    plotOptions: donutPlotOptions,
    series: [
      {
        type: "pie",
        name: "Users",
        size: "100%",
        innerSize: "50%",
        data: data4,
      },
    ],
  };
  return (
    <div className="flex flex-col h-full ">
      <Spinner
        text="Loading..."
        closedIn={15000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <PageTitleBar title="Dashboard" />

      <div className="overflow-y-auto">
        <div className="flex flex-wrap justify-around">
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <HighchartsReact highcharts={Highcharts} options={options1} />
          </div>
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <HighchartsReact highcharts={Highcharts} options={options2} />
          </div>
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <HighchartsReact
              ref={donutChartRef1}
              highcharts={Highcharts}
              options={donutChartOptions1}
            />
          </div>
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <HighchartsReact
              ref={donutChartRef2}
              highcharts={Highcharts}
              options={donutChartOptions2}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 px-4">
            <h1 className="text-center">Locations Worldwide</h1>
            <WorldMapper />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h1 className="text-center">Locations in Indian States</h1>
            <IndiaStateMapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
