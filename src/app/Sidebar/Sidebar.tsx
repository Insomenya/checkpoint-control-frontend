import { Bar, BarDivider, BarDropdown, BarDropdownItem, BarMenuItem, Box, clsx, createUseStyles, Text, useTheme } from "@v-uik/base";
import { JSX, memo, ReactNode, useMemo, useState } from "react";
import { TooltipWrapper } from "@shared/common/organisms/TooltipWrapper";
import { Archive, ChevronLeft, ChevronRight, DeviceDesktop, InfoCircle, Truck, UserPlus, ZoomCheck, Box as IconBox } from "@v-uik/icons";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTER_PATHS } from "@shared/common/constants";
import { useAppSelector } from "@store/store";
import { selectToken, selectUserRole } from "@store/auth/auth.selectors";
import { useNavigateHandler } from "@shared/common/hooks";
import { MenuItem } from "./MenuItem";
import { MENU } from "./menu";

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
}));

type Props = {
    children: (outlet: ReactNode) => ReactNode;
};

export const Sidebar = memo(({ children }: Props): JSX.Element => {
    const userRole = useAppSelector(selectUserRole);
    const [isSidebarExpanded, setIsSideparExpanded] = useState(true);
    const theme = useTheme();
    const classes = useStyles();
    const navigateHandler = useNavigateHandler();

    const handleToggleExpanded = () => {
        setIsSideparExpanded(!isSidebarExpanded);
    };

    const menuItems = useMemo(() => (userRole && MENU[userRole].map(({ type, icon, label, path, options }) => (
        <MenuItem
            key={`menu_item_${path}`}
            type={type}
            icon={icon}
            path={path}
            navigateHandler={navigateHandler}
            isDisabled={false}
            options={options}
        >
            {label}
        </MenuItem>
    ))), [userRole]);

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
                    {menuItems}
                    <BarDivider />
                    <MenuItem
                        icon={<InfoCircle />}
                        label="О приложении"
                        path={ROUTER_PATHS.ABOUT}
                        type="regular"
                        isDisabled={false}
                        navigateHandler={navigateHandler}
                    />
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
