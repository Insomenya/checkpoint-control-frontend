import { Good } from "@/models/goods";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalOptions } from "@shared/common/organisms/AppTable";
import { ModalProps } from "@shared/common/organisms/ButtonModalBundle";
import { Box, Button, createUseStyles, Modal, ModalBody, ModalFooter, ModalHeader } from "@v-uik/base";
import { GoodFormData, goodSchema } from "../schemas";
import { FormProvider, useForm } from "react-hook-form";
import { ComboBoxField, InputField, InputNumberField } from "@shared/common/atoms";
import { LabelValue } from "@/models/common";
import { UnitOfMeasurement, UNITS_OF_MEASUREMENT } from "../constants";
import { getDefaultValues } from "@shared/common/utils";
import { useEffect } from "react";

type Props = ModalProps<Good, ModalOptions<Good>>;

const useStyles = createUseStyles((theme) => ({
    goodForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2)
    },
    modalFooter: {
        display: 'flex',
        gap: theme.spacing(2),
        justifyContent: 'space-between'
    }
}));

const UNITS_OF_MEASUREMENT_OPTIONS: LabelValue[] = [
    { label: 'Килограммы', value: UNITS_OF_MEASUREMENT[UnitOfMeasurement.kilo] },
    { label: 'Литры', value: UNITS_OF_MEASUREMENT[UnitOfMeasurement.litre] },
    { label: 'Метры', value: UNITS_OF_MEASUREMENT[UnitOfMeasurement.meter] },
    { label: 'Штуки', value: UNITS_OF_MEASUREMENT[UnitOfMeasurement.piece] },
];

export const GoodModal = ({ options, isOpen, onAccept, onReject }: Props) => {
    const isEditing = options != null && options.item != null;
    const initialValues = getDefaultValues(goodSchema);
    const form = useForm<GoodFormData>({
        resolver: zodResolver(goodSchema),
        defaultValues: isEditing ? options.item ?? initialValues : initialValues,
    });
    const { handleSubmit, reset } = form;
    const classes = useStyles();

    useEffect(() => {
        if (isOpen) {
            reset(isEditing ? options.item ?? initialValues : initialValues);
        }
    }, [isOpen]);

    const handleFormSubmit = handleSubmit((data: GoodFormData) => {
        if (isEditing) {
            onAccept?.({
                ...data,
                id: options.item?.id
            });
        } else {
            onAccept?.(data);
        }

        reset();
    });

    return (
        <Modal onClose={onReject} open={isOpen} keepMounted={false} width={640}>
            <FormProvider {...form} >
                <ModalHeader>
                    {options?.item ? 'Изменение' : 'Регистрация'} ТМЦ
                </ModalHeader>
                <ModalBody>
                    <Box className={classes.goodForm}>
                        <InputField
                            label="Название"
                            name="name"
                            placeholder="Введите название"
                        />
                        <InputField
                            label="Описание"
                            name="description"
                            placeholder="Введите описание"
                        />
                        <InputNumberField
                            label="Количество"
                            name="quantity"
                            placeholder="Введите количество"
                        />
                        <ComboBoxField
                            label="Единица измерения"
                            name="unitOfMeasurement"
                            options={UNITS_OF_MEASUREMENT_OPTIONS}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter className={classes.modalFooter}>
                    <Button onClick={onReject} kind="outlined" color="secondary">
                        Отменить
                    </Button>
                    <Button onClick={handleFormSubmit}>{options?.item ? 'Изменить' : 'Добавить'}</Button>
                </ModalFooter>
            </FormProvider>
        </Modal>
    );
};
