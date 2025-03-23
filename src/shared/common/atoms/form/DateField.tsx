import { DatePicker } from "@v-uik/base";
import { FieldValues, Path, useController } from "react-hook-form";

export type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
};

export const DateField = <T extends FieldValues>({ label, name }: Props<T>) => {
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({ name });

    const { message } = error || {};

    return (
        <DatePicker 
            error={Boolean(message)}
            helperText={message || ''}
            inputProps={{placeholder: 'дд.мм.гггг'}}
            label={label}
            onChange={(v: Date| null) => {
                onChange({ target: { value: v } });
            }}
            value={value}
        />
    );
};
