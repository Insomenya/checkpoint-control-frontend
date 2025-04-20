import { LabelValue } from "@/models/common";
import { useGetOrganizationsQuery } from "@api/organizations/organizationsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxField } from "@shared/common/atoms";
import { getDirectionName } from "@shared/common/utils";
import { Box, CircularProgress, Container, createUseStyles, LabelControl, Switch, Text } from "@v-uik/base";
import { ChangeEvent, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OrganizationsStepFormData, organizationsStepSchema } from "../schemas/organizationsStepSchema";
import { useAppDispatch, useAppSelector } from "@store/store";
import { currentStepSet, organizationsStepSet, stepError, stepValid } from "@store/expedition/expedition.slice";
import { STEP_INDECIES, StepName } from "../constants";
import { selectNewStep, selectOrganizationsStep, selectStepStatus } from "@store/expedition/expedition.selectors";

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
        width: 350,
        alignItems: 'flex-start'
    },
    centerProgress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    directionLabel: {
        color: theme.comp.inputLabel.colorText,
        fontSize: theme.spacing(3),
        lineHeight: theme.spacing(4)
    },
    directionGroup: {
        display: 'inline-flex',
        gap: theme.spacing(4),
        alignItems: 'flex-end'
    }
}));

export const OrganizationsStep = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const organizationsStep = useAppSelector(selectOrganizationsStep);
    const newStep = useAppSelector(selectNewStep);
    const organizationsStepStatus = useAppSelector(selectStepStatus(STEP_INDECIES[StepName.organizations]));
    const { data: organizations, isSuccess: isOrganizationsLoaded } = useGetOrganizationsQuery();

    const form = useForm<OrganizationsStepFormData>({
        resolver: zodResolver(organizationsStepSchema),
        defaultValues: {
            receiver_id: organizationsStep.receiver_id?.toString() ?? '',
            sender_id: organizationsStep.sender_id?.toString() ?? '',
        },
    });
    const { trigger, getValues } = form;

    const organizationsOptions: LabelValue[] | null = useMemo(() => {
        if (isOrganizationsLoaded && organizations) {
            return organizations.map((organization) => {
                return ({
                    label: organization.name,
                    value: organization.id?.toString() ?? ''
                });
            });
        }

        return null;
    }, [isOrganizationsLoaded, organizations]);

    const validate = async  () => {
        const isValid = await trigger();

        if (isValid && organizationsStepStatus === 'leaving') {
            dispatch(stepValid(STEP_INDECIES[StepName.organizations]));
        } else {
            dispatch(stepError(STEP_INDECIES[StepName.organizations]));
        }
    };

    useEffect(() => {
        if (organizationsStepStatus === 'leaving') {
            validate();
            const formValues = getValues();

            dispatch(organizationsStepSet({
                direction: organizationsStep.direction,
                sender_id: parseInt(formValues.sender_id ?? 0) || undefined,
                receiver_id: parseInt(formValues.receiver_id ?? 0) || undefined,
            }));

            dispatch(currentStepSet(newStep));
        } else if (organizationsStepStatus === 'error') {
            validate();
        }
    }, [organizationsStepStatus]);

    const handleDirectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(organizationsStepSet({
            direction: event.target.checked ? 'OUT' : 'IN',
            sender_id: organizationsStep.sender_id,
            receiver_id: organizationsStep.receiver_id,
        }));
    };

    return (    
        <Box className={classes.container}>
            <Box className={classes.form}>
                <FormProvider {...form}>
                    <Box className={classes.directionGroup}>
                        <LabelControl
                            classes={{
                                labelContent: classes.directionLabel
                            }}
                            name="direction"
                            labelPlacement="top"
                            checked={organizationsStep.direction === 'OUT'}
                            control={<Switch />}
                            label="Направление"
                            onChange={handleDirectionChange}
                        />
                        <Text kind="bodyLg">
                            {getDirectionName(organizationsStep.direction!)}
                        </Text>
                    </Box>
                    {isOrganizationsLoaded && organizationsOptions != null ? (
                        <>
                            <ComboBoxField
                                label="Отправитель"
                                name="sender_id"
                                options={organizationsOptions}
                            />
                            <ComboBoxField
                                label="Получатель"
                                name="receiver_id"
                                options={organizationsOptions}
                            />
                        </>
                    ) : (
                        <Container className={classes.centerProgress}>
                            <CircularProgress />
                        </Container>
                    )}
                </FormProvider>
            </Box> 
        </Box>
    );
};
