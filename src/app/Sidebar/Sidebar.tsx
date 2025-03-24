import { Bar, BarDivider, BarDropdown, BarDropdownItem, BarMenuItem, Box, createUseStyles, Text, useTheme } from "@v-uik/base";
import { JSX, memo, ReactNode, useMemo, useState } from "react";
import { TooltipWrapper } from "@shared/common/organisms/TooltipWrapper";
import { Archive, ChevronLeft, ChevronRight, DeviceDesktop, InfoCircle, Truck, UserPlus, ZoomCheck } from "@v-uik/icons";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTER_PATHS } from "@/shared/constants";
import { useAppSelector } from "@store/store";
import { selectToken, selectUserRole } from "@store/auth/auth.selectors";
import { useNavigateHandler } from "@shared/hooks";

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'visible'
    },
    sidebarInnerContainer: {
        overflow: 'auto',
        width: '100%'
    },
    background: {
        background: theme.sys.color.primaryAlpha
    },
    barMenuItem: {
        marginBottom: 10
    },
    dropdownRoot: {
        overflow: 'hidden'
    }
}));

type Props = {
    children: (outlet: ReactNode) => ReactNode;
};

export const Sidebar = memo(({ children }: Props): JSX.Element => {
    const token = useAppSelector(selectToken);
    const userRole = useAppSelector(selectUserRole);
    const [isSidebarExpanded, setIsSideparExpanded] = useState(true);
    const theme = useTheme();
    const classes = useStyles();
    const navigateHandler = useNavigateHandler();
    const location = useLocation();

    const isUserAdmin = userRole === 'admin';
    const isUserOperator = userRole === 'operator';
    const notLoggedIn = !token;

    const isSamePath = (path: string) => location.pathname === ROUTER_PATHS.ROOT + path;

    const hasPath = (path:string) => location.pathname.includes(path);

    const dropdownMenuProps = useMemo(() => ({
        content: (
            <>
                <BarDropdownItem onClick={ navigateHandler(ROUTER_PATHS.REPORTS.ROOT + ROUTER_PATHS.REPORTS.SINGLE) }>
                    Статус экспедиции
                </BarDropdownItem>
                <BarDropdownItem onClick={ navigateHandler(ROUTER_PATHS.REPORTS.ROOT + ROUTER_PATHS.REPORTS.FILTER) }>
                    Сводка с фильтрами
                </BarDropdownItem>
            </>
        ),
    }), []);

    const handleToggleExpanded = () => {
        setIsSideparExpanded(!isSidebarExpanded);
    };

    return (
        <Box className={classes.container} style={{ paddingLeft: isSidebarExpanded ? theme.spacing(64) : theme.spacing(16) }}>
            <Box className={classes.sidebarInnerContainer}>
                <Bar
                    classes={{
                        vertical: classes.sidebar
                    }}
                    className={classes.background}
                    direction="vertical"
                    expanded={isSidebarExpanded}
                >
                    <BarMenuItem
                        icon={<Truck />}
                        onClick={navigateHandler(ROUTER_PATHS.REGISTER_EXPEDITION)}
                        disabled={isUserAdmin || notLoggedIn}
                        selected={isSamePath(ROUTER_PATHS.REGISTER_EXPEDITION)}
                    >
                        Регистрация эксп.
                    </BarMenuItem>
                    <BarMenuItem
                        icon={<ZoomCheck />}
                        onClick={navigateHandler(ROUTER_PATHS.CONFIRMATION)}
                        disabled={isUserAdmin || notLoggedIn}
                        selected={isSamePath(ROUTER_PATHS.CONFIRMATION)}
                    >
                        Подтверждение
                    </BarMenuItem>
                    <BarDropdown
                        icon={<Archive />}
                        dropdownMenuProps={dropdownMenuProps}
                        disabled={notLoggedIn}
                        selected={hasPath(ROUTER_PATHS.REPORTS.ROOT)}
                        classes={{
                            root: classes.dropdownRoot
                        }}
                    >
                        Сводки
                    </BarDropdown>
                    <BarMenuItem
                        icon={<UserPlus />}
                        onClick={navigateHandler(ROUTER_PATHS.ADD_USER)}
                        disabled={isUserOperator || notLoggedIn}
                        selected={isSamePath(ROUTER_PATHS.ADD_USER)}
                    >
                        Добавить пользователя
                    </BarMenuItem>
                    <BarMenuItem
                        icon={<DeviceDesktop />}
                        onClick={navigateHandler(ROUTER_PATHS.CHECKPOINT_ZONE_LINK)}
                        disabled={isUserOperator || notLoggedIn}
                        selected={isSamePath(ROUTER_PATHS.CHECKPOINT_ZONE_LINK)}
                    >
                        Настройка АРМ
                    </BarMenuItem>
                    <BarDivider />
                    <BarMenuItem
                        icon={<InfoCircle />}
                        onClick={navigateHandler(ROUTER_PATHS.ABOUT)}
                        selected={isSamePath(ROUTER_PATHS.ABOUT)}
                    >
                        О приложении
                    </BarMenuItem>
                    <TooltipWrapper tooltip="Развернуть" tooltipNeeded={!isSidebarExpanded}>
                        <BarMenuItem
                            icon={isSidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
                            style={{ marginTop: 'auto' }}
                            onClick={handleToggleExpanded}
                        >
                            <Text kind="titleSm" style={{ color: theme.ref.palette.white }}>
                                Свернуть
                            </Text>
                        </BarMenuItem>
                    </TooltipWrapper>
                </Bar>
                {children(<Outlet />)}
            </Box>
        </Box>
    );
});
