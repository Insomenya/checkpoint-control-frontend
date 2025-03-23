import { Sidebar, TopBar } from "@/shared/common/organisms";
import { Box, createUseStyles } from "@v-uik/base";

const useStyles = createUseStyles({
    harnessContainer: {
        display: 'flex'
    },
    workAreaWrapper: {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minHeight: 500
    }
});

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
