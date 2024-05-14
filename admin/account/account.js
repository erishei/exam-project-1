// script.js
const NOROFF_API_URL = "https://v2.api.noroff.dev";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // prevent default form submission

    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate input (you can add more robust validation here)
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        // Send login request to the API
        const response = await fetch(`${NOROFF_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error("Login failed. Please try again.");
        }

        const data = await response.json();

        // Assuming the API returns an accessToken upon successful login
        const accessToken = data.data.accessToken;
        if (!accessToken) {
            throw new Error("Access token not found in login response.");
        }

        // Store the access token in local storage for future requests
        localStorage.setItem("accessToken", accessToken);

        // Redirect to another page or perform other actions
        alert("Login successful!");
        location.href = "/admin/post/index.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Login failed. Please check your credentials and try again.");
    }
});
