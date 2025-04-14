import { Input } from "@v-uik/base";
import { FieldValues, Path, useController } from "react-hook-form";

export type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    placeholder?: string;
    onBlur?: (v: string | null) => void;
};

export const InputField = <T extends FieldValues>({ label, name, onBlur, placeholder = 'Введите значение' }: Props<T>) => {
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({ name });

    const { message } = error || {};

    return (
        <Input 
            error={Boolean(message)}
            helperText={message || ''}
            label={label}
            onChange={(v: string | null) => {
                onChange({ target: { value: v } });
            }}
            onBlur={() => {
                onBlur?.(value);
            }}
            placeholder={placeholder}
            value={value}
            fullWidth
        />
    );
};
