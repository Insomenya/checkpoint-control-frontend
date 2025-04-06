import { STEPS_CONFIGURATION } from "@/features/registerExpedition/components";
import { MAX_STEPS } from "@/features/registerExpedition/constants";
import { StepConfiguration, StepsNumbers } from "@/models/common";
import { Box, Button, Card, createUseStyles, Step, Stepper, Text } from "@v-uik/base";
import { useState } from "react";

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
        justifyContent: 'space-between'
    },
    stepRoot: {
        minWidth: 150
    }
}));

export const RegisterExpedition = () => {
    const classes = useStyles();
    const [currentStep, setCurrentStep] = useState<StepsNumbers>(0);
    const [errorStepsArray, setErrorStepsArray] = useState<StepsNumbers[]>([0]);

    const handleStepForward = () => {
        if (currentStep !== MAX_STEPS - 1) {
            setCurrentStep((step):StepsNumbers => (step + 1) as StepsNumbers);
        }
    };

    const handleStepBackward = () => {
        if (currentStep > 0) {
            setCurrentStep((step):StepsNumbers => (step - 1) as StepsNumbers);
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
                                error={errorStepsArray.indexOf(step.order) > -1}
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
                            >
                                Назад
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleStepForward}
                            >
                                Далее
                            </Button>
                        </Box>
                    }
                >
                    {STEPS_CONFIGURATION[currentStep].component}
                </Card>
            </Box>
        </>
    )
};
