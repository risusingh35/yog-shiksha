import PageTitleBar from "@/component/pageTitleBar/PageTitleBar";
import Spinner from "@/component/spinner/Spinner";
import { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import  { Options } from "highcharts";
import ChartComponent from "@/component/highChart/ChartComponent";
import AreasplineGraph from "@/component/highChart/AreasplineGraph";

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
  const getTotal=(data:any)=>{
    let total=data.reduce(
      (acc:any, point:any) => acc + point.y,
      0
    );
      
    return total
  }
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
      series: {
        animation: false,
        showInLegend: true,
      },
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
      text: `User<br>${getTotal(data3)}`,
      align: 'center',
      verticalAlign: 'middle',
      y: 15,
      style: {
          fontSize: '1.1em'
      }
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
    // title: {
    //   text: "Users",
    // },
    // subtitle: {
    //   text: "Active, Subscription, Delete, and Inactive",
    // },
    title: {
      text: `User<br>${getTotal(data4)}`,
      align: 'center',
      verticalAlign: 'middle',
      y: 15,
      style: {
          fontSize: '1.1em'
      }
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
  const generateMonthlyIncomeData = () => {
    const data: Record<number, number[]> = {};
    const now = new Date();
    const currentYear = now.getFullYear();
  
    for (let year = currentYear - 4; year <= currentYear; year++) {
      data[year] = [];
      for (let month = 0; month < 12; month++) {
        const income = Math.floor(Math.random() * 5000) + 1000; // Random income between 1000 and 6000
        data[year].push(income);
      }
    }
    return data;
  };
  
  const monthlyIncomeData = generateMonthlyIncomeData();
  
  const lineChartSeriesData = Object.keys(monthlyIncomeData).map((year) => ({
    name: year,
    type: "line" as const, // Ensure type is 'line'
    data: monthlyIncomeData[Number(year)],
  }));
  
  const lineChartOptions: Options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Monthly Income Comparison for the Last 5 Years",
    },
    xAxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      title: {
        text: "Months",
      },
    },
    yAxis: {
      title: {
        text: "Income",
      },
    },
    series: lineChartSeriesData,
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>${this.x}: ${this.y}`;
      },
    },
    credits: {
      enabled: false,
    },
  };
  const barChartSeriesData = Object.keys(monthlyIncomeData).map((year) => ({
    name: year,
    type: "column" as const, // Ensure type is 'line'
    data: monthlyIncomeData[Number(year)],
  }));
  
  const barChartOptions: Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Monthly Income Comparison for the Last 5 Years",
    },
    xAxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      title: {
        text: "Months",
      },
    },
    yAxis: {
      title: {
        text: "Income",
      },
    },
    series: barChartSeriesData,
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>${this.x}: ${this.y}`;
      },
    },
    credits: {
      enabled: false,
    },
  };
  const areaSplineChartOption:Options={

  }
  return (
    <div className="flex flex-col h-full">
      <Spinner
        text="Loading..."
        closedIn={15000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <PageTitleBar title="Dashboard" />
      <div className="overflow-y-auto w-full max-w-full">
      <div className="flex ">
          <div className="p-2 w-full">
          <AreasplineGraph/>
          </div>
        </div>
        <div className="flex flex-wrap justify-around">
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <ChartComponent options={options1} />
          </div>
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <ChartComponent options={options2} />
          </div>
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <ChartComponent options={donutChartOptions1} drawTotal={true} />
          </div>
          <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/4 p-2">
            <ChartComponent options={donutChartOptions2} drawTotal={true} />
          </div>
        </div>
        <div className="flex ">
          <div className="p-2 w-full">
          <ChartComponent options={lineChartOptions}/>
          </div>
        </div>
        <div className="flex ">
          <div className="p-2 w-full">
          <ChartComponent options={barChartOptions}/>
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
