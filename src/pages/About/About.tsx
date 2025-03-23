import { Box, clsx, createUseStyles, List, ListItem, Text, useTheme } from "@v-uik/base";
import { DiscountCheck, InfoCircle } from "@v-uik/icons";
import { features } from "./features";

const useStyles = createUseStyles((theme) => ({
    aboutContentWrapper: {
        display: 'flex',
        gap: theme.spacing(10)
    },
    aboutContent: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2)
    },
    infoCircle: {
        width: 256,
        flex: 1
    }
}));

export const About = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (      
        <Box className={classes.aboutContent}>
            <Text kind="titleLg">
                О приложении
            </Text>
            <Box className={classes.aboutContentWrapper}>
                <Box className={classes.aboutContent}>
                    <Text as="p" kind="bodyMd">
                        Система предназначена для операторов КПП, которые регистрируют въезд/выезд транспорта и перемещение ТМЦ, проверяют накладные.
                    </Text>
                    <Box>
                        <Text kind="titleSm">
                            Основные функции:
                        </Text>
                        <List>
                            {features.map((feature, index) => (
                                <ListItem key={index} size="md" prefix={<DiscountCheck width={20} height={20} />}>
                                    <Text as="span" kind="bodyMd">
                                        {feature}
                                    </Text>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
                <InfoCircle className={clsx(classes.aboutContent, classes.infoCircle)} height={256} width={256} color={theme.sys.color.focusPocus} />
            </Box>
        </Box>
    );
};