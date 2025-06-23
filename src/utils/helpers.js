// utils/helpers.js
export const formatStops = (stops) => {
  if (stops === 0) return 'Nonstop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
};

export function formatINR(number) {
  // Handle edge cases
  if (number === null || number === undefined || isNaN(number)) {
    return "₹0";
  }
  
  // Convert to number if it's a string
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  // Handle negative numbers
  const isNegative = num < 0;
  const absoluteNum = Math.abs(num);
  
  // Format with Indian numbering system (lakhs and crores)
  const formatted = absoluteNum.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  // Add currency symbol and handle negative sign
  return isNegative ? `-₹${formatted}` : `₹${formatted}`;
}