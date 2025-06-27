// App.jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Header } from './components/common/Header';
import { SearchForm } from './components/search/SearchForm';
import { PopularDestinations } from './components/search/PopularDestinations';
import { FlightResults } from './components/results/FlightResults';
import { useFlightSearch } from './hooks/useFlightSearch';
import { DestinationMap } from './components/map/DestinationMap';
import { FlightOriginPreview } from './components/search/FlightOriginPreview';
import { Footer } from './components/common/Footer';
import FrequentlyAskedQuestions from './components/common/FrequentlyAskedQuestions';



// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4285f4',
    },
    secondary: {
      main: '#ea4335',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", sans-serif',
    h4: {
      fontWeight: 400,
    },
    h5: {
      fontWeight: 400,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
      },
    },
  },
});

function App() {
  const { currentView, searchData, searchActions } = useFlightSearch();

  const handleDestinationSelect = (city) => {
    searchActions.setToLocation(city);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'white' }}>
        <Header />

        <Box sx={{ width: '80rem', mx: 'auto', p: '0 7rem' }}>
          {currentView === 'search' ? (
            <>
              {/* Hero Image with Heading */}
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 200, md: 300 },
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  backgroundImage: 'url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  pb: { xs: 2, md: 3 },
                  m: '0 -6rem',
                  mb: 4,
                  marginBottom: '1rem'
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    color: '#202124',
                    fontSize: { xs: '30px', md: '56px' },
                  }}
                >
                  Flights
                </Typography>
              </Box>

              {/* Search Form */}
              <SearchForm 
                searchData={searchData} 
                searchActions={searchActions}
              />

              <FlightOriginPreview />

              {/* Map Selection */}
              <Box sx={{ mb: 0, mt: 0 }}>
                <DestinationMap onCitySelect={handleDestinationSelect} />
              </Box>

              {/* Popular Destinations */}
              <Box sx={{ mt: 0 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 500,
                    color: '#202124',
                    textAlign: 'center'
                  }}
                >
                </Typography>
                <PopularDestinations onDestinationSelect={handleDestinationSelect} />
              </Box>

              {/* FAQ Section - Add this here */}
              <FrequentlyAskedQuestions />

              {/* Additional Information */}
              <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Plan your perfect trip with flexible options
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2' }}>
                      ✈️ Best prices
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Compare millions of flights
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2' }}>
                      🌍 Flexible dates
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Find the cheapest days to fly
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2' }}>
                      🔒 No booking fees
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Book directly with airlines
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <FlightResults
              searchData={searchData}
              searchActions={searchActions}
              onBack={searchActions.handleBackToSearch}
            />
          )}
        </Box>

        {/* Footer */}
        <Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
