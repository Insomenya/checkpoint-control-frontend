import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, createUseStyles } from '@v-uik/base';
import { InputField } from '@shared/common/atoms';
import { PlaylistAdd } from '@v-uik/icons';
import { AddInvoiceFormData, addInvoiceSchema } from '../../schemas';

const useStyles = createUseStyles((theme) => ({
    form: {
        display: 'flex',
        gap: theme.spacing(2),
        alignItems: 'flex-start',
        height: 90
    },
    inputWrapper: {
        minWidth: '250px'
    },
    addButton: {
        marginTop: theme.spacing(1),
        alignSelf: 'center'
    }
}));

type InvoiceFormProps = {
    onAddInvoice: (data: AddInvoiceFormData) => void;
};

export const InvoiceForm = ({ onAddInvoice }: InvoiceFormProps) => {
    const classes = useStyles();

    const invoiceForm = useForm<AddInvoiceFormData>({
        resolver: zodResolver(addInvoiceSchema),
        defaultValues: {
            number: '',
            cargo_description: ''
        }
    });

    const handleAddInvoice = () => {
        invoiceForm.handleSubmit((data) => {
            onAddInvoice(data);
            invoiceForm.reset({
                number: '',
                cargo_description: ''
            });
        })();
    };

    return (
        <FormProvider {...invoiceForm}>
            <Box className={classes.form}>
                <Box className={classes.inputWrapper}>
                    <InputField
                        label="Номер накладной"
                        name="number"
                        placeholder="Введите номер накладной"
                    />
                </Box>
                <Box className={classes.inputWrapper}>
                    <InputField
                        label="Описание груза"
                        name="cargo_description"
                        placeholder="Введите описание груза"
                    />
                </Box>
                <Button
                    className={classes.addButton}
                    color="primary"
                    onClick={handleAddInvoice}
                    prefixIcon={<PlaylistAdd />}
                >
                    Добавить
                </Button>
            </Box>
        </FormProvider>
    );
}; 