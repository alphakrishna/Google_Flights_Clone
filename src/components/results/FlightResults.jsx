// components/results/FlightResults.jsx
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  Schedule as ScheduleIcon,
  AttachMoney as PriceIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { FlightCard } from '../common/FlightCard';
import { useFlightData } from '../../hooks/useFlightData';

export const FlightResults = ({ searchData, searchActions, onBack }) => {
  const { flights, loading, error } = useFlightData(searchData);
  const { setSortBy, sortBy } = searchActions;

  const sortOptions = [
    { value: 'best', label: 'Best', icon: <StarIcon sx={{ fontSize: 16 }} /> },
    { value: 'cheapest', label: 'Cheapest', icon: <PriceIcon sx={{ fontSize: 16 }} /> },
    { value: 'fastest', label: 'Fastest', icon: <ScheduleIcon sx={{ fontSize: 16 }} /> }
  ];

  const getSortedFlights = () => {
    if (!flights) return [];
    
    const flightsCopy = [...flights];
    switch (sortBy) {
      case 'cheapest':
        return flightsCopy.sort((a, b) => a.price - b.price);
      case 'fastest':
        return flightsCopy.sort((a, b) => {
          const aDuration = parseInt(a.duration.replace(/[^\d]/g, ''));
          const bDuration = parseInt(b.duration.replace(/[^\d]/g, ''));
          return aDuration - bDuration;
        });
      case 'best':
      default:
        return flightsCopy.sort((a, b) => {
          // Best = combination of price, duration, and rating
          const aScore = (a.rating * 0.3) + (1 / (a.price / 10000) * 0.4) + (1 / parseInt(a.duration.replace(/[^\d]/g, '')) * 0.3);
          const bScore = (b.rating * 0.3) + (1 / (b.price / 10000) * 0.4) + (1 / parseInt(b.duration.replace(/[^\d]/g, '')) * 0.3);
          return bScore - aScore;
        });
    }
  };

  const sortedFlights = getSortedFlights();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h6" color="text.secondary">
          Searching for flights...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button onClick={onBack} variant="outlined">
          Back to Search
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with Back Button and Search Summary */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={onBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {searchData.fromLocation} → {searchData.toLocation}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            label={`${searchData.tripType}`} 
            size="small" 
            sx={{ textTransform: 'capitalize' }}
          />
          <Chip 
            label={`${searchData.passengers} ${searchData.passengers === 1 ? 'passenger' : 'passengers'}`} 
            size="small" 
          />
          <Chip 
            label={searchData.travelClass} 
            size="small" 
          />
          <Chip 
            label={searchData.departureDate?.format('MMM DD, YYYY') || 'No date'} 
            size="small" 
          />
          {searchData.tripType === 'round-trip' && searchData.returnDate && (
            <Chip 
              label={`Return: ${searchData.returnDate?.format('MMM DD, YYYY')}`} 
              size="small" 
            />
          )}
        </Box>
      </Box>

      {/* Sort and Filter Controls */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ py: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Sort by:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? 'contained' : 'outlined'}
                      size="small"
                      startIcon={option.icon}
                      onClick={() => setSortBy(option.value)}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 20,
                        bgcolor: sortBy === option.value ? '#4285f4' : 'transparent',
                        '&:hover': {
                          bgcolor: sortBy === option.value ? '#3367d6' : 'rgba(66, 133, 244, 0.08)'
                        }
                      }}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {sortedFlights.length} flights found
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FilterIcon />}
                  sx={{ textTransform: 'none', borderRadius: 20 }}
                >
                  Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Flight Results */}
      <Box>
        {sortedFlights.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No flights found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search criteria or dates
              </Typography>
              <Button onClick={onBack} variant="contained">
                Modify Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {sortedFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
            
            {/* Load More Button */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 25,
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderColor: '#dadce0',
                  color: '#3c4043',
                  '&:hover': {
                    borderColor: '#4285f4',
                    bgcolor: 'rgba(66, 133, 244, 0.04)'
                  }
                }}
              >
                Show more flights
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};