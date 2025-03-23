import { Bar, BarDivider, BarDropdown, BarDropdownItem, BarMenuItem, Box, createUseStyles, Text, useTheme } from "@v-uik/base";
import { JSX, memo, ReactNode, useMemo, useState } from "react";
import { TooltipWrapper } from "./TooltipWrapper";
import { Archive, ChevronLeft, ChevronRight, DeviceDesktop, InfoCircle, Truck, UserPlus, ZoomCheck } from "@v-uik/icons";
import { Outlet } from "react-router-dom";

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
    }
}));

type Props = {
    children: (outlet: ReactNode) => ReactNode;
};

export const Sidebar = memo(({ children }: Props): JSX.Element => {
    const [isSidebarExpanded, setIsSideparExpanded] = useState(false);
    const theme = useTheme();
    const classes = useStyles();

    const dropdownMenuProps = useMemo(() => ({
        content: (
            <>
                <BarDropdownItem>Статус экспедиции</BarDropdownItem>
                <BarDropdownItem>Сводка с фильтрами</BarDropdownItem>
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
                    <BarMenuItem icon={<Truck />}>
                        Создать экспедицию
                    </BarMenuItem>
                    <BarMenuItem icon={<ZoomCheck />}>
                        Подтверждение
                    </BarMenuItem>
                    <BarDropdown icon={<Archive />} dropdownMenuProps={dropdownMenuProps}>
                        Сводки
                    </BarDropdown>
                    <BarMenuItem icon={<UserPlus />} disabled>
                        Добавить пользователя
                    </BarMenuItem>
                    <BarMenuItem icon={<DeviceDesktop />} disabled>
                        Настройка АРМ
                    </BarMenuItem>
                    <BarDivider />
                    <BarMenuItem icon={<InfoCircle />} selected>
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
