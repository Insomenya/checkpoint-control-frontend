import { MenuItemInfo, UserRoles } from "@/models/common";
import { ROUTER_PATHS } from "@shared/common/constants";
import { Archive, Box, BuildingFactory2, Dashboard, DeviceDesktop, Truck, UserPlus, Users, ZoomCheck, List } from "@v-uik/icons";

export const MENU: Record<UserRoles, MenuItemInfo[]> = {
    operator: [
        {
            type: 'regular',
            icon: <Dashboard />,
            label: 'Дашборд',
            path: ROUTER_PATHS.DASHBOARD,
        },
        {
            type: 'regular',
            icon: <ZoomCheck />,
            label: 'Подтверждение',
            path: ROUTER_PATHS.CONFIRMATION,
        },
        {
            type: 'dropdown',
            icon: <Archive />,
            label: 'Сводки',
            path: ROUTER_PATHS.REPORTS.ROOT,
            options: [
                {
                    key: 'dropdown_item_expedition_status',
                    path: ROUTER_PATHS.REPORTS.SINGLE,
                    label: 'Статус экспедиции',
                },
                {
                    key: 'dropdown_item_report_filters',
                    path: ROUTER_PATHS.REPORTS.FILTER,
                    label: 'Сводка с фильтрами',
                },
            ],
        }
    ],
    logistician: [
        {
            type: 'regular',
            icon: <Dashboard />,
            label: 'Дашборд',
            path: ROUTER_PATHS.DASHBOARD,
        },
        {
            type: 'regular',
            icon: <Truck />,
            label: 'Создать экспедицию',
            path: ROUTER_PATHS.REGISTER_EXPEDITION,
        },
        {
            type: 'regular',
            icon: <List />,
            label: 'Список экспедиций',
            path: ROUTER_PATHS.EXPEDITION_LIST,
        },
        {
            type: 'regular',
            icon: <Box />,
            label: 'Регистрация ТМЦ',
            path: ROUTER_PATHS.REGISTER_GOODS,
        },
        {
            type: 'regular',
            icon: <BuildingFactory2 />,
            label: 'Организации',
            path: ROUTER_PATHS.REGISTER_ORGANIZATION,
        },
        {
            type: 'dropdown',
            icon: <Archive />,
            label: 'Сводки',
            path: ROUTER_PATHS.REPORTS.ROOT,
            options: [
                {
                    key: 'dropdown_item_expedition_status',
                    path: ROUTER_PATHS.REPORTS.SINGLE,
                    label: 'Статус экспедиции',
                },
                {
                    key: 'dropdown_item_report_filters',
                    path: ROUTER_PATHS.REPORTS.FILTER,
                    label: 'Сводка с фильтрами',
                },
            ],
        }
    ],
    admin: [
        {
            type: 'regular',
            icon: <Dashboard />,
            label: 'Дашборд',
            path: ROUTER_PATHS.DASHBOARD,
        },
        {
            type: 'regular',
            icon: <UserPlus />,
            label: 'Добавить пользователя',
            path: ROUTER_PATHS.ADD_USER,
        },
        {
            type: 'regular',
            icon: <Users />,
            label: 'Пользователи',
            path: ROUTER_PATHS.USERS,
        },
        {
            type: 'regular',
            icon: <DeviceDesktop />,
            label: 'Настройка КПП',
            path: ROUTER_PATHS.CHECKPOINTS,
        },
    ],
};
