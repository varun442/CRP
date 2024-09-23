import React, { useState } from 'react';
import { Avatar, Box, Typography, LinearProgress, Button, Divider, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Home as HomeIcon, Star, Email, Work, Edit } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from "./Logout";

const ProfileCardContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    right: 0,
    width: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
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
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
        transform: 'rotate(30deg)',
    },
}));

const DecorativeIcon = styled(HomeIcon)(({ theme }) => ({
    position: 'absolute',
    fontSize: '120px',
    bottom: '-30px',
    right: '-30px',
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
        backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
}));

const LogoutButton = styled(ActionButton)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
    },
}));

const UpdateProfileButton = styled(ActionButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '&:hover': {
        '& svg': {
            transform: 'scale(1.2)',
        },
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(1),
    transition: 'transform 0.3s ease',
}));

const ProfileCard = ({ user, onLogout, onUpdateProfile }) => {
    const [showLogout, setShowLogout] = useState(false);
    const percentComplete = (user.points / 2000) * 100;

    const handleLogoutClick = () => {
        setShowLogout(true);
    };

    const handleCloseLogout = () => {
        setShowLogout(false);
    };

    return (
        <>
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
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}
                        />
                        <Typography variant="h6" gutterBottom style={{ color: '#fff', fontWeight: 'bold' }}>
                            {user.fullName}
                        </Typography>
                        <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {`${user.location.address}, ${user.location.city}, ${user.location.state} ${user.location.zipCode}`}
                        </Typography>
                    </Box>
                    <DecorativeIcon />
                </IntroBackground>
                <Box p={2}>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Star color="primary" />
                        <Typography variant="body1" ml={1}>
                            {user.points} / 2000 points
                        </Typography>
                    </Box>
                    <StyledLinearProgress variant="determinate" value={percentComplete} />
                    <Box mt={2}>
                        <Tooltip title="Send email" arrow>
                            <InfoItem>
                                <IconWrapper>
                                    <Email color="action" />
                                </IconWrapper>
                                <Typography variant="body2">{user.email}</Typography>
                            </InfoItem>
                        </Tooltip>
                        <Tooltip title="User role" arrow>
                            <InfoItem>
                                <IconWrapper>
                                    <Work color="action" />
                                </IconWrapper>
                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{user.role}</Typography>
                            </InfoItem>
                        </Tooltip>
                    </Box>
                    <Box mt={2} mb={2}>
                        <Typography variant="body2" fontStyle="italic" color="text.secondary">
                            "Empowering success through innovation"
                        </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                        <UpdateProfileButton
                            startIcon={<Edit />}
                            fullWidth
                            onClick={onUpdateProfile}
                        >
                            Update Profile
                        </UpdateProfileButton>
                    </Box>
                </Box>
                <Box p={2} pt={0}>
                    <LogoutButton startIcon={<LogoutIcon />} fullWidth onClick={handleLogoutClick}>
                        Logout
                    </LogoutButton>
                </Box>
            </ProfileCardContainer>
            {showLogout && (
                <Logout
                    onClose={handleCloseLogout}
                    onLogout={onLogout}
                />
            )}
        </>
    );
};

export default ProfileCard;