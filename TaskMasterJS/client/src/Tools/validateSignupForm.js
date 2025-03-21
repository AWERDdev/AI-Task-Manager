/**
 * Validates signup form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} Object containing errors and isValid flag
 */
export const validateSignupForm = (formData) => {
    let errors = {};
    
    if (!formData.fullName?.trim()) {
      errors.fullName = "Full Name is required";
    }
    
    if (!formData.Username?.trim()) {
      errors.Username = "Username is required";
    }
    
    if (!formData.email?.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Enter a valid email address";
    }
    
    if (!formData.password || formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    
    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms";
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };
  
  /**
   * Custom hook for form handling
   * @param {Object} initialValues - Initial form values
   * @param {Function} validateFn - Validation function
   * @returns {Object} Form state and handlers
   */
  import { useState } from 'react';
  
  export const useForm = (initialValues, validateFn) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { id, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : value,
      }));
    };
    
    const validateForm = () => {
      const { errors, isValid } = validateFn(formData);
      setErrors(errors);
      return isValid;
    };
    
    const resetForm = () => {
      setFormData(initialValues);
      setErrors({});
    };
    
    return {
      formData,
      errors,
      handleChange,
      validateForm,
      setErrors,
      resetForm
    };
  };
  
