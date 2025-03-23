import { Avatar, Bar, BarDate, BarDivider, BarMenuItem, Box, clsx, createUseStyles, Text, useTheme } from "@v-uik/base";
import { CalendarTime, Logout } from "@v-uik/icons";

const useStyles = createUseStyles((theme) => ({
    avatarGroupContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        padding: [theme.spacing(1), theme.spacing(4)]
    },
    containerRow: {
        flexDirection: 'row'
    },
    textWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    textWrapperRight: {
        textAlign: 'right'
    },
    titleText: {
        color: theme.sys.color.onPrimaryMedium
    },
    usernameBase: {
        lineHeight: theme.spacing(5),
        color: theme.sys.color.onPrimaryMedium
    },
    captionBase: {
        lineHeight: theme.spacing(3.5),
        color: theme.sys.color.neutralAlpha
    }
}));

export const TopBar = () => {
    const classes = useStyles();
    const theme = useTheme();

    // todo можно добавить аватарки с картинками
    // если есть картинка - src, если нет - color

    return (
        <Bar>
            <Box className={classes.avatarGroupContainer}>
                <Text kind="titleMd" className={classes.titleText}>
                    Система контроля прохождения ТМЦ через КПП
                </Text>
            </Box>
            <BarDate icon={<CalendarTime width={20} height={20} color={theme.sys.color.onPrimaryMedium} />} />
            <Box style={{ marginLeft: 'auto' }} className={clsx(classes.avatarGroupContainer, classes.containerRow)}>
                <Box className={clsx(classes.textWrapper, classes.textWrapperRight)}>
                    <Text kind="subtitle1" className={classes.usernameBase}>Username</Text>
                    <Text kind="caption" className={classes.captionBase}>user role</Text>
                </Box>
                <Box>
                    <Avatar color="linear-gradient(227deg, #053DA3 13.15%, #0796F5 84.48%)" size="sm"><Text kind="titleSm">ОП</Text></Avatar>
                </Box>
            </Box>
            <BarDivider />
            <BarMenuItem icon={<Logout />}>
                Выйти
            </BarMenuItem>
        </Bar>
    );
};
