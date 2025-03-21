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