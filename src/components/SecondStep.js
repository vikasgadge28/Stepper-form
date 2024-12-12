/** @format */

import React, { useState } from "react";
import { TextField, Box, Typography, MenuItem, Grid } from "@mui/material";
import { useFormContext } from "../useContext";
import Button from "@mui/material/Button";

const SecondStep = () => {
  const { formData, updateFormData, setActiveStepCount, activeStepCount } =
    useFormContext();

  const [errors, setErrors] = useState({
    employeeAddress: false,
    employeeEmail: false,
    department: false,
  });

  const validateFields = () => {
    const newErrors = {
      employeeAddress: !formData.employeeAddress,
      employeeEmail: !formData.employeeEmail || !/\S+@\S+\.\S+/.test(formData.employeeEmail),
      department: !formData.department,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Check if all fields are valid
  };

  const handleStepNext = () => {
    if (validateFields()) {
      setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleStepBack = () => {
    setActiveStepCount((prevActiveStep) => prevActiveStep - 1);
  };

  const departments = ["HR", "Engineering", "Marketing", "Sales"];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Additional Employee Details
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Employee Address"
          name="employeeAddress"
          value={formData.employeeAddress}
          onChange={(e) => updateFormData("employeeAddress", e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          error={errors.employeeAddress}
          helperText={errors.employeeAddress && "Employee Address is required"}
        />
        <TextField
          label="Employee Email"
          name="employeeEmail"
          type="email"
          value={formData.employeeEmail}
          onChange={(e) => updateFormData("employeeEmail", e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.employeeEmail}
          helperText={
            errors.employeeEmail &&
            (formData.employeeEmail
              ? "Invalid email format"
              : "Employee Email is required")
          }
        />
        <TextField
          label="Department"
          name="department"
          value={formData.department}
          onChange={(e) => updateFormData("department", e.target.value)}
          variant="outlined"
          select
          fullWidth
          error={errors.department}
          helperText={errors.department && "Department is required"}
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Button
            fullWidth
            color="primary"
            disabled={activeStepCount === 0}
            onClick={handleStepBack}
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

export default SecondStep;
