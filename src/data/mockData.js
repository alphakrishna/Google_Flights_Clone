// data/mockData.js
export const mockFlights = [
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

export const popularDestinations = [
  { 
    city: 'New Delhi', 
    country: 'India', 
    price: '₹6,629', 
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=200&fit=crop&auto=format',
    dates: 'Jul 14 — Jul 23', 
    duration: 'Nonstop • 2 hr 30 min' 
  },
  { 
    city: 'Singapore', 
    country: 'Singapore', 
    price: '₹18,450', 
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=200&fit=crop&auto=format',
    dates: 'Jul 7 — Jul 13', 
    duration: 'Nonstop • 4 hr 15 min' 
  },
  { 
    city: 'San Francisco', 
    country: 'United States', 
    price: '₹85,200', 
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop&auto=format',
    dates: 'Aug 18 — Aug 26', 
    duration: '1 stop • 18 hr 45 min' 
  },
  { 
    city: 'Sydney', 
    country: 'Australia', 
    price: '₹72,850', 
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&auto=format',
    dates: 'Aug 4 — Aug 10', 
    duration: '1 stop • 12 hr 30 min' 
  }
];