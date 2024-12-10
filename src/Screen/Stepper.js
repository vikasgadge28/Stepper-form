import * as React from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box, Typography, Paper } from "@mui/material";
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import LastStep from '../components/LastStep';
import { useFormContext } from "../useContext"; // Import useFormContext for shared state

const steps = ['Employee Office Details', 'Employee Address Details', 'Final Employee Details'];

function LinearStepper() {
   
    const { activeStepCount } = useFormContext(); // Access shared form data

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <FirstStep />;
            case 1:
                return <SecondStep />;
            case 2:
                return <LastStep />;
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>
            <Paper sx={{ width: '100%', maxWidth: 600, p: 3, boxShadow: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Employee Details
                </Typography>
                <Stepper activeStep={activeStepCount} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 3 }}>
                    {renderStepContent(activeStepCount)}
                </Box>

              
            </Paper>
        </Box>
    );
}

export default LinearStepper;
