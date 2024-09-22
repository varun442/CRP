import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppBar, Box, Button, Menu, MenuItem, Toolbar} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import {styled} from '@mui/material/styles';

const Logo = styled('img')({
    height: '50px',
    marginRight: '10px',
});

const CenteredBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
});

const ProfileButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 2),
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.other,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: 'rgba(250, 248, 248, 0.8)',
        color: theme.palette.secondary.contrastText,
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    border: `1px solid ${theme.palette.secondary.main}`,
    borderColor: theme.palette.primary.other,
    color: theme.palette.text.primary,
    fontWeight: 600,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: '#e8eaf6',
    },
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const StaticAppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    };

    return (
        <StyledAppBar position="fixed">
            <Toolbar>
                <CenteredBox>
                    <Logo src="https://static.wixstatic.com/media/07d127_91f25dedeca54886898c2ba1aabed658~mv2.png/v1/fill/w_453,h_214,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/07d127_91f25dedeca54886898c2ba1aabed658~mv2.png" alt="CRP Logo" />
                </CenteredBox>
                <ProfileButton
                    variant="contained"
                    startIcon={<MenuIcon />}
                    onClick={handleMenu}
                >
                    Morgan Stanley
                </ProfileButton>
                <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={() => handleNavigation('/')}>My Dashboard</StyledMenuItem>
                    <StyledMenuItem onClick={() => handleNavigation('/account')}>My Account</StyledMenuItem>
                    <StyledMenuItem onClick={() => handleNavigation('/news')}>News</StyledMenuItem>
                    <StyledMenuItem onClick={() => handleNavigation('/about')}>About</StyledMenuItem>
                    <StyledMenuItem onClick={() => handleNavigation('/logout')}>Logout</StyledMenuItem>
                </StyledMenu>
            </Toolbar>
        </StyledAppBar>
    );
};

export default StaticAppBar;