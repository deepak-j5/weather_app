import React from "react";

const AdditionalInfoComponent = (props) => {
    return(
        <>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-gray-600 text-sm sm:text-base lg:text-lg">
              <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                <p className="font-semibold">Feels Like</p>
                <p>{props.feelsLike}°{props.unit}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                <p className="font-semibold">Humidity</p>
                <p>{props.humidity}%</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                <p className="font-semibold">Wind Speed</p>
                <p>{props.windSpeed} km/h</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                <p className="font-semibold">Pressure</p>
                <p>{props.pressure} mb</p>
              </div>
            </div>
        </>
    )
}

export default AdditionalInfoComponent