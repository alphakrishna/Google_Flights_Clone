// hooks/useFlightSearch.js
import { useState } from 'react';
import dayjs from 'dayjs';

export const useFlightSearch = () => {
  const [currentView, setCurrentView] = useState('search');
  const [tripType, setTripType] = useState('round-trip');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [fromLocation, setFromLocation] = useState('Hyderabad');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [sortBy, setSortBy] = useState('best');

  const handleSearch = () => {
    setCurrentView('results');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const searchData = {
    tripType,
    passengers,
    travelClass,
    fromLocation,
    toLocation,
    departureDate,
    returnDate,
    sortBy
  };

  const searchActions = {
    setTripType,
    setPassengers,
    setTravelClass,
    setFromLocation,
    setToLocation,
    setDepartureDate,
    setReturnDate,
    setSortBy,
    handleSearch,
    handleBackToSearch,
    swapLocations
  };

  return {
    currentView,
    searchData,
    searchActions
  };
};