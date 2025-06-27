// components/search/SearchForm.jsx
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import FlightLand from '@mui/icons-material/FlightLand';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import PersonOutline from '@mui/icons-material/PersonOutline';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Close from '@mui/icons-material/Close';
import Add from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import SearchIcon from '@mui/icons-material/Search';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const SearchForm = ({ searchData, searchActions }) => {
  const {
    tripType,
    passengers,
    travelClass,
    fromLocation,
    toLocation,
    departureDate,
    returnDate
  } = searchData;

  const {
    setTripType,
    setPassengers,
    setTravelClass,
    setFromLocation,
    setToLocation,
    setDepartureDate,
    setReturnDate,
    handleSearch,
    swapLocations
  } = searchActions;

  // Multi-city flights state
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: fromLocation || '', to: toLocation || '', date: departureDate || '' },
    { from: '', to: '', date: departureDate ||  '' }
  ]);

  const cities = [
    'Hyderabad',
    'New Delhi',
    'Mumbai',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Singapore',
    'Dubai',
    'London',
    'New York',
    'San Francisco',
    'Sydney',
    'Tokyo',
    'Paris',
    'Amsterdam'
  ];

  const travelClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tripType === 'multi-city') {
      // Check if at least two flights have all required fields
      const validFlights = multiCityFlights.filter(flight => 
        flight.from && flight.to && flight.date
      );
      if (validFlights.length >= 2) {
        handleSearch();
      }
    } else {
      if (fromLocation && toLocation && departureDate) {
        handleSearch();
      }
    }
  };

  const addFlight = () => {
    setMultiCityFlights([...multiCityFlights, { from: '', to: '', date: departureDate || '' }]);
  };

  const removeFlight = (index) => {
    if (multiCityFlights.length > 2) {
      const newFlights = multiCityFlights.filter((_, i) => i !== index);
      setMultiCityFlights(newFlights);
    }
  };

  const updateMultiCityFlight = (index, field, value) => {
    const newFlights = [...multiCityFlights];
    newFlights[index][field] = value;
    setMultiCityFlights(newFlights);
  };

  const swapMultiCityLocations = (index) => {
    const newFlights = [...multiCityFlights];
    const temp = newFlights[index].from;
    newFlights[index].from = newFlights[index].to;
    newFlights[index].to = temp;
    setMultiCityFlights(newFlights);
  };

  // Top row controls styling
  const topControlStyles = {
    minWidth: 'auto',
    '& .MuiOutlinedInput-root': {
      border: 'none',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.04)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(0,0,0,0.04)',
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiSelect-select': {
      padding: '8px 32px 8px 12px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#5f6368',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  // Main input field styling
  const inputFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      border: '1px solid #dadce0',
      borderRadius: '8px',
      fontSize: '16px',
      '&:hover': {
        borderColor: '#dadce0',
        boxShadow: '0 1px 6px rgba(32,33,36,.28)',
      },
      '&.Mui-focused': {
        borderColor: '#1a73e8',
        boxShadow: '0 1px 6px rgba(32,33,36,.28)',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1a73e8',
        borderWidth: '2px',
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiInputBase-input': {
      padding: '16px 14px',
      fontSize: '16px'
    }
  };

  const dateFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      border: '1px solid #dadce0',
      borderRadius: '8px',
      '&:hover': {
        borderColor: '#dadce0',
        boxShadow: '0 1px 6px rgba(32,33,36,.28)',
      },
      '&.Mui-focused': {
        borderColor: '#1a73e8',
        boxShadow: '0 1px 6px rgba(32,33,36,.28)',
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiInputBase-input': {
      padding: '16px 14px',
      fontSize: '16px'
    },
    '& .MuiInputLabel-root': {
      fontSize: '16px',
      '&.Mui-focused': {
        color: '#1a73e8'
      }
    }
  };

  const swapButtonStyles = {
    backgroundColor: 'white',
    border: '1px solid #dadce0',
    borderRadius: '50%',
    width: 36,
    height: 36,
    margin: '0 -20px',
    zIndex: 10,
    '&:hover': {
      backgroundColor: '#f8f9fa',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
    }
  };

  const renderAutocomplete = (value, onChange, placeholder, icon) => (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue || '')}
      options={cities}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          fullWidth
          sx={inputFieldStyles}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            )
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
        <li key={key} {...otherProps}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
              {icon}
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {option}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  City
                </Typography>
              </Box>
            </Box>
          </li>
        )}}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          paddingLeft: '12px !important'
        }
      }}
    />
  );

  return (
    <Card sx={{
      mb: 4,
      borderRadius: '8px',
      boxShadow: '-1px 3px 6px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      border: '1px solid #dadce0',
      overflow: 'visible'
    }}>
      <CardContent sx={{ p: 3 }}>
        {/* Top Controls */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 3,
          flexWrap: 'wrap'
        }}>
          <FormControl sx={topControlStyles}>
            <Select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              IconComponent={ExpandMore}
            >
              <MenuItem value="round-trip">
                <SwapHoriz sx={{ fontSize: 20, mr: 1 }} />
                Round trip
              </MenuItem>
              <MenuItem value="one-way">
                <ArrowRightAltIcon sx={{ fontSize: 20, mr: 1 }} />
                One way
              </MenuItem>
              <MenuItem value="multi-city">
                <MultipleStopIcon sx={{ fontSize: 20, mr: 1 }} />
                Multi-city
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={topControlStyles}>
            <Select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              IconComponent={ExpandMore}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <MenuItem key={num} value={num}>
                  <PersonOutline sx={{ fontSize: 20, mr: 1 }} />
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={topControlStyles}>
            <Select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              IconComponent={ExpandMore}
            >
              {travelClasses.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>

        <form onSubmit={handleSubmit}>
          {tripType === 'multi-city' ? (
            /* Multi-city Layout */
            <Box sx={{ mb: 3 }}>
              {multiCityFlights.map((flight, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                      gap: 2
                    }
                  }}>
                    {/* From Location */}
                    <Box sx={{ flex: 1 }}>
                      {renderAutocomplete(
                        flight.from,
                        (value) => updateMultiCityFlight(index, 'from', value),
                        'Where from?',
                        <FlightTakeoff sx={{ color: '#5f6368', fontSize: 20 }} />
                      )}
                    </Box>

                    {/* Swap Button for this flight */}
                    <IconButton 
                      onClick={() => swapMultiCityLocations(index)} 
                      sx={swapButtonStyles}
                    >
                      <SwapHoriz sx={{ color: '#5f6368', fontSize: 18 }} />
                    </IconButton>

                    {/* To Location */}
                    <Box sx={{ flex: 1 }}>
                      {renderAutocomplete(
                        flight.to,
                        (value) => updateMultiCityFlight(index, 'to', value),
                        'Where to?',
                        <FlightLand sx={{ color: '#5f6368', fontSize: 20 }} />
                      )}
                    </Box>

                    {/* Date */}
                    <Box sx={{ minWidth: 200 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Departure"
                          value={flight.date}
                          disablePast
                          onChange={(e) => updateMultiCityFlight(index, 'date', e)}
                        />
                      </LocalizationProvider>
                    </Box>

                    {/* Remove Button */}
                    {multiCityFlights.length > 2 && (
                      <IconButton 
                        onClick={() => removeFlight(index)}
                        sx={{
                          color: '#5f6368',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.04)'
                          }
                        }}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}

              {/* Add Flight Button */}
              <Button
                onClick={addFlight}
                startIcon={<Add />}
                sx={{
                  color: '#1a73e8',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(26,115,232,0.04)'
                  }
                }}
              >
                Add flight
              </Button>
            </Box>
          ) : (
            /* Single/Round trip Layout */
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 3,
              gap: 1,
              '@media (max-width: 768px)': {
                flexDirection: 'column',
                gap: 2
              }
            }}>
              {/* From Location */}
              <Box sx={{ flex: 1 }}>
                {renderAutocomplete(
                  fromLocation,
                  setFromLocation,
                  'Where from?',
                  <FlightTakeoff sx={{ color: '#5f6368', fontSize: 20 }} />
                )}
              </Box>

              {/* Swap Button - only show for non-multi-city */}
              {tripType !== 'multi-city' && (
                <IconButton 
                  onClick={swapLocations} 
                  sx={swapButtonStyles}
                >
                  <SwapHoriz sx={{ color: '#5f6368', fontSize: 18 }} />
                </IconButton>
              )}
              {/* To Location */}
              <Box sx={{ flex: 1 }}>
                {renderAutocomplete(
                  toLocation,
                  setToLocation,
                  'Where to?',
                  <FlightLand sx={{ color: '#5f6368', fontSize: 20 }} />
                )}
              </Box>

              {/* Date Field */}
              <Box sx={{ minWidth: 200 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Departure"
                    value={departureDate}
                    disablePast 
                    onChange={(e) => {setDepartureDate(e)}}
                  />
                </LocalizationProvider>
              </Box>

              {/* Return Date for Round Trip */}
              {tripType === 'round-trip' && (
                <Box sx={{ minWidth: 200 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Return"
                      value={returnDate}
                      disablePast 
                      onChange={(e) => {setReturnDate(e)}}
                    />
                  </LocalizationProvider>
                </Box>
              )}
            </Box>
          )}

          {/* Search Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '-3rem' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={
                tripType === 'multi-city' 
                  ? multiCityFlights.filter(f => f.from && f.to && f.date).length < 2
                  : !fromLocation || !toLocation || !departureDate
              }
              sx={{
                borderRadius: '24px',
                display: 'flex',
                gap: '8px',
                textTransform: 'none',
                backgroundColor: '#1a73e8',
                fontSize: '16px',
                fontWeight: 600,
                minWidth: 120,
                color: 'white',
                boxShadow: '0 2px 8px rgba(26,115,232,.2)',
                '&:hover': { 
                  backgroundColor: '#1557b0',
                  boxShadow: '0 2px 8px rgba(26,115,232,.6)'
                },
                '&:disabled': { 
                  backgroundColor: '#f1f3f4', 
                  color: '#9aa0a6' 
                },
              }}
            >
              <SearchIcon sx={{marginLeft: '-8px'}}/>
              Explore
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};