import { createUseStyles, Text, TextProps } from "@v-uik/base";

const useStyles = createUseStyles((theme) => ({
    errorDescription: {
        color: theme.ref.palette.gray50
    }
}));

type Props = TextProps;

export const ErrorDescription = (textProps: Props) => {
    const classes = useStyles();

    return <Text className={classes.errorDescription} {...textProps} />
};
