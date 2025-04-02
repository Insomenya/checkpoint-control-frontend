import { MenuItemInfo } from "@/models/common";
import { NavigateHandler } from "@shared/hooks/useNavigateHandler";
import { hasPath, isSamePath } from "@shared/utils";
import { BarDropdown, BarDropdownItem, BarMenuItem, clsx, createUseStyles } from "@v-uik/base";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

type MenuItemProps = {
    navigateHandler: NavigateHandler;
    isDisabled: boolean;
};

type Props = PropsWithChildren & MenuItemProps & MenuItemInfo;

const useStyles = createUseStyles({
    dropdownRoot: {
        overflow: 'hidden'
    },
    dropdownDisabled: {
        pointerEvents: 'none'
    }
});

export const MenuItem = ({ icon, label, navigateHandler, isDisabled, type, options, path, children }: Props) => {
    const classes = useStyles();
    const location = useLocation();

    if (type === 'regular') {
        return (
            <BarMenuItem
                icon={icon}
                onClick={navigateHandler(path)}
                disabled={isDisabled}
                selected={isSamePath(path, location)}
            >
                {children ? children : label}
            </BarMenuItem>
        );
    }

    if (type === 'dropdown' && options != null) {
        return (
            <BarDropdown
                icon={icon}
                dropdownMenuProps={{
                    content: options.map((option) => (
                        <BarDropdownItem key={option.key} onClick={ navigateHandler(path + option.path) }>
                            {option.label}
                        </BarDropdownItem>
                    ))
                }}
                disabled={isDisabled}
                className={clsx(isDisabled ? classes.dropdownDisabled : null)}
                selected={hasPath(path, location)}
                classes={{
                    root: classes.dropdownRoot
                }}
            >
                {children ? children : label}
            </BarDropdown>
        );
    }

    return null;
};
