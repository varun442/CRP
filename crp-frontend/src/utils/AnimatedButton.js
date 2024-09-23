import React from 'react';
import { keyframes } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const pulseAndColorChange = keyframes`
  0%, 100% {
    transform: scale(1);
    color: rgba(255, 255, 255, 0.87); /* Normal text color */
  }
  25% {
    transform: scale(1.05);
    color: #0412b4; /* Blue */
  }
  50% {
    transform: scale(1);
    color: #e81b2d; /* Red */
  }
  75% {
    transform: scale(1.05);
    color: #050000; /* Orange */
  }
`;

const AnimatedButton = styled('button')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: '12px 24px',
    borderRadius: '8px',
    background: `linear-gradient(45deg, #0088FE, #00C49F, #FFBB28, #FF8042)`,
    backgroundSize: '200% 200%',
    color: '#fff',
    animation: `moveGradient 10s ease infinite`,
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    '& span': {
        display: 'inline-block',
        animation: `${pulseAndColorChange} 4s ease-in-out infinite`,
    },
}));

const RedeemButton = ({ points }) => (
    <AnimatedButton>
        <span>Redeem {points} pts</span>
    </AnimatedButton>
);

export default RedeemButton;
