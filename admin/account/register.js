const apiURL = "https://v2.api.noroff.dev";

document.getElementById('register-form').addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert("Please fill out all required fields.");
        return;
    }

    try {
        const response = await fetch(`${apiURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error data:', data);
            if (data.errors && data.errors.length > 0) {
                console.error('Detailed errors:', data.errors);
                const errorMessage = data.errors.map(error => error.message).join(', ');
                throw new Error(errorMessage);
            }
            throw new Error(data.message || "Registration failed. Please try again.");
        }

        alert("Your registration was successful!");
        location.href = "/login.html";
    } catch (error) {
        console.error("Error:", error.message);
        if (error.message.includes("Profile already exists")) {
            alert("Registration failed: A profile with this username or email already exists.");
        } else {
            alert(`Registration failed: ${error.message}. Please check your information and try again.`);
        }
    }
});
