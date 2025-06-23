// components/common/Header.jsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Apps as AppsIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
  Map as MapIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import LuggageIcon from '@mui/icons-material/Luggage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import HouseIcon from '@mui/icons-material/House';
import { Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ButtonStyledMain = styled(Button)(({ theme }) => ({
  color: 'black',
  borderRadius: '20px',
  border: '1px solid rgb(218, 220, 224)',
  padding: '8px 16px',
  textTransform: 'none',
  fontSize: '12px',
  fontWeight: 500,
  minHeight: '36px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  '&.active': {
    color: '#1967d2',
    boxShadow: 'none',
    outline: 'none',
    border: 'none',
    backgroundColor: 'rgba(233, 240, 253)',
  },
  '& .MuiButton-startIcon': {
    marginRight: '6px',
    '& svg': {
      fontSize: '16px',
      color: '#1967d2'
    },
  },
}));

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black' }}>
      <Toolbar sx={{ px: 2, minHeight: '64px !important', boxShadow: '0 0 1px 1px rgba(0,0,0,0.1)', zIndex: 1000 }}>
        <IconButton sx={{ mr: 2, color: '#5f6368' }}>
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Typography variant="h6" sx={{ color: '#4285f4', fontWeight: 400, mr: 1 }}>
            Google
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '3px' }}>
        <ButtonStyledMain
          startIcon={<LuggageIcon />}
          variant="outlined"
          disableElevation
        >
          Travel
        </ButtonStyledMain>

        <ButtonStyledMain
          startIcon={<TravelExploreIcon />}
          variant="outlined"
          disableElevation
        >
          Explore
        </ButtonStyledMain>
        <Box sx={{ flexGrow: 1 }} />

        <ButtonStyledMain
          startIcon={<FlightIcon />}
          variant="outlined"
          disableElevation
          className='active'
        >
          Flights
        </ButtonStyledMain>
        <Box sx={{ flexGrow: 1 }} />

        <ButtonStyledMain
          startIcon={<HotelIcon />}
          variant="outlined"
          disableElevation
        >
          Hotels
        </ButtonStyledMain>
        <Box sx={{ flexGrow: 1 }} />

        <ButtonStyledMain
          startIcon={<HouseIcon />}
          variant="outlined"
          disableElevation
        >
          Vacation rentals
        </ButtonStyledMain>
        </Box>
        <Box sx={{ flexGrow: 1}} />

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

    </AppBar>
  );
};