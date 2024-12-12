/** @format */

import React, { useState } from "react";
import { TextField, Box, Typography, MenuItem, Grid } from "@mui/material";
import { useFormContext } from "../useContext";
import Button from "@mui/material/Button";

const LastStep = () => {
  const { formData, updateFormData, activeStepCount, setActiveStepCount } =
    useFormContext();

  const [errors, setErrors] = useState({
    joiningDate: false,
    salary: false,
    designation: false,
  });

  const validateFields = () => {
    const newErrors = {
      joiningDate: !formData.joiningDate,
      salary: !formData.salary || formData.salary <= 0,
      designation: !formData.designation,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Return true if all fields are valid
  };

  const handleStepBack = () => {
    setActiveStepCount((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      const response = await fetch("https://your-api-endpoint.com/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  const designations = [
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Team Lead",
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Final Employee Details
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Joining Date"
          name="joiningDate"
          type="date"
          value={formData.joiningDate}
          onChange={(e) => updateFormData("joiningDate", e.target.value)}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.joiningDate}
          helperText={errors.joiningDate && "Joining Date is required"}
        />
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={(e) => updateFormData("salary", e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.salary}
          helperText={
            errors.salary &&
            (formData.salary
              ? "Salary must be greater than 0"
              : "Salary is required")
          }
        />
        <TextField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={(e) => updateFormData("designation", e.target.value)}
          variant="outlined"
          select
          fullWidth
          error={errors.designation}
          helperText={errors.designation && "Designation is required"}
        >
          {designations.map((designation) => (
            <MenuItem key={designation} value={designation}>
              {designation}
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
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LastStep;
