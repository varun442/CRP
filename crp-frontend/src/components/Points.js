import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CardGiftcard, EmojiEvents, ThumbUp, Close } from '@mui/icons-material';

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
}));

const ActionButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const HistoryCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const Points = () => {
    const [points, setPoints] = useState(750);
    const [history, setHistory] = useState([
        { type: 'gained', amount: 100, from: 'Project Completion', date: '2023-09-20' },
        { type: 'gifted', amount: 50, to: 'Sarah M.', date: '2023-09-18' },
    ]);
    const [openRedeem, setOpenRedeem] = useState(false);
    const [openRecognize, setOpenRecognize] = useState(false);
    const [redeemAmount, setRedeemAmount] = useState('');
    const [recognizeAmount, setRecognizeAmount] = useState('');
    const [recognizePerson, setRecognizePerson] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleRedeem = () => {
        if (redeemAmount && Number(redeemAmount) <= points) {
            setPoints(points - Number(redeemAmount));
            setHistory([{ type: 'redeemed', amount: Number(redeemAmount), date: new Date().toISOString().split('T')[0] }, ...history]);
            setOpenRedeem(false);
            setSnackbar({ open: true, message: `Redeemed ${redeemAmount} points successfully!` });
        }
    };

    const handleRecognize = () => {
        if (recognizeAmount && recognizePerson && Number(recognizeAmount) <= points) {
            setPoints(points - Number(recognizeAmount));
            setHistory([{ type: 'gifted', amount: Number(recognizeAmount), to: recognizePerson, date: new Date().toISOString().split('T')[0] }, ...history]);
            setOpenRecognize(false);
            setSnackbar({ open: true, message: `Recognized ${recognizePerson} with ${recognizeAmount} points!` });
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Card elevation={3} sx={{ mb: 3, p: 2 }}>
                <Typography variant="h4" gutterBottom>Your Points: {points}</Typography>
                <ProgressBar variant="determinate" value={(points / 1000) * 100} />
                <Typography variant="caption">Next Reward: 1000 Points</Typography>
                <Box sx={{ mt: 2 }}>
                    <ActionButton
                        variant="contained"
                        color="primary"
                        startIcon={<CardGiftcard />}
                        onClick={() => setOpenRedeem(true)}
                    >
                        Redeem Points
                    </ActionButton>
                    <ActionButton
                        variant="contained"
                        color="secondary"
                        startIcon={<ThumbUp />}
                        onClick={() => setOpenRecognize(true)}
                    >
                        Recognize Others
                    </ActionButton>
                </Box>
            </Card>

            <Typography variant="h5" gutterBottom>Points History</Typography>
            <Grid container spacing={2}>
                {history.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <HistoryCard>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {item.date}
                                </Typography>
                                <Typography variant="h6">
                                    {item.type === 'gained' ? 'Gained' : item.type === 'gifted' ? 'Gifted' : 'Redeemed'} {item.amount} points
                                </Typography>
                                <Typography color="textSecondary">
                                    {item.type === 'gained' ? `From: ${item.from}` : item.type === 'gifted' ? `To: ${item.to}` : 'Redeemed for reward'}
                                </Typography>
                            </CardContent>
                        </HistoryCard>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openRedeem} onClose={() => setOpenRedeem(false)}>
                <DialogTitle>Redeem Points</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Amount to Redeem"
                        type="number"
                        fullWidth
                        value={redeemAmount}
                        onChange={(e) => setRedeemAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRedeem(false)}>Cancel</Button>
                    <Button onClick={handleRedeem} color="primary">Redeem</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openRecognize} onClose={() => setOpenRecognize(false)}>
                <DialogTitle>Recognize Others</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Person to Recognize"
                        type="text"
                        fullWidth
                        value={recognizePerson}
                        onChange={(e) => setRecognizePerson(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Points to Give"
                        type="number"
                        fullWidth
                        value={recognizeAmount}
                        onChange={(e) => setRecognizeAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRecognize(false)}>Cancel</Button>
                    <Button onClick={handleRecognize} color="secondary">Recognize</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => setSnackbar({ ...snackbar, open: false })}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

export default Points;