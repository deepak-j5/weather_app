import React from "react";
import AdditionalInfoComponent from "./AdditionalInfo";

const WeatherDataComponent = (props) => {
    return(
        <>
        <div className="text-center animate-fadeIn">
            {/* City and Country */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
              {props.weatherData.location.name}, {props.weatherData.location.country}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg mb-4">
              {new Date(props.weatherData.location.localtime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            {/* Temperature */}
            <div className="flex justify-center items-center mb-4">
              {
                props.unit && (
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold ml-4">
                  {Math.round(props.weatherData.current.temp_c)}°C
                </p>
                )
              }
              {
                !props.unit && (
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold ml-4">
                  {Math.round(props.weatherData.current.temp_f)}°F
                </p>
                )
              }
            </div>

            {/* Weather Condition */}
            <p className="text-xl sm:text-2xl lg:text-3xl mb-4 capitalize">
              {props.weatherData.current.condition.text}
            </p>

            {/* Additional Details */}
            {
              props.unit && <AdditionalInfoComponent pressure={props.weatherData.current.pressure_mb} windSpeed={props.weatherData.current.wind_kph} humidity={props.weatherData.current.humidity} feelsLike={Math.round(props.weatherData.current.feelslike_c)} unit="C"/>
            }
            {
              !props.unit && <AdditionalInfoComponent pressure={props.weatherData.current.pressure_mb} windSpeed={props.weatherData.current.wind_kph} humidity={props.weatherData.current.humidity} feelsLike={Math.round(props.weatherData.current.feelslike_f)} unit="F" />
            }
          </div>
        </>
    )
}

export default WeatherDataComponent