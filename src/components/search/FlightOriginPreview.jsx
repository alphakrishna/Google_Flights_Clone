import { Box, Typography, IconButton, Tooltip, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';

const ChipStyledMain = styled(Button)(({ theme, selected }) => ({
  color: selected ? '#1967d2' : 'black',
  borderRadius: '20px',
  border: '1px solid rgb(218, 220, 224)',
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 550,
  minHeight: '36px',
  boxShadow: 'none',
  backgroundColor: selected ? 'rgba(233, 240, 253)' : 'white',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    color: '#1967d2',
    outline: '1px solid rgb(218, 220, 224)'
  },
  '&:focus': {
    color: '#1967d2',
    boxShadow: 'none',
    outline: 'none',
    },
  '&.active': {
    color: '#1967d2',
    boxShadow: 'none',
    border: '1px solid transparent',
    outline: '1px solid transparent',
    backgroundColor: 'rgba(233, 240, 253)',
  }
}));

export const FlightOriginPreview = () => {
  return (
    <Box
      sx={{
        px: 0,
        py: 2,
        mt: 2,
        mb: '5px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight={650}
        >
          Find cheap flights from Hyderabad to anywhere
        </Typography>
        <Tooltip title="These suggestions are based on the cheapest fares to popular destinations in the next six months. Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply.">
          <IconButton size="small" sx={{ p: '2px' }}>
            <InfoOutlinedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <ChipStyledMain className="active"> Hyderabad </ChipStyledMain>
        <ChipStyledMain> Bidar </ChipStyledMain>
      </Box>
    </Box>
  );
};