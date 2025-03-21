import { useState } from "react";

/**
 * Email validation function
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Password validation function
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum password length
 * @returns {boolean} Whether password is valid
 */
export const isValidPassword = (password, minLength = 8) => {
  return password && password.length >= minLength;
};

/**
 * Form validation hook for login/signup
 * @returns {Object} Form state and validation functions
 */
export const useFormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    let newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    validateForm
  };
};


/**
 * Send login data to the server
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Result of the login attempt
 */
export const sendLoginData = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3500/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message, status: response.status };
      }
    } catch (error) {
      console.error(`Network Error: ${error}`);
      return { success: false, message: "Network error", status: 500 };
    }
  };
  
  /**
   * Handle login error responses
   * @param {Object} result - API response result
   * @returns {Object} Formatted errors
   */
  export const handleLoginErrors = (result) => {
    let newErrors = {};
    
    if (result.status === 400) {
      newErrors.email = result.message || "Invalid input. Please check your details.";
      newErrors.password = "";
    } else if (result.status === 404) {
      newErrors.email = result.message || "Email not found.";
    } else if (result.status === 401) {
      newErrors.password = result.message || "Incorrect password.";
    } else {
      newErrors.email = "Something went wrong. Please try again later.";
      newErrors.password = "";
    }
    
    return newErrors;
  };