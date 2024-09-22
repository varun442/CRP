import React from 'react';
import { keyframes } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const pulseAndColorChange = keyframes`
  0%, 100% {
    transform: scale(1);
    color: rgba(0, 0, 0, 0.87);
  }
  25% {
    transform: scale(1.05);
    color: #1976d2;
  }
  50% {
    transform: scale(1);
    color: #f50057;
  }
  75% {
    transform: scale(1.05);
    color: #ff9800;
  }
`;

const AnimatedTypography = styled(Typography)(({ theme }) => ({
    display: 'inline-block',
    fontWeight: 'bold',
    '& span': {
        display: 'inline-block',
        animation: `${pulseAndColorChange} 4s ease-in-out infinite`,
        transition: 'transform 0.3s ease',
    },
    '&:hover span': {
        transform: 'rotate(5deg)',
    },
}));

const NeighborhoodBuzz = () => {
    return (
        <Box textAlign="center" mb={2}>
            <AnimatedTypography variant="h5">
                {Array.from("Neighborhood Buzz").map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
                ))}
            </AnimatedTypography>
        </Box>
    );
};

export default NeighborhoodBuzz;