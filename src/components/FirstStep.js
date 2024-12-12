/** @format */

import React, { useState } from "react";
import { useFormContext } from "../useContext";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Grid } from "@mui/material";

const FirstStep = () => {
  const { formData, updateFormData, activeStepCount, setActiveStepCount } =
    useFormContext();

  const [errors, setErrors] = useState({
    employeeId: false,
    employeeName: false,
    employeeNumber: false,
  });

  const validateFields = () => {
    const newErrors = {
      employeeId: !formData.employeeId,
      employeeName: !formData.employeeName,
      employeeNumber: !formData.employeeNumber,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Check if all fields are valid
  };

  const handleStepNext = () => {
    if (validateFields()) {
      setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Employee Information
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Employee ID"
          name="employeeId"
          type="number"
          value={formData.employeeId}
          onChange={(e) => updateFormData("employeeId", e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.employeeId}
          helperText={errors.employeeId && "Employee ID is required"}
        />
        <TextField
          label="Employee Name"
          name="employeeName"
          value={formData.employeeName}
          onChange={(e) => updateFormData("employeeName", e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.employeeName}
          helperText={errors.employeeName && "Employee Name is required"}
        />
        <TextField
          label="Employee Number"
          name="employeeNumber"
          type="number"
          value={formData.employeeNumber}
          onChange={(e) => updateFormData("employeeNumber", e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.employeeNumber}
          helperText={errors.employeeNumber && "Employee Number is required"}
        />
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Button
            fullWidth
            color="primary"
            disabled={activeStepCount === 0}
            variant="outlined"
          >
            Previous
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleStepNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstStep;
