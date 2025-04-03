import { logout } from "@store/auth/auth.slice";
import { getNameInitials } from "@shared/common/utils";
import { selectUser } from "@store/auth/auth.selectors";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Avatar, Bar, BarDate, BarDivider, BarMenuItem, Box, clsx, createUseStyles, Text, useTheme } from "@v-uik/base";
import { CalendarTime, Logout } from "@v-uik/icons";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "@shared/common/constants";

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
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        navigate(ROUTER_PATHS.ROOT + ROUTER_PATHS.LOGIN);
        dispatch(logout());
    };

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
                    <Text kind="subtitle1" className={classes.usernameBase}>
                        {user?.fullName ?? user?.username ?? 'Username'}
                    </Text>
                    <Text kind="caption" className={classes.captionBase}>
                        {user?.role ?? 'user role'}
                    </Text>
                </Box>
                <Box>
                    <Avatar color="linear-gradient(227deg, #053DA3 13.15%, #0796F5 84.48%)" size="sm"><Text kind="titleSm">{getNameInitials(user?.fullName ?? user?.username)}</Text></Avatar>
                </Box>
            </Box>
            <BarDivider />
            <BarMenuItem
                icon={<Logout />}
                onClick={logoutHandler}
            >
                Выйти
            </BarMenuItem>
        </Bar>
    );
};
