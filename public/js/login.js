const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password.login").value.trim();

  if (email && password) {
    let response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const signUpHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("username-signup").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      window.alert("Failed to sign up");
    }
  }
};

document
  .getElementsByClassName("login-form")[0]
  .addEventListener("submit", loginFormHandler);
document
  .getElementsByClassName("signup-form")[0]
  .addEventListener("submit", signUpHandler);
