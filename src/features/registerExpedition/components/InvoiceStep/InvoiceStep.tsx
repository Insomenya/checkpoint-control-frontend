import { useEffect, useState } from 'react';
import { Box, createUseStyles } from '@v-uik/base';
import { useAppDispatch, useAppSelector } from '@store/store';
import { selectInvoices, selectNewStep, selectStepStatus } from '@store/expedition/expedition.selectors';
import { currentStepSet, goodAdded, goodDeleted, invoiceAdded, stepError, stepValid } from '@store/expedition/expedition.slice';
import { useGetGoodsQuery } from '@api/goods/goodsApi';
import { LabelValue } from '@/models/common';
import { STEP_INDECIES, StepName } from '../../constants';
import { AddInvoiceFormData, AddGoodFormData } from '../../schemas';
import { InvoiceForm } from './InvoiceForm';
import { InvoiceAccordion } from './InvoiceAccordion';
import { AddGoodModal } from './AddGoodModal';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4)
    },
    invoicesList: {
        marginTop: theme.spacing(2)
    }
}));

export const InvoiceStep = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    
    const invoices = useAppSelector(selectInvoices);
    const newStep = useAppSelector(selectNewStep);
    const invoiceStepStatus = useAppSelector(selectStepStatus(STEP_INDECIES[StepName.invoices]));
    
    const [expandedInvoiceId, setExpandedInvoiceId] = useState<number | null>(null);
    const [isAddGoodModalOpen, setIsAddGoodModalOpen] = useState(false);
    const [currentInvoiceId, setCurrentInvoiceId] = useState<number | null>(null);
    
    const { data: goods = [] } = useGetGoodsQuery();

    const validate = () => {
        if (invoices.length === 0) {
            dispatch(stepError(STEP_INDECIES[StepName.invoices]));
            return false;
        }

        const hasInvoiceWithGoods = invoices.some(invoice => invoice.goods && invoice.goods.length > 0);
        
        if (!hasInvoiceWithGoods) {
            dispatch(stepError(STEP_INDECIES[StepName.invoices]));
            return false;
        }

        dispatch(stepValid(STEP_INDECIES[StepName.invoices]));
        return true;
    };

    useEffect(() => {
        if (invoiceStepStatus === 'leaving') {
            const isValid = validate();
            
            if (isValid) {
                dispatch(currentStepSet(newStep));
            }
        } else if (invoiceStepStatus === 'error') {
            validate();
        }
    }, [invoiceStepStatus]);

    useEffect(() => {
        validate();
    }, [invoices]);

    const handleAccordionClick = (invoiceId: number) => () => {
        setExpandedInvoiceId(expandedInvoiceId === invoiceId ? null : invoiceId);
    };

    const handleAddInvoice = (data: AddInvoiceFormData) => {
        const newInvoiceId = Math.floor(Math.random() * 1000);
        
        dispatch(invoiceAdded({
            id: newInvoiceId,
            number: data.number,
            cargo_description: data.cargo_description
        }));
        
        setExpandedInvoiceId(newInvoiceId);
    };

    const handleOpenAddGoodModal = (invoiceId: number) => {
        setCurrentInvoiceId(invoiceId);
        setIsAddGoodModalOpen(true);
    };

    const handleCloseAddGoodModal = () => {
        setIsAddGoodModalOpen(false);
        setCurrentInvoiceId(null);
    };

    const handleAddGood = (data: AddGoodFormData) => {
        if (currentInvoiceId === null) return;
        
        dispatch(goodAdded({
            invoice_id: currentInvoiceId,
            good_id: data.good_id,
            quantity: data.quantity
        }));
        
        handleCloseAddGoodModal();
    };

    const handleDeleteGood = (invoiceId: number, goodId: number) => {
        dispatch(goodDeleted({
            invoice_id: invoiceId,
            good_id: goodId
        }));
    };

    const goodOptions: LabelValue[] = goods.map(good => ({
        label: `${good.name} (${good.unit_of_measurement_display})`,
        value: String(good.id)
    }));

    return (
        <Box className={classes.container}>
            <InvoiceForm onAddInvoice={handleAddInvoice} />
            
            <Box className={classes.invoicesList}>
                <InvoiceAccordion 
                    invoices={invoices}
                    expandedInvoiceId={expandedInvoiceId}
                    goods={goods}
                    onAccordionClick={handleAccordionClick}
                    onOpenAddGoodModal={handleOpenAddGoodModal}
                    onDeleteGood={handleDeleteGood}
                />
            </Box>

            <AddGoodModal 
                open={isAddGoodModalOpen}
                onClose={handleCloseAddGoodModal}
                onAdd={handleAddGood}
                goodOptions={goodOptions}
            />
        </Box>
    );
}; 