import React from 'react';
import { Avatar, Box, Typography, LinearProgress, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Home as HomeIcon, Star, Event, DirectionsRun, Logout } from '@mui/icons-material';

const ProfileCardContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  width: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  zIndex: 1000,
}));

const IntroBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    bottom: '-50%',
    left: '-50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
    transform: 'rotate(30deg)',
  },
}));

const DecorativeIcon = styled(HomeIcon)(({ theme }) => ({
  position: 'absolute',
  fontSize: '100px',
  bottom: '-20px',
  right: '-20px',
  opacity: 0.1,
  transform: 'rotate(-15deg)',
  color: theme.palette.common.white,
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
  },
}));

const SectionButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const ProfileCard = ({ user, onLogout }) => {
  const percentComplete = (user.points / user.maxPoints) * 100;

  return (
    <ProfileCardContainer>
      <IntroBackground>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" position="relative" zIndex={1}>
          <Avatar
            src={user.avatarUrl}
            sx={{
              width: 80,
              height: 80,
              mb: 1,
              border: '3px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
          <Typography variant="h6" gutterBottom style={{ color: '#fff', fontWeight: 'bold' }}>
            {user.name}
          </Typography>
          <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {user.address}
          </Typography>
        </Box>
        <DecorativeIcon />
      </IntroBackground>
      <Box p={2}>
        <Box display="flex" alignItems="center" mb={1}>
          <Star color="primary" />
          <Typography variant="body1" ml={1}>
            {user.points} / {user.maxPoints} points
          </Typography>
        </Box>
        <StyledLinearProgress variant="determinate" value={percentComplete} />
        <Typography variant="body2" color="textSecondary" mt={1}>
          {user.role}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
        <Box mt={2} mb={2}>
          <Typography variant="body2" fontStyle="italic">
            "{user.quote}"
          </Typography>
        </Box>
        <Divider />
        <Box mt={2}>
          <SectionButton startIcon={<Event />} fullWidth>
            My Events
          </SectionButton>
          <SectionButton startIcon={<DirectionsRun />} fullWidth>
            My Activities
          </SectionButton>
        </Box>
      </Box>
      <Box p={2} pt={0}>
        <LogoutButton startIcon={<Logout />} fullWidth onClick={onLogout}>
          Logout
        </LogoutButton>
      </Box>
    </ProfileCardContainer>
  );
};

export default ProfileCard;