/**
 * @returns {Object} User tasks data
 */
export const RequestTasks = async () => {
    try {
        const userData = localStorage.getItem('user');
        // const email  = userData.email;

        // console.log("User Data:", userData);
        // console.log("User email:", userData.email)`;
        if (!userData) {
            console.error("No user data found in localStorage.");
            return;
        }

        const response = await fetch("http://127.0.0.1:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userData }),  // Send only needed data
        });

        if (!response.ok) {
            console.error("Server Error:", response.status, response.statusText);
            return;
        }

        const data = await response.json(); // Only call if response is ok
        console.log("Fetched Tasks:", data);
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};
