import { createUseStyles, DropdownProps, Tooltip } from "@v-uik/base";
import { JSX } from "react";

const useStyles = createUseStyles((theme) => ({
    tooltip: {
        background: theme.ref.palette.gray30
    }
}));

interface Props {
    tooltipNeeded: boolean;
    tooltip: string;
    children: JSX.Element;
    dropdownProps?: Omit<DropdownProps, 'children'>;
}

export const TooltipWrapper = ({ tooltipNeeded, tooltip, children, dropdownProps }: Props) => {
    const classes = useStyles();

    if (tooltipNeeded) {
        return (
            <Tooltip
                className={classes.tooltip}
                dropdownProps={{
                    mouseEnterDelay: 300,
                    placement: 'right',
                    content: <div>{tooltip}</div>,
                    ...dropdownProps
                }}
            >
                {children}
            </Tooltip>
        );
    }

    return children;
};
