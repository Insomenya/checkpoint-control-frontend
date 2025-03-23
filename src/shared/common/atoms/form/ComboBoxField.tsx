import { LabelValue } from "@/models/common";
import { ComboBox } from "@v-uik/base";
import { FieldValues, Path, useController } from "react-hook-form";

export type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    options: LabelValue[];
    placeholder?: string;
};

export const ComboBoxField = <T extends FieldValues>({ label, name, options, placeholder = 'Выберите' }: Props<T>) => {
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({ name });

    const { message } = error || {};

    return (
        <ComboBox 
            error={Boolean(message)}
            helperText={message || ''}
            label={label}
            onChange={(v: string) => {
                onChange({ target: { value: v } });
            }}
            options={options}
            placeholder={placeholder}
            value={value}
            openOnFocus
        />
    );
};
