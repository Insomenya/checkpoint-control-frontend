import { STEPS_CONFIGURATION } from "@/features/registerExpedition/components";
import { INVALID_STEPS_MESSAGE, MAX_STEPS } from "@/features/registerExpedition/constants";
import { StepConfiguration, StepsNumbers } from "@/models/common";
import { TooltipWrapper } from "@shared/common/organisms";
import { selectCurrentStep, selectStepStatuses } from "@store/expedition/expedition.selectors";
import { expeditionCleared, newStepSet, stepLeft } from "@store/expedition/expedition.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Box, Button, Card, createUseStyles, Step, Stepper, Text, Tooltip, notification } from "@v-uik/base";
import { useMemo } from "react";
import { useCreateExpeditionMutation } from "@api/expeditions/expeditionsApi";
import { isErrorResponse } from "@shared/common/utils";
import { ErrorDescription } from "@shared/common/atoms";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "@shared/common/constants";
import { useGetGoodsQuery } from "@api/goods/goodsApi";

const useStyles = createUseStyles((theme) => ({
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        maxWidth: 700,
        gap: theme.spacing(4)
    },
    cardWrapper: {
        width: '100%'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(8),
    },
    stepRoot: {
        minWidth: 150
    }
}));

export const RegisterExpedition = () => {
    const classes = useStyles();
    const currentStep = useAppSelector(selectCurrentStep);
    const stepStatuses = useAppSelector(selectStepStatuses);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createExpedition, { isLoading: isCreating }] = useCreateExpeditionMutation();
    const { data: goods = [] } = useGetGoodsQuery();
    const expedition = useAppSelector(state => state.expedition.newExpedition);

    const hasErrors = useMemo(() => stepStatuses.some((status) => status === 'error'), [stepStatuses]);

    const handleStepForward = async () => {
        if (currentStep !== MAX_STEPS - 1) {
            dispatch(newStepSet((currentStep + 1) as StepsNumbers));
            dispatch(stepLeft(currentStep));
        } else {
            if (!hasErrors) {
                await handleSubmitExpedition();
            }
        }
    };

    const handleSubmitExpedition = async () => {
        try {
            const formattedInvoices = expedition.invoices.map(invoice => ({
                number: invoice.number || '',
                cargo_description: invoice.cargo_description || '',
                goods: invoice.goods.map(good => {
                    const goodData = goods.find(g => g.id === good.good_id);
                    if (!goodData) {
                        throw new Error(`Не удалось найти данные для ТМЦ с ID ${good.good_id}`);
                    }
                    return {
                        name: goodData.name,
                        description: goodData.description,
                        unit_of_measurement: goodData.unit_of_measurement,
                        quantity: good.quantity
                    };
                })
            }));
            
            const expeditionData = {
                name: expedition.name || '',
                direction: expedition.direction || 'IN',
                sender_id: expedition.sender_id || 0,
                receiver_id: expedition.receiver_id || 0,
                type: expedition.type || 'auto',
                full_name: expedition.full_name || '',
                phone_number: expedition.phone_number || '',
                license_plate: expedition.license_plate || '',
                vehicle_model: expedition.vehicle_model || '',
                passport_number: expedition.passport_number || '',
                invoices: formattedInvoices
            };
            
            await createExpedition(expeditionData).unwrap();
            
            dispatch(expeditionCleared());
            
            notification.success(
                <ErrorDescription>Экспедиция успешно создана</ErrorDescription>,
                { title: 'Успех', direction: 'vertical' }
            );
            navigate(`../${ROUTER_PATHS.EXPEDITION_LIST}`, { relative: 'path' });
        } catch (error) {
            if (isErrorResponse(error)) {
                notification.error(
                    <ErrorDescription>
                        {error?.data.detail || 'Произошла ошибка при создании экспедиции'}
                    </ErrorDescription>,
                    { title: 'Ошибка', direction: 'vertical' }
                );
            } else {
                notification.error(
                    <ErrorDescription>
                        {error instanceof Error ? error.message : 'Произошла ошибка при создании экспедиции'}
                    </ErrorDescription>,
                    { title: 'Ошибка', direction: 'vertical' }
                );
            }
        }
    };

    const handleStepBackward = () => {
        if (currentStep > 0) {
            dispatch(newStepSet((currentStep - 1) as StepsNumbers));
            dispatch(stepLeft(currentStep));
        }
    };

    return (
        <>
            <Text kind="h4" gutterBottom>
                Регистрировать экспедицию
            </Text>
            <Box className={classes.contentContainer}>
                <Stepper activeStep={currentStep} >
                    {Object.values(STEPS_CONFIGURATION).map((step: StepConfiguration) => {
                        return (
                            <Step
                                classes={{
                                    root: classes.stepRoot
                                }}
                                key={step.key}
                                index={step.order}
                                error={stepStatuses[step.order] === 'error'}
                            >
                                {step.title}
                            </Step>
                        );
                    })}
                </Stepper>
                <Card
                    className={classes.cardWrapper}
                    kind="container"
                    header={STEPS_CONFIGURATION[currentStep].title}
                    subtitle={STEPS_CONFIGURATION[currentStep].subtitle}
                    footer={
                        <Box className={classes.cardActions}>
                            <Button
                                size="sm"
                                kind="outlined"
                                color="secondary"
                                onClick={handleStepBackward}
                                disabled={currentStep === 0}
                            >
                                Назад
                            </Button>
                            <TooltipWrapper
                                tooltip={INVALID_STEPS_MESSAGE}
                                tooltipNeeded={currentStep === 2 && hasErrors}
                                dropdownProps={{
                                    placement: 'bottom-start'
                                }}
                            >
                                <Button
                                    size="sm"
                                    onClick={handleStepForward}
                                    color={currentStep === 2 && hasErrors ? 'secondary' : 'primary'}
                                    disabled={isCreating}
                                >
                                    {currentStep == 2 ? 'Завершить' : 'Далее'}
                                </Button>
                            </TooltipWrapper>
                        </Box>
                    }
                >
                    {STEPS_CONFIGURATION[currentStep].component}
                </Card>
            </Box>
        </>
    )
};
