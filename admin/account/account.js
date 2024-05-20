const NOROFF_API_URL = "https://v2.api.noroff.dev";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
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

        const accessToken = data.data.accessToken;
        if (!accessToken) {
            throw new Error("Access token not found in login response.");
        }

        localStorage.setItem("accessToken", accessToken);

        alert("Login successful!");
        window.location.href = "/post/index.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Login failed. Please check your credentials and try again.");
    }
});
