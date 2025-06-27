// components/search/PopularDestinations.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { popularDestinations } from '../../data/mockData';

export const PopularDestinations = ({ onDestinationSelect }) => {
  return (
    <Box sx={{ display: 'flex', gap: 4}}>
      {popularDestinations.map((dest, index) => (
        <Box
          key={index}
          sx={{
            minWidth: 240,
            maxWidth: 240,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            overflow: 'hidden',
          }}
          onClick={() => onDestinationSelect(dest.city)}
        >
          {/* Image with border styling */}
          <Box 
            sx={{ 
              height: 110,
              backgroundImage: `url(${dest.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid #e0e0e0',
              mb: 1,
              borderRadius: 5.5,
            }}
          />
          
          {/* Content without border */}
          <Box sx={{ px: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '0 0 px 0' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  color: '#202124',
                  lineHeight: 1.2,
                }}
              >
                {dest.city}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#202124', 
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                {dest.price}
              </Typography>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#5f6368',
                fontSize: '0.875rem',
                lineHeight: 1.3,
                pl: 0.5,
              }}
            >
              {dest.dates}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#5f6368',
                fontSize: '0.875rem',
                lineHeight: 1.3,
                pl: 0.5,
              }}
            >
              {dest.duration}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};