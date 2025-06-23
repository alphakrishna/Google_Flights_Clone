import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  IconButton,
  Divider,
  Grid,
  Container,
  Tab,
  Tabs,
  Avatar,
  Rating,
  InputAdornment,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Flight as FlightIcon,
  SwapHoriz as SwapIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Menu as MenuIcon,
  Apps as AppsIcon,
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Map as MapIcon,
  Explore as ExploreIcon,
  Hotel as HotelIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const GoogleFlightsClone = () => {
  const [currentView, setCurrentView] = useState('search');
  const [tripType, setTripType] = useState('round-trip');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [fromLocation, setFromLocation] = useState('Hyderabad');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [sortBy, setSortBy] = useState('best');
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock flight data
  const mockFlights = [
    {
      id: 1,
      airline: 'Delta Air Lines',
      flightNumber: 'DL 1234',
      departure: { 
        time: '7:00 AM', 
        airport: 'HYD', 
        city: 'Hyderabad'
      },
      arrival: { 
        time: '10:30 AM', 
        airport: 'DEL', 
        city: 'New Delhi'
      },
      duration: '2h 30m',
      stops: 0,
      price: 6629,
      emissions: '156 kg CO₂',
      rating: 4.2
    },
    {
      id: 2,
      airline: 'IndiGo',
      flightNumber: '6E 5678',
      departure: { 
        time: '9:15 AM', 
        airport: 'HYD', 
        city: 'Hyderabad'
      },
      arrival: { 
        time: '1:45 PM', 
        airport: 'SIN', 
        city: 'Singapore'
      },
      duration: '4h 30m',
      stops: 1,
      price: 8234,
      emissions: '289 kg CO₂',
      rating: 4.0
    },
    {
      id: 3,
      airline: 'Air India',
      flightNumber: 'AI 9012',
      departure: { 
        time: '2:20 PM', 
        airport: 'HYD', 
        city: 'Hyderabad'
      },
      arrival: { 
        time: '5:55 PM', 
        airport: 'SFO', 
        city: 'San Francisco'
      },
      duration: '15h 35m',
      stops: 2,
      price: 45312,
      emissions: '1,142 kg CO₂',
      rating: 4.3
    }
  ];

  const popularDestinations = [
    { city: 'New Delhi', country: 'India', price: '₹6,629', image: '🏛️', dates: 'Jul 21 — Jul 30', duration: 'Nonstop • 2 hr 20 min' },
    { city: 'Singapore', country: 'Singapore', price: '₹8,234', image: '🏙️', dates: 'Jul 4 — Jul 12', duration: '1 stop • 4 hr 30 min' },
    { city: 'San Francisco', country: 'United States', price: '₹45,312', image: '🌉', dates: 'Aug 18 — Aug 26', duration: '2 stops • 15 hr 35 min' },
    { city: 'Sydney', country: 'Australia', price: '₹52,890', image: '🏗️', dates: 'Aug 1 — Aug 8', duration: '1 stop • 12 hr 45 min' }
  ];

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

  const formatStops = (stops) => {
    if (stops === 0) return 'Nonstop';
    if (stops === 1) return '1 stop';
    return `${stops} stops`;
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Header Component - More accurate to Google's header
  const Header = () => (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black' }}>
      <Toolbar sx={{ px: 2, minHeight: '64px !important' }}>
        <IconButton sx={{ mr: 2, color: '#5f6368' }}>
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Typography variant="h6" sx={{ color: '#4285f4', fontWeight: 400, mr: 1 }}>
            Google
          </Typography>
          <Typography variant="h6" sx={{ color: '#ea4335', fontWeight: 400, mr: 1 }}>
            Travel
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#5f6368' }} onClick={handleMenuClick}>
            <AppsIcon />
          </IconButton>
          <IconButton sx={{ color: '#5f6368' }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 1 }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText>Search</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><MapIcon /></ListItemIcon>
            <ListItemText>Maps</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Tabs value={0} sx={{ minHeight: 48 }}>
          <Tab 
            icon={<FlightIcon sx={{ fontSize: 20 }} />}
            label="Flights" 
            sx={{ 
              textTransform: 'none', 
              color: '#1976d2', 
              fontWeight: 500,
              minHeight: 48,
              '&.Mui-selected': { color: '#1976d2' }
            }} 
          />
          <Tab 
            icon={<HotelIcon sx={{ fontSize: 20 }} />}
            label="Hotels" 
            sx={{ 
              textTransform: 'none', 
              color: '#5f6368',
              minHeight: 48
            }} 
          />
          <Tab 
            icon={<HomeIcon sx={{ fontSize: 20 }} />}
            label="Vacation rentals" 
            sx={{ 
              textTransform: 'none', 
              color: '#5f6368',
              minHeight: 48
            }} 
          />
        </Tabs>
      </Box>
    </AppBar>
  );

  // Search Form Component - Updated to match Google's design
  const SearchForm = () => (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Image Area */}
      <Box 
        sx={{ 
          height: '400px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 600\'%3E%3Cpath d=\'M100 200L200 150L300 200L400 100L500 150L600 100L700 200L800 150L900 100L1000 200L1100 150\' stroke=\'%23ffffff\' stroke-width=\'2\' fill=\'none\' opacity=\'0.1\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover'
          }
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 300, mb: 2 }}>
            Flights
          </Typography>
          <FlightIcon sx={{ fontSize: 80, opacity: 0.7 }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -15, position: 'relative', zIndex: 2 }}>
        {/* Trip Type Selection */}
        <Box sx={{ mb: 3 }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              sx={{ gap: 3 }}
            >
              <FormControlLabel 
                value="round-trip" 
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} 
                label={<Typography sx={{ color: 'white' }}>Round trip</Typography>}
              />
              <FormControlLabel 
                value="one-way" 
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} 
                label={<Typography sx={{ color: 'white' }}>One way</Typography>}
              />
              <FormControlLabel 
                value="multi-city" 
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} 
                label={<Typography sx={{ color: 'white' }}>Multi-city</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Main Search Card */}
        <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
          {/* Location Row */}
          <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
            <TextField
              fullWidth
              label="Where from?"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="Where from?"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: '#5f6368' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  borderRadius: 0,
                  borderRight: '1px solid #e0e0e0',
                  minHeight: 56
                }
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', px: 1, borderRight: '1px solid #e0e0e0' }}>
              <IconButton onClick={swapLocations} sx={{ color: '#1976d2' }}>
                <SwapIcon />
              </IconButton>
            </Box>
            
            <TextField
              fullWidth
              label="Where to?"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              placeholder="Where to?"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: '#5f6368' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  borderRadius: 0,
                  minHeight: 56
                }
              }}
            />
          </Box>

          <Divider />

          {/* Date and Passenger Row */}
          <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
            <TextField
              type="date"
              label="Departure"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon sx={{ color: '#5f6368' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  borderRadius: 0,
                  borderRight: '1px solid #e0e0e0',
                  minHeight: 56
                }
              }}
            />
            
            {tripType === 'round-trip' && (
              <TextField
                type="date"
                label="Return"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon sx={{ color: '#5f6368' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' },
                    borderRadius: 0,
                    borderRight: '1px solid #e0e0e0',
                    minHeight: 56
                  }
                }}
              />
            )}
            
            <Box sx={{ 
              flex: 1, 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              minHeight: 56
            }}>
              <PersonIcon sx={{ color: '#5f6368' }} />
              <FormControl size="small" sx={{ minWidth: 60 }}>
                <Select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  displayEmpty
                >
                  {[1,2,3,4,5,6].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="Premium economy">Premium economy</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="First">First</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        {/* Search Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            startIcon={<ExploreIcon />}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 25,
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: '#4285f4',
              boxShadow: '0 2px 10px rgba(66, 133, 244, 0.3)',
              '&:hover': { 
                bgcolor: '#3367d6',
                boxShadow: '0 4px 15px rgba(66, 133, 244, 0.4)'
              }
            }}
          >
            Explore
          </Button>
        </Box>

        {/* Find cheap flights section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
            Find cheap flights from {fromLocation || 'Hyderabad'} to anywhere
            <Chip label="?" size="small" sx={{ bgcolor: '#f1f3f4' }} />
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip 
              label={fromLocation || 'Hyderabad'} 
              sx={{ 
                bgcolor: '#e3f2fd', 
                color: '#1976d2',
                fontWeight: 500,
                '&:hover': { bgcolor: '#bbdefb' }
              }} 
            />
            <Chip 
              label="Bidar" 
              variant="outlined"
              sx={{ 
                borderColor: '#dadce0',
                '&:hover': { bgcolor: '#f8f9fa' }
              }} 
            />
          </Box>
        </Box>

        {/* World Map Placeholder */}
        <Paper 
          elevation={2} 
          sx={{ 
            height: 250, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
            <MapIcon sx={{ fontSize: 60, mb: 2, opacity: 0.8 }} />
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Interactive World Map
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Explore destinations
            </Button>
          </Box>
        </Paper>

        {/* Popular Destinations */}
        <Grid container spacing={2}>
          {popularDestinations.map((dest, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
                onClick={() => setToLocation(dest.city)}
              >
                {/* Card Image Area */}
                <Box 
                  sx={{ 
                    height: 120,
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? '#667eea, #764ba2' : '#f093fb, #f5576c'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                  }}
                >
                  {dest.image}
                </Box>
                
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {dest.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {dest.dates}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {dest.duration}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                    {dest.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  // Flight Card Component - Updated design
  const FlightCard = ({ flight }) => (
    <Card sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2, '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 3, bgcolor: '#f1f3f4', color: '#5f6368' }}>
              <FlightIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1 }}>
                    {flight.departure.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.departure.airport}
                  </Typography>
                </Box>
                
                <Box sx={{ flex: 1, textAlign: 'center', position: 'relative', mx: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {flight.duration}
                  </Typography>
                  <Box sx={{ 
                    height: '2px', 
                    bgcolor: '#dadce0', 
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: '-1px',
                      top: '-4px',
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid #dadce0',
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent'
                    }
                  }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {formatStops(flight.stops)}
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1 }}>
                    {flight.arrival.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.arrival.airport}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary">
                  {flight.airline} • {flight.flightNumber}
                </Typography>
                <Chip 
                  label={flight.emissions} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#e8f5e8', 
                    color: '#137333',
                    border: '1px solid #c8e6c9'
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating value={flight.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    ({flight.rating})
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'right', ml: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5, color: '#1976d2' }}>
              ₹{flight.price.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              per person
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 25,
                textTransform: 'none',
                px: 4,
                py: 1,
                bgcolor: '#4285f4',
                fontWeight: 500,
                '&:hover': { bgcolor: '#3367d6' }
              }}
            >
              Select
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Results View Component
  const Results = () => (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Results Header */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', px: 3, py: 2 }}>
        <Container maxWidth="lg">
          <Button
            onClick={handleBackToSearch}
            sx={{ mb: 2, textTransform: 'none', color: '#1976d2', fontWeight: 500 }}
          >
            ← Back to search
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {fromLocation || 'Hyderabad'} → {toLocation || 'New Delhi'}
            </Typography>
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Typography variant="body2" color="text.secondary">
              {departureDate || 'Jul 21'}
            </Typography>
            {tripType === 'round-trip' && returnDate && (
              <>
                <Typography variant="body2" color="text.secondary">•</Typography>
                <Typography variant="body2" color="text.secondary">{returnDate}</Typography>
              </>
            )}
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Typography variant="body2" color="text.secondary">
              {passengers} passenger{passengers > 1 ? 's' : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Typography variant="body2" color="text.secondary">{travelClass}</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Sort Options */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            Choose a departing flight
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            {['Best', 'Cheapest', 'Fastest'].map((option) => (
              <Button
                key={option}
                variant={sortBy === option.toLowerCase() ? 'contained' : 'outlined'}
                onClick={() => setSortBy(option.toLowerCase())}
                sx={{ 
                  textTransform: 'none', 
                  borderRadius: 25,
                  px: 3,
                  fontWeight: 500,
                  ...(sortBy === option.toLowerCase() 
                    ? { bgcolor: '#4285f4', '&:hover': { bgcolor: '#3367d6' } }
                    : { borderColor: '#dadce0', color: '#5f6368' }
                  )
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Flight Results */}
        <Box>
          {mockFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </Box>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <Header />
      {currentView === 'search' ? <SearchForm /> : <Results />}
    </Box>
  );
};

export default GoogleFlightsClone;