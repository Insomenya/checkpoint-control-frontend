import { zodResolver } from "@hookform/resolvers/zod";
import { ModalOptions } from "@shared/common/organisms/AppTable";
import { ModalProps } from "@shared/common/organisms/ButtonModalBundle";
import { Box, Button, createUseStyles, Modal, ModalBody, ModalFooter, ModalHeader } from "@v-uik/base";
import { FormProvider, useForm } from "react-hook-form";
import { ComboBoxField, InputField } from "@shared/common/atoms";
import { LabelValue } from "@/models/common";
import { getDefaultValues } from "@shared/common/utils";
import { useEffect } from "react";
import { ZONES, ZONE_NAMES, Zone } from "../constants";
import { Checkpoint } from "@/models/checkpoints";
import { CheckpointFormData, checkpointSchema } from "../schemas";
import { zoneNameValueMapper, zoneValueNameMapper } from "@shared/business/utils";

type Props = ModalProps<Checkpoint, ModalOptions<Checkpoint>>;

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

const ZONES_OPTIONS: LabelValue[] = [
    { label: ZONE_NAMES[Zone.kpp], value: ZONE_NAMES[Zone.kpp] },
    { label: ZONE_NAMES[Zone.bp], value: ZONE_NAMES[Zone.bp] },
    { label: ZONE_NAMES[Zone.warehouse], value: ZONE_NAMES[Zone.warehouse] },
];

export const CheckpointModal = ({ options, isOpen, onAccept, onReject }: Props) => {
    const isEditing = options != null && options.item != null;
    const initialValues = getDefaultValues(checkpointSchema);
    const form = useForm<CheckpointFormData>({
        resolver: zodResolver(checkpointSchema),
        defaultValues: isEditing ? {
            ...options.item, 
            zone: zoneValueNameMapper(options.item!.zone_id)
        } : initialValues,
    });
    const { handleSubmit, reset } = form;
    const classes = useStyles();

    useEffect(() => {
        if (isOpen) {
            reset(isEditing ? {
                ...options.item, 
                zone: zoneValueNameMapper(options.item!.zone_id)
            } : initialValues);
        }
    }, [isOpen]);

    const handleFormSubmit = handleSubmit((data: CheckpointFormData) => {
        if (isEditing) {
            onAccept?.({
                ...data,
                zone_id: zoneNameValueMapper(data.zone) ?? ZONES[Zone.kpp],
                id: options.item?.id
            });
        } else {
            onAccept?.({
                ...data,
                zone_id: zoneNameValueMapper(data.zone) ?? ZONES[Zone.kpp]
            });
        }

        reset();
    });

    return (
        <Modal onClose={onReject} open={isOpen} keepMounted={false} width={640}>
            <FormProvider {...form} >
                <ModalHeader>
                    {options?.item ? 'Изменение' : 'Регистрация'} КПП
                </ModalHeader>
                <ModalBody>
                    <Box className={classes.goodForm}>
                        <InputField
                            label="Название"
                            name="name"
                            placeholder="Введите название"
                        />
                        <ComboBoxField
                            label="Зона"
                            name="zone"
                            options={ZONES_OPTIONS}
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
