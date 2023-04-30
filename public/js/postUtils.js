const createNewUserPost = async (event) => {
  event.preventDefault();

  const currentLocation = window.location.href;
  const userID = currentLocation.split("/")[4];

  const title = document.getElementById("post-title").value.trim();
  const body = document.getElementById("post-content").value.trim();

  if (title && body) {
    const response = await fetch(`/user/${userID}`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/user/${userID}`);
    } else {
      window.alert("There's a mistake, try again.");
    }
  } else {
    window.alert(
      "To create a new post, you must type the title and the content"
    );
  }
};

const deleteUserPost = async (event) => {
  const currentLocation = window.location.href;
  const userID = currentLocation.split("/")[4];

  if (window.confirm("Are you sure to delete this post?")) {
    const response = await fetch(`/user/post/${event.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/user/${userID}`);
    } else {
      window.alert("There's a mistake, try again.");
    }
  }
};

const updateUserPost = async (event) => {
  event.preventDefault();

  const currentLocation = window.location.href;
  const userID = currentLocation.split("/")[4];

  const title = document.getElementById("edit-post-title").value.trim();
  const body = document.getElementById("edit-post-content").value.trim();

  if (title && body) {
    const response = await fetch(`/user/post/${event.srcElement[2].id}`, {
      method: "PUT",
      body: JSON.stringify({ title, body, name_poster: userID }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/user/${userID}`);
    } else {
      window.alert("There's a mistake, try again.");
    }
  } else {
    window.alert(
      "To edit the post, you must type the new title and the new content"
    );
  }
};

document
  .getElementById("add-post")
  .addEventListener("submit", (event) => createNewUserPost(event));

document
  .getElementById("edit-post")
  .addEventListener("submit", (event) => updateUserPost(event));
