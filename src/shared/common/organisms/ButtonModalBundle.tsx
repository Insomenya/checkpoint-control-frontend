import { Button, ButtonProps, clsx, createUseStyles } from "@v-uik/base";
import { FC, ReactNode, useState } from "react";

export type ButtonModalProps<T extends object, O extends object = {}> = {
    onAccept?: (value: T) => void;
    onReject?: () => void;
    options?: O;
};

export type ModalProps<T extends object, O extends object = {}> = ButtonModalProps<T, O> & {
    isOpen: boolean;
};

type Props<T extends object, O extends object> = ButtonModalProps<T, O> & {
    ModalComponent: FC<ModalProps<T, O>>;
    buttonContent?: ReactNode;
    buttonProps?: ButtonProps;
}

const useStyles = createUseStyles({
    button: {
        width: 'fit-content'
    }
});

export const ButtonModalBundle = <T extends object = {}, O extends object = {}>({
    onAccept,
    onReject,
    buttonContent = 'Открыть',
    buttonProps,
    ModalComponent,
    options
}: Props<T, O>) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const handleAccept = (value: T) => {
        setIsOpen(false);
        onAccept?.(value);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        onReject?.();
    };

    return (
        <>
            <Button size="sm" color="secondary" kind="outlined" {...buttonProps} className={clsx(classes.button, buttonProps?.className)} onClick={handleOpen} >
                {buttonContent}
            </Button>
            <ModalComponent isOpen={isOpen} onAccept={handleAccept} onReject={handleClose} options={options} />
        </>
    );
};
