const logout = async () => {
  const response = await fetch("/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    window.alert("Failed to log out");
  }
};

document.getElementById("logout").addEventListener("click", logout);
