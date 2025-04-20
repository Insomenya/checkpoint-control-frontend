import { Box, clsx, createUseStyles } from "@v-uik/base";
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
    className?: string;
}

export const ObjectSummary = ({ summaryItems, className }: Props) => {
    const classes = useStyles();

    return (
        <Box className={clsx(classes.summaryContainer, className)}>
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
