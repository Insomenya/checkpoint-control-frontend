import { STEPS_CONFIGURATION } from "@/features/registerExpedition/components";
import { INVALID_STEPS_MESSAGE, MAX_STEPS } from "@/features/registerExpedition/constants";
import { StepConfiguration, StepsNumbers } from "@/models/common";
import { TooltipWrapper } from "@shared/common/organisms";
import { selectCurrentStep, selectStepStatuses } from "@store/expedition/expedition.selectors";
import { currentStepSet, newStepSet, stepLeft } from "@store/expedition/expedition.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Box, Button, Card, createUseStyles, Step, Stepper, Text, Tooltip } from "@v-uik/base";
import { useMemo, useState } from "react";

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

    const hasErrors = useMemo(() => stepStatuses.some((status) => status === 'error'), [stepStatuses]);

    const handleStepForward = () => {
        if (currentStep !== MAX_STEPS - 1) {
            dispatch(newStepSet((currentStep + 1) as StepsNumbers));
            dispatch(stepLeft(currentStep));
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
