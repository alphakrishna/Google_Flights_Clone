// hooks/useFlightData.js
import { useState, useEffect } from 'react';
import { mockFlights } from '../data/mockData';
// import axios from 'axios';

export const useFlightData = (searchData) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate API call with mock data
  const fetchFlights = async (searchParams) => {
    setLoading(true);
    setError(null);

    // const options = {
    //   method: 'GET',
    //   url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails',
    //   params: {
    //     legs: '[{"destination":"LOND","origin":"LAXA","date":"2025-12-12"}]',
    //     adults: '1',
    //     currency: 'USD',
    //     locale: 'en-US',
    //     market: 'en-US',
    //     cabinClass: 'economy',
    //     countryCode: 'US'
    //   },
    //   headers: {
    //     'x-rapidapi-key': '61ed8c85f7msheb039d99251f089p13aac6jsn2b0a38d8890f',
    //     'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    //   }
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);      
    //   setError('Failed to fetch flights. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
    try {      
      // Filter mock flights based on search criteria
      let filteredFlights = mockFlights.filter(flight => {
        // Basic filtering logic
        const matchesRoute = flight.departure.city.toLowerCase().includes(searchParams.fromLocation.toLowerCase()) ||
                            flight.arrival.city.toLowerCase().includes(searchParams.toLocation.toLowerCase());
        
        return matchesRoute;
      });

      // If no exact matches, return some sample flights
      if (filteredFlights.length === 0) {
        // Generate some mock flights based on search criteria
        filteredFlights = generateMockFlights(searchParams);
      }

      setFlights(filteredFlights);
    } catch (err) {
      setError('Failed to fetch flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate mock flights based on search parameters
  const generateMockFlights = (searchParams) => {
    const airlines = [
      'Delta Air Lines', 'IndiGo', 'Air India', 'Emirates', 'Singapore Airlines', 
      'Lufthansa', 'British Airways', 'Qatar Airways', 'American Airlines', 'United Airlines'
    ];
    
    const basePrice = getBasePriceForRoute(searchParams.fromLocation, searchParams.toLocation);
    
    return Array.from({ length: 5 }, (_, index) => ({
      id: Date.now() + index,
      airline: airlines[index % airlines.length],
      flightNumber: `${airlines[index % airlines.length].split(' ')[0].substring(0, 2).toUpperCase()} ${1000 + index}`,
      departure: {
        time: generateTime(6, 22), // Between 6 AM and 10 PM
        airport: getAirportCode(searchParams.fromLocation),
        city: searchParams.fromLocation
      },
      arrival: {
        time: generateTime(8, 23), // Arrival time
        airport: getAirportCode(searchParams.toLocation),
        city: searchParams.toLocation
      },
      duration: generateDuration(searchParams.fromLocation, searchParams.toLocation),
      stops: Math.floor(Math.random() * 3), // 0-2 stops
      price: Math.floor(basePrice + (Math.random() * basePrice * 0.5)), // ±50% variation
      emissions: `${Math.floor(Math.random() * 500 + 100)} kg CO₂`,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10 // 3.5-5.0 rating
    }));
  };

  const generateTime = (startHour, endHour) => {
    const hour = Math.floor(Math.random() * (endHour - startHour) + startHour);
    const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const generateDuration = (from, to) => {
    const distances = {
      'Hyderabad-New Delhi': 90,
      'Hyderabad-Mumbai': 90,
      'Hyderabad-Bangalore': 60,
      'Hyderabad-Chennai': 90,
      'Hyderabad-Singapore': 270,
      'Hyderabad-Dubai': 210,
      'Hyderabad-London': 540,
      'Hyderabad-New York': 900,
      'Hyderabad-San Francisco': 960,
      'Hyderabad-Sydney': 660,
      'Hyderabad-Tokyo': 420,
      'Hyderabad-Paris': 510,
      'Hyderabad-Amsterdam': 480
    };
    
    const routeKey = `${from}-${to}`;
    const reverseRouteKey = `${to}-${from}`;
    
    let baseDuration = distances[routeKey] || distances[reverseRouteKey] || 120;
    
    // Add some variation
    baseDuration += Math.floor(Math.random() * 60 - 30);
    
    const hours = Math.floor(baseDuration / 60);
    const minutes = baseDuration % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const getAirportCode = (city) => {
    const codes = {
      'Hyderabad': 'HYD',
      'New Delhi': 'DEL',
      'Mumbai': 'BOM',
      'Bangalore': 'BLR',
      'Chennai': 'MAA',
      'Kolkata': 'CCU',
      'Singapore': 'SIN',
      'Dubai': 'DXB',
      'London': 'LHR',
      'New York': 'JFK',
      'San Francisco': 'SFO',
      'Sydney': 'SYD',
      'Tokyo': 'NRT',
      'Paris': 'CDG',
      'Amsterdam': 'AMS'
    };
    return codes[city] || city.substring(0, 3).toUpperCase();
  };

  const getBasePriceForRoute = (from, to) => {
    const basePrices = {
      'domestic': 8000,
      'regional': 15000,
      'international': 45000
    };
    
    const domesticCities = ['Hyderabad', 'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
    const regionalCities = ['Singapore', 'Dubai'];
    
    const isDomestic = domesticCities.includes(from) && domesticCities.includes(to);
    const isRegional = (domesticCities.includes(from) && regionalCities.includes(to)) ||
                      (regionalCities.includes(from) && domesticCities.includes(to));
    
    if (isDomestic) return basePrices.domestic;
    if (isRegional) return basePrices.regional;
    return basePrices.international;
  };

  useEffect(() => {
    if (searchData && searchData.fromLocation && searchData.toLocation) {
      fetchFlights(searchData);
    }
  }, [searchData]);

  return {
    flights,
    loading,
    error,
    refetch: () => fetchFlights(searchData)
  };
};