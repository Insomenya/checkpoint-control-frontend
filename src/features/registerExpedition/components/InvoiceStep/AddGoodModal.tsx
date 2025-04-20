import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Modal, createUseStyles } from '@v-uik/base';
import { ComboBoxField, InputNumberField } from '@shared/common/atoms';
import { AddGoodFormData, addGoodSchema } from '../../schemas';
import { LabelValue } from '@/models/common';

const useStyles = createUseStyles((theme) => ({
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
        padding: theme.spacing(2)
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: theme.spacing(2),
        marginTop: theme.spacing(2)
    }
}));

type AddGoodModalProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (data: AddGoodFormData) => void;
    goodOptions: LabelValue[];
};

export const AddGoodModal = ({ open, onClose, onAdd, goodOptions }: AddGoodModalProps) => {
    const classes = useStyles();

    const goodForm = useForm<AddGoodFormData>({
        resolver: zodResolver(addGoodSchema),
    });

    const handleAddGood = () => {
        goodForm.handleSubmit((data) => {
            onAdd(data);
            goodForm.reset();
        })();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Добавить ТМЦ"
        >
            <FormProvider {...goodForm}>
                <Box className={classes.modalContent}>
                    <ComboBoxField
                        label="ТМЦ"
                        name="good_id"
                        options={goodOptions}
                        placeholder="Выберите ТМЦ"
                    />
                    <InputNumberField
                        label="Количество"
                        name="quantity"
                        placeholder="Введите количество"
                    />
                    <Box className={classes.modalActions}>
                        <Button
                            kind="outlined"
                            color="secondary"
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleAddGood}
                        >
                            Добавить
                        </Button>
                    </Box>
                </Box>
            </FormProvider>
        </Modal>
    );
}; 