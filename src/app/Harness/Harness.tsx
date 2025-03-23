import { Box, createUseStyles } from "@v-uik/base";
import { TopBar } from "../TopBar/TopBar";
import { Sidebar } from "../Sidebar/Sidebar";

const useStyles = createUseStyles((theme) => ({
    harnessContainer: {
        display: 'flex',
        paddingTop: theme.spacing(12)
    },
    workAreaWrapper: {
        position: 'relative',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: 'calc(100vh - 48px)',
        padding: theme.spacing(6)
    }
}));

export const Harness = () => {
    const classes = useStyles();

    return (
        <>
            <TopBar />
            <Sidebar>
                {(outlet) => (
                    <Box className={classes.harnessContainer}>
                        <Box className={classes.workAreaWrapper}>
                            {outlet}
                        </Box>
                    </Box>
                )}
            </Sidebar>
        </>
    );
};
