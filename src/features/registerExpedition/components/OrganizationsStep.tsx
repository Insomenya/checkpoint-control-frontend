import { LabelValue } from "@/models/common";
import { useGetOrganizationsQuery } from "@api/organizations/organizationsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxField } from "@shared/common/atoms";
import { getDefaultValues, getDirectionName } from "@shared/common/utils";
import { Box, CircularProgress, Container, createUseStyles, LabelControl, Switch, Text } from "@v-uik/base";
import { ChangeEvent, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OrganizationsStepFormData, organizationsStepSchema } from "../schemas/organizationsStepSchema";
import { ExpeditionDirections } from "@/models/expeditions";

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
    const form = useForm<OrganizationsStepFormData>({
        resolver: zodResolver(organizationsStepSchema),
        defaultValues: getDefaultValues(organizationsStepSchema),
    });

    const classes = useStyles();
    const { data: organizations, isSuccess: isOrganizationsLoaded } = useGetOrganizationsQuery();
    const [direction, setDirection] = useState('IN');

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

    const handleDirectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        
        setDirection(event.target.checked ? 'OUT' : 'IN');
        console.log(direction)
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
                            checked={direction === 'OUT'}
                            control={<Switch />}
                            label="Направление"
                            onChange={handleDirectionChange}
                        />
                        <Text kind="bodyLg">
                            {getDirectionName(direction as ExpeditionDirections)}
                        </Text>
                    </Box>
                    {isOrganizationsLoaded && organizationsOptions != null ? (
                        <>
                            <ComboBoxField
                                label="Отправитель"
                                name="sender"
                                options={organizationsOptions}
                            />
                            <ComboBoxField
                                label="Получатель"
                                name="receiver"
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
