import { InputPassword } from "@v-uik/base";
import { FieldValues, Path, useController } from "react-hook-form";

export type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    placeholder?: string;
};

export const PasswordField = <T extends FieldValues>({ label, name, placeholder = 'Введите значение' }: Props<T>) => {
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({ name });

    const { message } = error || {};

    return (
        <InputPassword 
            error={Boolean(message)}
            helperText={message || ''}
            label={label}
            onChange={(v: string | null) => {
                onChange({ target: { value: v } });
            }}
            placeholder={placeholder}
            value={value}
            fullWidth
        />
    );
};
