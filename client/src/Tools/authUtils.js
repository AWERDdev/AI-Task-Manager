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
 * Send signup data to the server
 * @param {Object} formData - User signup data
 * @returns {Promise<Object>} Result of the signup attempt
 */
    export const sendSignupData = async (formData) => {
      try {
        const response = await fetch('http://localhost:3500/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("Data sent successfully");
          localStorage.setItem('token', data.token);
          return { success: true };
        } else {
          console.log("Failed to send data");
          return { success: false, message: data.message };
        }
      } catch (error) {
        console.log(`Failed to send data: ${error}`);
        return { success: false, message: "Network error" };
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
  /**
   * Send new password to the server
   * @param {string} password - The new password
   * @returns {Promise<Object>} Result of the password update attempt
   */
  export const sendNewPassword = async (password) => {
    try {
      const response = await fetch('http://localhost:3500/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Password updated successfully");
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(`Failed to update password: ${error}`);
      return { success: false, message: "Network error" };
    }
  };

    /**
   * Handle login error responses
   * @param {Object} result - API response result
   * @returns {Object} Formatted errors
   */
    export const handlePasswordErrors = (result) => {
      let newErrors = {};
      
      if (result.status === 400) {
        newErrors.email = result.message || "Invalid input. Please check your details.";
        newErrors.password = "";
      } else if (result.status === 401) {
        newErrors.password = result.message || "Incorrect password.";
      } else {
        newErrors.password = "Something went wrong. Please try again later.";
      }
      
      return newErrors;
    };

