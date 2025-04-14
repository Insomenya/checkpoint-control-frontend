import { LabelValue } from "@/models/common";
import { useGetOrganizationsQuery } from "@api/organizations/organizationsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxField } from "@shared/common/atoms";
import { getDirectionName } from "@shared/common/utils";
import { Box, CircularProgress, Container, createUseStyles, LabelControl, Switch, Text } from "@v-uik/base";
import { ChangeEvent, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OrganizationsStepFormData, organizationsStepSchema } from "../schemas/organizationsStepSchema";
import { useAppDispatch, useAppSelector } from "@store/store";
import { organizationsStepSet, stepError, stepValid } from "@store/expedition/expedition.slice";
import { STEP_INDECIES, StepName } from "../constants";
import { selectOrganizationsStep } from "@store/expedition/expedition.selectors";

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
    preview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: theme.spacing(2),
        width: 250,
    },
    dividerVertical: {
        padding: [theme.spacing(2), 0],
        paddingRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        borderBottom: 0,
    },
    dividerHorizontal: {
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
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
        if (isOrganizationsLoaded) {
            return organizations.data.map((organization) => {
                return ({
                    label: organization.name,
                    value: organization.id?.toString() ?? ''
                });
            });
        }

        return null;
    }, [isOrganizationsLoaded]);

    const handleDataChange = async () => {
        const isValid = await trigger();
        const formValues = getValues();

        if (isValid) {
            dispatch(stepValid(STEP_INDECIES[StepName.organizations]));
        } else {
            dispatch(stepError(STEP_INDECIES[StepName.organizations]));
        }

        dispatch(organizationsStepSet({
            direction: organizationsStep.direction,
            sender_id: parseInt(formValues.sender_id ?? 0) || undefined,
            receiver_id: parseInt(formValues.receiver_id ?? 0) || undefined,
        }));
    }

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
                                onChange={handleDataChange}
                            />
                            <ComboBoxField
                                label="Получатель"
                                name="receiver_id"
                                options={organizationsOptions}
                                onChange={handleDataChange}
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
