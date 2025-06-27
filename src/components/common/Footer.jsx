// components/common/Footer.jsx
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import LanguageIcon from '@mui/icons-material/Language';
import LocationIcon from '@mui/icons-material/LocationOn';
import CurrencyIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 4,
        pb: 6,
        px: 2,
        bgcolor: 'white',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      {/* Language, Location, Currency Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        mb: 3,
        flexWrap: 'wrap'
      }}>
        <Button
          startIcon={<LanguageIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            color: '#1967d2',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            px: 2,
            py: 1,
            borderRadius: '20px',
            '&:hover': {
              bgcolor: 'rgba(25, 103, 210, 0.04)'
            }
          }}
        >
          Language • English (United States)
        </Button>

        <Button
          startIcon={<LocationIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            color: '#1967d2',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            px: 2,
            py: 1,
            borderRadius: '20px',
            '&:hover': {
              bgcolor: 'rgba(25, 103, 210, 0.04)'
            }
          }}
        >
          Location • India
        </Button>

        <Button
          startIcon={<CurrencyIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            color: '#1967d2',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            px: 2,
            py: 1,
            borderRadius: '20px',
            '&:hover': {
              bgcolor: 'rgba(25, 103, 210, 0.04)'
            }
          }}
        >
          Currency • INR
        </Button>
      </Box>

      {/* Currency Disclaimer */}
      <Typography
        variant="body2"
        sx={{
          color: '#5f6368',
          textAlign: 'center',
          mb: 1,
          fontSize: '12px',
          lineHeight: 1.4,
          maxWidth: '600px',
          mx: 'auto'
        }}
      >
        Current language and currency options applied: English (United States) - India - INR
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#5f6368',
            fontSize: '12px',
            lineHeight: 1.4,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Displayed currencies may differ from the currencies used to purchase flights.{' '}
          <Link
            href="#"
            sx={{
              color: '#1967d2',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Learn more
          </Link>
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Links Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 4, 
        mb: 4,
        flexWrap: 'wrap'
      }}>
        {['About', 'Privacy', 'Terms', 'Join user studies', 'Feedback', 'Help Center'].map((link) => (
          <Link
            key={link}
            href="#"
            sx={{
              color: '#5f6368',
              textDecoration: 'none',
              fontSize: '14px',
              '&:hover': {
                color: '#1967d2',
                textDecoration: 'underline'
              }
            }}
          >
            {link}
          </Link>
        ))}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Bottom Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 4,
        flexWrap: 'wrap'
      }}>
        <Button
          endIcon={<ArrowDownIcon />}
          sx={{
            color: '#1967d2',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            px: 2,
            py: 1,
            borderRadius: '20px',
            '&:hover': {
              bgcolor: 'rgba(25, 103, 210, 0.04)'
            }
          }}
        >
          International sites
        </Button>

        <Button
          endIcon={<ArrowDownIcon />}
          sx={{
            color: '#1967d2',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            px: 2,
            py: 1,
            borderRadius: '20px',
            '&:hover': {
              bgcolor: 'rgba(25, 103, 210, 0.04)'
            }
          }}
        >
          Explore flights
        </Button>
      </Box>
    </Box>
  );
};