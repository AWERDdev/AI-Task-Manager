/** 
 * @returns {Object} User tasks data 
 */
export const RequestTasks = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (!userData || !userData.token) {
            console.error("No user data or token found in localStorage.");
            return { success: false, message: "No authentication token found" };
        }
        
        const response = await fetch("http://127.0.0.1:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: userData.token }),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Server Error:", response.status, errorData.detail || response.statusText);
            return { 
                success: false, 
                message: errorData.detail || `Server error: ${response.status}` 
            };
        }
        
        const data = await response.json();
        console.log("Fetched Tasks:", data);
        
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return { success: false, message: error.message };
    }
};

export const RequestUsersTasks = async () => {
    try {
        const result = await RequestTasks();
        if (result.success) {
            console.log('Fetching tasks successful');
            return result.tasks;
        } else {
            console.log('Fetching tasks failed:', result.message);
            return [];
        }
    } catch (error) {
        console.error("Error in RequestUsersTasks:", error);
        return [];
    }
};

