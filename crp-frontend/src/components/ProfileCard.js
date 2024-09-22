import React from 'react';
import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Home as HomeIcon, Star} from '@mui/icons-material';
import Neighborhood from "./Neighborhood";

const StyledCard = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
    },
}));


const PointsBar = styled(Box)(({theme, value, max}) => ({
    height: 12,
    width: '100%',
    backgroundColor: theme.palette.grey[400],
    borderRadius: 6,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    '&::before': {
        content: '""',
        position: 'absolute',
        height: '100%',
        width: `${(value / max) * 100}%`,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 6,
        transition: 'width 1s ease-in-out, opacity 0.3s ease-in-out',
    },
    '&:hover': {
        transform: 'scale(1.05)',
        '&::before': {
            opacity: 0.8,
        },
    },
}));

const StickyNote = styled(Box)(({theme}) => ({
    backgroundColor: '#f5f688',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transform: 'rotate(-2deg)',
    transition: 'transform 0.15s ease-in-out',
    width: '200px',
    position: 'relative',
    '&:hover': {
        transform: 'rotate(0deg) scale(1.05)',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '50%',
        width: '20px',
        height: '20px',
        backgroundColor: '#feff9c',
        transform: 'translateX(-50%) rotate(45deg)',
        boxShadow: '-2px -2px 2px rgba(0,0,0,0.1)',
    },
}));

const CommenterInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
});

const CommenterName = styled(Typography)({
    marginLeft: '8px',
    fontWeight: 'bold',
});

// In your component
const comments = [
    {text: "Always ready to lend a helping hand!", author: "Emily Johnson"},
    {text: "Great organizer for community events.", author: "Michael Chen"},
    {text: "Friendly and approachable neighbor.", author: "Sarah Patel"}
];

const IntroBackground = styled(Box)(({theme}) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    borderRadius: theme.shape.borderRadius,
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

const DecorativeIcon = styled(HomeIcon)(({theme}) => ({
    position: 'absolute',
    fontSize: '150px',
    bottom: '-20px',
    right: '-20px',
    opacity: 0.1,
    transform: 'rotate(-15deg)',
    color: theme.palette.common.white,
}));

const ProfileCard = () => {
    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Left column: Profile picture, name, address, and quote */}
                        <Grid item xs={12} md={4}>
                            <IntroBackground>
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center"
                                     position="relative" zIndex={1}>
                                    <Avatar
                                        src="https://img.freepik.com/free-photo/close-up-man-smiling-nature_23-2150771119.jpg"
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            mb: 2,
                                            border: '4px solid #fff',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                        }}
                                    />
                                    <Typography variant="h5" gutterBottom style={{color: '#fff', fontWeight: 'bold'}}>Morgan
                                        Stanley</Typography>
                                    <Typography variant="body2" style={{color: 'rgba(255, 255, 255, 0.8)'}}>123
                                        Community St, Neighborville, NB 12345</Typography>
                                    <Typography variant="body1"
                                                style={{color: '#fff', fontStyle: 'italic', marginTop: '1rem'}}>
                                        "Building a stronger community, one neighbor at a time."
                                    </Typography>
                                </Box>
                                <DecorativeIcon/>
                            </IntroBackground>
                        </Grid>

                        {/* Middle column: Points visualization */}
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                                <Typography variant="h6" gutterBottom
                                            style={{color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold'}}>Community
                                    Impact</Typography>
                                <Box mb={3}>
                                    <Typography variant="body2" fontWeight="bold">Points Gained</Typography>
                                    <Box display="flex" alignItems="center">
                                        <PointsBar value={750} max={1000} sx={{flexGrow: 1, mr: 2}}/>
                                        <Typography variant="h6" fontWeight="bold" color="primary">750</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="body2" fontWeight="bold">Points Gifted</Typography>
                                    <Box display="flex" alignItems="center">
                                        <PointsBar value={500} max={1000} sx={{flexGrow: 1, mr: 2}}/>
                                        <Typography variant="h6" fontWeight="bold" color="secondary">500</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right column: Rating */}
                        <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                                 height="100%">
                                <Typography variant="h6" gutterBottom
                                            style={{color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold'}}>Neighbor
                                    Rating</Typography>
                                <Box display="flex" alignItems="center" mb={1}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} color={star <= 4 ? "primary" : "disabled"} fontSize="large"/>
                                    ))}
                                </Box>
                                <Typography variant="h3"
                                            style={{color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold'}}>4.0</Typography>
                            </Box>
                        </Grid>

                        {/* Bottom row: Messages as sticky notes */}
                        <Grid item xs={12}>
                            <Neighborhood />
                            <Box display="flex" flexWrap="wrap" justifyContent="center">
                                {comments.map((comment, index) => (
                                    <StickyNote key={index}>
                                        <CommenterInfo>
                                            <Avatar sx={{width: 24, height: 24}}>
                                                {comment.author.charAt(0)}
                                            </Avatar>
                                            <CommenterName variant="body2">{comment.author}</CommenterName>
                                        </CommenterInfo>
                                        <Typography variant="body2">{comment.text}</Typography>
                                    </StickyNote>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </StyledCard>
        </Grid>
    );
};

export default ProfileCard;