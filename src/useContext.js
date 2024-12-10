import React, { createContext, useContext, useState } from 'react';

// Create context
const FormContext = createContext();

// Context provider
export const FormProvider = ({ children }) => {
    const [activeStepCount, setActiveStepCount] = React.useState(0);
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        employeeAddress: '',
        employeeNumber: '',
        employeeEmail: '',
        department: '',
        joiningDate: '',
        salary: '',
        designation: '',
    });

    const updateFormData = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData , activeStepCount,setActiveStepCount}}>
            {children}
        </FormContext.Provider>
    );
};

// Custom hook for easier access
export const useFormContext = () => useContext(FormContext);

