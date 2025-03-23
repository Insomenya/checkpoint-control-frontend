import { Box, CircularProgress, createUseStyles } from "@v-uik/base";

const useStyles = createUseStyles({
    progress: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around'
    }
});

export const CircularProgressCentered = () => {
    const classes = useStyles();

    return (
        <Box className={classes.progress}>
            <CircularProgress />
        </Box>
    );
};
