// components/common/FlightCard.jsx
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Collapse,
  IconButton,
  Divider
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  AirlineSeatReclineNormal as SeatIcon,
  Usb as UsbIcon,
  Tv as StreamIcon,
  Co2 as EmissionsIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { formatINR } from '../../utils/helpers';

export const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Handle undefined or missing flight data
  if (!flight) {
    return null;
  }

  return (
    <Card sx={{ 
      mb: 1.5, 
      border: '1px solid #e8eaed', 
      borderRadius: 2, 
      '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
      boxShadow: 'none'
    }}>
      {/* Main Flight Info */}
      <CardContent sx={{ p: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Airline Logo and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              width: 24, 
              height: 24, 
              bgcolor: flight.airline === 'IndiGo' ? '#ff6b35' : '#dc2626', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Airline icon pattern */}
              <Box sx={{ 
                width: 12, 
                height: 8, 
                bgcolor: 'white',
                borderRadius: '1px',
                position: 'relative'
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: -2,
                  left: 2,
                  width: 8,
                  height: 2,
                  bgcolor: 'white',
                  borderRadius: '1px'
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: 1,
                  left: 6,
                  width: 4,
                  height: 4,
                  bgcolor: 'white',
                  borderRadius: '50%'
                }} />
              </Box>
            </Box>
          </Box>

          {/* Flight Times */}
          <Box >
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '160px' }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 600, 
              fontSize: '1.5rem',
              color: '#202124'
            }}>
              {flight.departureTime || '9:30 AM'}
            </Typography>
            <Typography variant="body1" sx={{ 
              fontWeight: 600, 
              fontSize: '1.5rem',
              color: '#202124',
              mx: 1
            }}>
              –
            </Typography>
            <Typography variant="body1" sx={{ 
              fontWeight: 600, 
              fontSize: '1.5rem',
              color: '#202124'
            }}>
              {flight.arrivalTime || '11:00 AM'}
            </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ 
              color: '#5f6368',
              fontWeight: 500, 
            }}>
              {flight.airline || 'IndiGo'}
            </Typography>
          </Box>

          {/* Duration and Route */}
          <Box sx={{ textAlign: 'left', minWidth: '100px' }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 500, 
              fontSize: '16px',
              color: '#202124'
            }}>
              {flight.duration || '1 hr 30 min'}
            </Typography>
            <Typography variant="body2" sx={{ 
              fontSize: '14px',
              color: '#5f6368',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {flight.route || 'HYD-BOM'}
            </Typography>
          </Box>

          {/* Stops */}
          <Box sx={{ textAlign: 'left', minWidth: '80px' }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 500, 
              fontSize: '16px',
              color: '#202124'
            }}>
              {flight.stops || 'Nonstop'}
            </Typography>
          </Box>

          {/* Emissions */}
          <Box sx={{ textAlign: 'left', minWidth: '120px' }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 500, 
              fontSize: '16px',
              color: '#202124'
            }}>
              {flight.emissions || '58 kg CO2e'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" sx={{ 
                fontSize: '14px',
                color: flight.emissionsChange?.includes('+') ? '#ea4335' : '#137333'
              }}>
                {flight.emissionsChange || 'Avg emissions'}
              </Typography>
              <InfoIcon sx={{ fontSize: 14, color: '#5f6368' }} />
            </Box>
          </Box>

          {/* Price */}
          <Box sx={{ textAlign: 'right', minWidth: '100px' }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 600, 
              fontSize: '18px',
              color: '#137333'
            }}>
              {formatINR(flight.price) || '₹3,940'}
            </Typography>
          </Box>

          {/* Expand Button */}
          <IconButton 
            onClick={handleExpandClick}
            size="small"
            sx={{ 
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              ml: 1,
              color: '#5f6368'
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>

      {/* Detailed Expandable View */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ borderColor: '#e8eaed' }} />
        <CardContent sx={{ p: 3, pt: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 20, 
                height: 20, 
                bgcolor: '#dc2626', 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box sx={{ 
                  width: 10, 
                  height: 10, 
                  bgcolor: 'white',
                  borderRadius: '1px'
                }} />
              </Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 500, 
                fontSize: '16px',
                color: '#202124'
              }}>
                {flight.flightType || 'Departure'} • {flight.date || 'Wed, Jun 25'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 500, 
                  fontSize: '14px',
                  color: '#202124'
                }}>
                  {flight.detailedEmissions || '58 kg CO2e'}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: '12px',
                  color: '#5f6368'
                }}>
                  {flight.detailedEmissionsChange || 'Avg emissions'}
                </Typography>
              </Box>
              
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  px: 2,
                  py: 0.5,
                  borderColor: '#1a73e8',
                  color: '#1a73e8',
                  fontWeight: 500,
                  fontSize: '14px',
                  '&:hover': { 
                    borderColor: '#1557b0',
                    bgcolor: 'rgba(26, 115, 232, 0.04)'
                  }
                }}
              >
                Select flight
              </Button>
              
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  fontSize: '20px',
                  color: '#137333'
                }}>
                  {formatINR(flight.price) || '₹3,940'}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: '12px',
                  color: '#5f6368'
                }}>
                  {flight.priceType || 'round trip'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Flight Timeline */}
          <Box sx={{ display: 'flex' }}>
            {/* Left Timeline */}
            <Box sx={{ flex: 1 }}>
              {/* Departure */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 0.5 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    border: '2px solid #dadce0',
                    bgcolor: 'white'
                  }} />
                  <Box sx={{ 
                    width: 2, 
                    height: 80, 
                    bgcolor: '#dadce0',
                    mt: 0.5
                  }} />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 500, 
                      fontSize: '16px',
                      color: '#202124'
                    }}>
                      {flight.departureDetails?.time || '9:30 AM'}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontSize: '16px',
                      color: '#202124'
                    }}>
                      {flight.departureDetails?.airport || 'Rajiv Gandhi International Airport (HYD)'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: '14px',
                      color: '#5f6368'
                    }}>
                      Travel time: {flight.travelTime || '1 hr 30 min'}
                    </Typography>
                    {flight.overnight && (
                      <>
                        <Typography variant="body2" sx={{ 
                          fontSize: '14px',
                          color: '#5f6368'
                        }}>
                          • Overnight
                        </Typography>
                        <WarningIcon sx={{ fontSize: 16, color: '#f9ab00' }} />
                      </>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Arrival */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 0.5 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    border: '2px solid #dadce0',
                    bgcolor: 'white'
                  }} />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 500, 
                      fontSize: '16px',
                      color: '#202124'
                    }}>
                      {flight.arrivalDetails?.time || '11:00 AM'}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontSize: '16px',
                      color: '#202124'
                    }}>
                      {flight.arrivalDetails?.airport || 'Chhatrapati Shivaji International Airport (BOM)'}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ 
                    fontSize: '14px', 
                    color: '#5f6368',
                    mb: 1 
                  }}>
                    {flight.airlineDetails || 'IndiGo'} • {flight.class || 'Economy'} • {flight.aircraft || 'Airbus A320neo'} • {flight.flightNumber || '6E 5315'}
                  </Typography>
                  
                  {flight.delayInfo && (
                    <Typography variant="body2" sx={{ 
                      fontSize: '14px',
                      color: '#ea4335'
                    }}>
                      {flight.delayInfo}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Right Amenities */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 4, minWidth: '200px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SeatIcon sx={{ fontSize: 16, color: '#5f6368' }} />
                <Typography variant="body2" sx={{ 
                  fontSize: '12px',
                  color: '#5f6368'
                }}>
                  {flight.legroom || 'Average legroom (30 in)'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <UsbIcon sx={{ fontSize: 16, color: '#5f6368' }} />
                <Typography variant="body2" sx={{ 
                  fontSize: '12px',
                  color: '#5f6368'
                }}>
                  {flight.power || 'In-seat USB outlet'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StreamIcon sx={{ fontSize: 16, color: '#5f6368' }} />
                <Typography variant="body2" sx={{ 
                  fontSize: '12px',
                  color: '#5f6368'
                }}>
                  {flight.entertainment || 'Stream media to your device'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmissionsIcon sx={{ fontSize: 16, color: '#5f6368' }} />
                <Typography variant="body2" sx={{ 
                  fontSize: '12px',
                  color: '#5f6368'
                }}>
                  Emissions estimate: {flight.emissionsEstimate || '58 kg CO2e'}
                </Typography>
                <InfoIcon sx={{ fontSize: 12, color: '#5f6368' }} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};