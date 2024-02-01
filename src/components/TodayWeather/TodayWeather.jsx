import React from "react";
import AirConditions from "./AirConditions";
import DailyForecast from "./DailyForecast";
import Details from "./Details";

const TodayWeather = ({ data, forecastList }) => {
  return (
    <div className="p-12">
      <Details data={data} />
      <AirConditions data={data} />
      <DailyForecast data={data} forecastList={forecastList} />
    </div>
  );
};

export default TodayWeather;
