import { Box, createUseStyles, Text } from "@v-uik/base";

const useStyles = createUseStyles((theme) => ({
    verticalContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1)
    },
    horizontalContainer: {
        display: 'flex',
        gap: theme.spacing(1)
    }
}));

type Props = {
    label: string;
    text: string;
    isHorizontal?: boolean;
};

export const LabeledText =({ label, text, isHorizontal }: Props) => {
    const classes = useStyles();

    return (
        <Box className={isHorizontal ? classes.horizontalContainer : classes.verticalContainer}>
            <Text as="p" kind="titleSm">
                {label}
            </Text>
            <Text as="p" kind="bodyMd">
                {text}
            </Text>
        </Box>
    );
};
