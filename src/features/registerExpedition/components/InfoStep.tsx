import { LabelValue } from "@/models/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxField, InputField } from "@shared/common/atoms";
import { formatPhoneNumber, getDefaultValues } from "@shared/common/utils";
import { Box, createUseStyles, Divider, Text } from "@v-uik/base";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@store/store";
import { currentStepSet, infoStepSet, stepError, stepValid } from "@store/expedition/expedition.slice";
import { EXPEDITION_TYPE_NAMES, EXPEDITION_TYPES, ExpeditionType, STEP_INDECIES, StepName } from "../constants";
import { selectInfoStep, selectNewStep, selectStepStatus } from "@store/expedition/expedition.selectors";
import { InfoStepFormData, infoStepSchema, initialValues } from "../schemas";
import { ExpeditionTypes } from "@/models/expeditions";

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        gap: theme.spacing(4),
        justifyContent: 'flex-start'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        alignItems: 'flex-start'
    },
    formRow: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: theme.spacing(4),
    },
    formRowItem: {
        minWidth: 300,
    },
    dividerHorizontal: {
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%'
    },
    centerProgress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const EXPEDITION_TYPE_OPTIONS: LabelValue[] = [
    { label: EXPEDITION_TYPE_NAMES[ExpeditionType.auto], value: EXPEDITION_TYPES[ExpeditionType.auto] },
    { label: EXPEDITION_TYPE_NAMES[ExpeditionType.selfauto], value: EXPEDITION_TYPES[ExpeditionType.selfauto] },
    { label: EXPEDITION_TYPE_NAMES[ExpeditionType.selfout], value: EXPEDITION_TYPES[ExpeditionType.selfout] },
];

export const InfoStep = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const infoStep = useAppSelector(selectInfoStep);
    const newStep = useAppSelector(selectNewStep);
    const infoStepStatus = useAppSelector(selectStepStatus(STEP_INDECIES[StepName.info]));

    const form = useForm<InfoStepFormData>({
        resolver: zodResolver(infoStepSchema),
        defaultValues: {
            name: infoStep.name ?? initialValues.name,
            type: infoStep.type ?? initialValues.type,
            full_name: infoStep.full_name ?? initialValues.full_name,
            phone_number: infoStep.phone_number ?? initialValues.phone_number,
            license_plate: infoStep.license_plate ?? initialValues.license_plate,
            vehicle_model: infoStep.vehicle_model ?? initialValues.vehicle_model,
        },
    });
    const { trigger, getValues, watch, setValue } = form;
    const watchType = watch('type');

    const validate = async () => {
        const isValid = await trigger();

        if (isValid && infoStepStatus === 'leaving') {
            dispatch(stepValid(STEP_INDECIES[StepName.info]));
        } else {
            dispatch(stepError(STEP_INDECIES[StepName.info]));
        }
    };

    useEffect(() => {
        if (infoStepStatus === 'leaving') {
            validate();
            const formValues = getValues();

            dispatch(infoStepSet({
                name: formValues.name ?? initialValues.name,
                type: (formValues.type ?? initialValues.type) as ExpeditionTypes,
                full_name: formValues.full_name ?? initialValues.full_name,
                phone_number: formValues.phone_number ?? initialValues.phone_number,
                license_plate: formValues.license_plate ?? initialValues.license_plate,
                vehicle_model: formValues.vehicle_model ?? initialValues.vehicle_model,
            }));

            dispatch(currentStepSet(newStep));
        } else if (infoStepStatus === 'error') {
            validate();
        }
    }, [infoStepStatus]);

    const handlePhoneOnBlur = (value: string | null) => {
        if (value === null) return;
        const formattedValue = formatPhoneNumber(value);
        setValue('phone_number', formattedValue);
        trigger('phone_number');
    };

    return (    
        <Box className={classes.container}>
            <Box className={classes.form}>
                <FormProvider {...form}>
                    <Text kind="titleSm">Экспедиция:</Text>
                    <Box className={classes.formRow}>
                        <Box className={classes.formRowItem}>
                            <ComboBoxField
                                label="Тип"
                                name="type"
                                options={EXPEDITION_TYPE_OPTIONS}
                            />
                        </Box>
                        <Box className={classes.formRowItem}>
                            <InputField 
                                label="Название"
                                name="name"
                                placeholder="Введите название экспедиции"
                            />
                        </Box>
                    </Box>
                    <Divider className={classes.dividerHorizontal} />
                    <Text kind="titleSm">Ответственное лицо:</Text>
                    <Box className={classes.formRow}>
                        <Box className={classes.formRowItem}>
                            <InputField
                                label="Имя"
                                name="full_name"
                                placeholder="Введите ФИО ответственного"
                            />
                        </Box>
                        <Box className={classes.formRowItem}>
                            <InputField
                                label="Контактный номер"
                                name="phone_number"
                                placeholder="Введите в формате +7(XXX)XXX-XX-XX"
                                onBlur={handlePhoneOnBlur}
                            />
                        </Box>
                    </Box>
                    {watchType === 'auto' ? (
                        <>
                            <Divider className={classes.dividerHorizontal} />
                            <Text kind="titleSm">Транспортное средство:</Text>
                            <Box className={classes.formRow}>
                                <Box className={classes.formRowItem}>
                                    <InputField
                                        label="Модель"
                                        name="vehicle_model"
                                        placeholder="Введите модель ТС"
                                    />
                                </Box>
                                <Box className={classes.formRowItem}>
                                    <InputField
                                        label="Регистрационный номер"
                                        name="license_plate"
                                        placeholder="Введите регистрационный номер ТС"
                                    />
                                </Box>
                            </Box>
                        </>
                    ) : null}
                </FormProvider>
            </Box> 
        </Box>
    );
};
