import { zodResolver } from "@hookform/resolvers/zod";
import { ModalOptions } from "@shared/common/organisms/AppTable";
import { ModalProps } from "@shared/common/organisms/ButtonModalBundle";
import { Box, Button, createUseStyles, Modal, ModalBody, ModalFooter, ModalHeader } from "@v-uik/base";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "@shared/common/atoms";
import { getDefaultValues } from "@shared/common/utils";
import { useEffect } from "react";
import { Organization } from "@/models/organizations";
import { OrganizationFormData, organizationSchema } from "../schemas/organizationSchema";

type Props = ModalProps<Organization, ModalOptions<Organization>>;

const useStyles = createUseStyles((theme) => ({
    form: {
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

export const OrganizationModal = ({ options, isOpen, onAccept, onReject }: Props) => {
    const isEditing = options != null && options.item != null;
    const initialValues = getDefaultValues(organizationSchema);
    const form = useForm<OrganizationFormData>({
        resolver: zodResolver(organizationSchema),
        defaultValues: isEditing ? options.item ?? initialValues : initialValues,
    });
    const { handleSubmit, reset } = form;
    const classes = useStyles();

    useEffect(() => {
        if (isOpen) {
            reset(isEditing ? options.item ?? initialValues : initialValues);
        }
    }, [isOpen]);

    const handleFormSubmit = handleSubmit((data: OrganizationFormData) => {
        if (isEditing) {
            onAccept?.({
                ...data,
                id: options.item?.id,
                isOwn: options.item?.isOwn ?? false,
            });
        } else {
            onAccept?.({
                ...data,
                isOwn: false,
            });
        }

        reset();
    });
    
    // todo можно сделать CommonModal и передавать туда только form
    return (
        <Modal onClose={onReject} open={isOpen} keepMounted={false} width={640}>
            <FormProvider {...form} >
                <ModalHeader>
                    {options?.item ? 'Изменение' : 'Регистрация'} организации
                </ModalHeader>
                <ModalBody>
                    <Box className={classes.form}>
                        <InputField
                            label="Название"
                            name="name"
                            placeholder="Введите название"
                        />
                        <InputField
                            label="Адрес"
                            name="address"
                            placeholder="Введите адрес"
                        />
                        <InputField
                            label="Контактный номер"
                            name="contactPhone"
                            placeholder="Введите контактный номер"
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
