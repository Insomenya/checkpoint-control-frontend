import { Box, createUseStyles } from "@v-uik/base";
import { LabeledText } from "../atoms";

const useStyles = createUseStyles((theme) => ({
    summaryContainer: {
        display: 'flex',
        gap: theme.spacing(10)
    }
}));

type SummaryItem = {
    label: string;
    text: string | number | null;
};

type Props = {
    summaryItems: SummaryItem[];
}

export const ObjectSummary = ({ summaryItems }: Props) => {
    const classes = useStyles();

    return (
        <Box className={classes.summaryContainer}>
            {summaryItems.map(({ label, text }) => (
                <LabeledText
                    key={label}
                    label={label}
                    text={text === null ? '-' : text.toString()}
                />
            ))}
        </Box>
    );
};
