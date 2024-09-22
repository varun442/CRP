import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const slideOutLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const BackgroundContainer = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
});

const BackgroundImage = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.5s ease-in-out',
}));

const SlidingBackground = ({ backgrounds }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
                setNextIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
                setIsAnimating(false);
            }, 5000);
        }, 5000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    return (
        <BackgroundContainer>
            <BackgroundImage
                style={{
                    backgroundImage: backgrounds[currentIndex],
                    animation: isAnimating ? `${slideOutLeft} 1s forwards` : 'none',
                }}
            />
            <BackgroundImage
                style={{
                    backgroundImage: backgrounds[nextIndex],
                    animation: isAnimating ? `${slideInRight} 1s forwards` : 'none',
                    opacity: isAnimating ? 1 : 0,
                }}
            />
        </BackgroundContainer>
    );
};

export default SlidingBackground;