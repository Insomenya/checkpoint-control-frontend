import { Box, Button, createUseStyles, Text, Underlay } from "@v-uik/base";

const useStyles = createUseStyles((theme) => ({
    verticalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: theme.spacing(2)
    }
}));

type Props = {
    message: string;
    refetch: () => void;
};

export const PageFallback = ({ message, refetch }: Props) => {
    const classes = useStyles();

    return (
        <Underlay kind="filled" status="warning">
            <Box className={classes.verticalContainer}>
                <Text kind="bodyMd">{message}</Text>
                <Button kind="contained" color="secondary" onClick={refetch}>Обновить</Button>
            </Box>
        </Underlay>
    );
};
