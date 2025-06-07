import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HeaderComponent from './Components/Header';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import './App.css';
import WeatherDataComponent from './Components/WeatherData';
import TemperatureToggleButton from './Components/ToggleButton';
import ThemeToggleButton from './Components/ThemeMode';

const App = () => {
  const [city, setCity] = useState('Dubai'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchInputRef = useRef(null);
  const [unit , setUnit] = useState(true)
  const [theme , setTheme] = useState(false)
  const [arr , setArr] = useState([])
  const [showRecent , setShowRecent] = useState(false)
  const inputWrapperRef = useRef(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API; 

  // Fetch weather data
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err)
      setError('City not found. Please try again...');
      setWeatherData(null);
      setLoading(false);
    }
  };


  useEffect(() => {
    const recentSearches = localStorage.getItem('recently_searched')
    if(recentSearches) setArr(JSON.parse(recentSearches))
  } , [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target)
      ) {
        setShowRecent(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowRecent(!showRecent)
  }

  const handleDropdownItemClick = (city) => {
    setCity(city)
    setShowRecent(false)
  }

  // Handle Preferred Unit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === true ? false : true))
  }

  // Handle Preferred ThemeMode
  const toggleTheme = () => {
    setTheme((prevUnit) => (prevUnit === true ? false : true))
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      let StoredArray = localStorage.getItem("recently_searched")
      let arr = StoredArray ? JSON.parse(StoredArray) : []
      if(!arr.includes(city))
      {
        arr.push(city)
        localStorage.setItem('recently_searched' , JSON.stringify(arr))
        setArr(arr)
      }

      fetchWeatherData(city);
      searchInputRef.current.blur();
    }
  };

  // Fetch default city weather on initial render
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <TemperatureToggleButton toggleUnit={toggleUnit} unit={unit}/>
      <ThemeToggleButton toggleTheme={toggleTheme} isDark={theme}/>
      <div className={theme ? "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-700 text-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 animate-fadeIn" : "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl bg-white text-gray-800 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 animate-fadeIn"}>
        {/* Header */}
        <HeaderComponent/>

        {/* Unit Toggle Button */}
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center mb-6 sm:mb-8 gap-8">
          <div className="relative flex-1" ref={inputWrapperRef}>
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
            <input
              type="text"
              className={theme ? "w-full pl-10 pr-4 py-3 rounded-l-lg border-none bg-gray-400 placeholder-gray-500 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out sm:text-lg" : "w-full pl-10 pr-4 py-3 rounded-l-lg border-none bg-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out sm:text-lg"}
              placeholder="Enter city name"
              value={city}
              onClick={handleInputClick}
              onChange={(e) => setCity(e.target.value)}
              ref={searchInputRef}
            />
            {showRecent && arr.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 z-10 max-h-48 overflow-y-auto">
          {arr.map((item, index) => (
            <li
              key={index}
              onClick={() => handleDropdownItemClick(item)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out sm:text-lg"
          >
            <FiSearch className="inline-block" />
          </button>
        </form>

        

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-lg sm:text-xl animate-pulse">
            {error}
          </p>
        )}

        {/* Weather Data */}
        {weatherData && !loading && !error && (
          <WeatherDataComponent weatherData={weatherData} unit={unit}/>
        )}
      </div>
    </div>
  );
};

export default App;