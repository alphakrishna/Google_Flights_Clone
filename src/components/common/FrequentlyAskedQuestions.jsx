// FrequentlyAskedQuestions.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    id: 'last-minute',
    question: 'How can I find last-minute flight deals?',
    answer: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Finding last-minute flights is easy on Google Flights.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Select your <strong>departure</strong> and <strong>destination</strong> cities in the form on the top of the page, and use the
          calendar to pick travel dates and find the lowest fares available.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          You can even check for flights departing today.
        </Typography>
        <Typography variant="body2">
          To find the cheapest fares, it's usually best to book at least a few weeks in advance for domestic
          flights and a few months in advance for international travel.
        </Typography>
      </Box>
    ),
  },
  {
    id: 'weekend-getaway',
    question: 'How can I find cheap flights for a weekend getaway?',
    answer: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          It's easy to use Google Flights to find deals on weekend getaways or even weeklong trips.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Just enter your <strong>departure</strong> and <strong>destination</strong> cities near the top of the page. Then, open the date
          selector and choose a trip length to see how the round-trip fare changes on different days. Adjust
          the trip type to see one-way fares. The cheapest available flights are highlighted and easy to spot.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Once you settle on dates, select <strong>Search</strong> to see flight options and book the deal.
        </Typography>
        <Typography variant="body2">
          You can also turn on price tracking to get alerts if the price changes for a route or flight.
        </Typography>
      </Box>
    ),
  },
  {
    id: 'flexible-plans',
    question: 'How can I find flight deals if my travel plans are flexible?',
    answer: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          It's easy to search for flights, even if your plans are up in the air.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          1. Tap <strong>Explore</strong> near the top of the page
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          2. Then, tap the calendar icon
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          3. Toggle to <strong>Flexible dates</strong> and a select a time frame or trip length
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          4. Tap done
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Trip options will appear on the map, with the cheapest available flights highlighted and easy to
          spot. Tap the destination to see available flight options you can select and book.
        </Typography>
        <Typography variant="body2">
          Price insights and other useful tools can help you find more options that work for your schedule
          and budget.
        </Typography>
      </Box>
    ),
  },
  {
    id: 'cheap-anywhere',
    question: 'How can I find cheap flights to anywhere?',
    answer: (
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          You can find cheap flight deals to anywhere in the world on Google Flights. Just enter your
          departure city, choose <strong>Anywhere</strong> as the destination, and select <strong>Explore</strong>.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          You can pick specific dates or leave departure and return dates blank if your plans are flexible.
          The cheapest fares to popular destinations will appear.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          You can filter the results to see only nonstop flights or flights under a certain price to more easily
          plan your perfect budget trip.
        </Typography>
        <Typography variant="body2">
          If you already have a destination in mind, you can turn on price tracking to get alerts if the fare
          changes for a route or flight.
        </Typography>
      </Box>
    ),
  },
  {
    id: 'flight-alerts',
    question: 'How can I get flight alerts for my trip?',
    answer: (
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          You can track flight prices for specific dates or, if your plans are flexible, any dates. To get flight
          alerts for a specific round trip, choose your dates and flights and select <strong>Search</strong>. Then, you can
          turn on price tracking.
        </Typography>
      </Box>
    ),
  },
];

const FrequentlyAskedQuestions = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth={false} sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: '#202124',
          fontSize: { xs: '24px', md: '25px' },
        }}
      >
        Frequently asked questions
      </Typography>

      <Box sx={{ width: '100%' }}>
        {faqData.map((faq) => (
          <Accordion
            key={faq.id}
            expanded={expanded === faq.id}
            onChange={handleChange(faq.id)}
            sx={{
              boxShadow: 'none',
              border: 'none',
              borderBottom: '1px solid #e0e0e0',
              borderRadius: '0 !important',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: 0,
              },
            }}
          >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#5f6368' }} />}
                sx={{
                    padding: '6px 0',
                    minHeight: 'auto',
                    '&.Mui-expanded': { minHeight: 'auto' },
                    '& .MuiAccordionSummary-content': {
                    margin: '8px 0',
                    },
                    '&.Mui-focusVisible': {
                    outline: 'none',
                    },
                    '&:focus': {
                    outline: 'none',
                    },
                }}
            >


              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: '#202124',
                  fontSize: '16px',
                  lineHeight: 1.5,
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '0 0 24px 0',
                color: '#5f6368',
              }}
            >
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FrequentlyAskedQuestions;