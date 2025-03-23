import { createUseStyles, Tooltip } from "@v-uik/base";
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
}

export const TooltipWrapper = ({ tooltipNeeded, tooltip, children }: Props) => {
    const classes = useStyles();

    if (tooltipNeeded) {
        return (
            <Tooltip
                className={classes.tooltip}
                dropdownProps={{
                    mouseEnterDelay: 300,
                    placement: 'right',
                    content: <div>{tooltip}</div>
                }}
            >
                {children}
            </Tooltip>
        );
    }

    return children;
};
