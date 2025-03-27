import { Box, CircularProgress, Container, createUseStyles, LinearProgress } from "@v-uik/base";

const useStyles = createUseStyles((theme) => ({
    progressContainer: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: theme.ref.palette.electricBlue70
    },
    progressWrapper: {
        width: 300,
        height: 8,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

export const FullscreenLoader = () => {
    const classes = useStyles();

    return (
        <Container className={classes.progressContainer}>
            <Box className={classes.progressWrapper}>
                <LinearProgress size="lg" />
            </Box>
        </Container>
    );
};
