const showComments = (event) => {
  document.location.replace(`/wall/post/${event.id}`);
};

const addComment = async (event) => {
  event.preventDefault();

  const currentLocation = window.location.href;
  const postID = currentLocation.split("/")[5];

  const body = document.getElementById("comment-content").value.trim();
  const username = document.getElementById("username-id").innerHTML;

  // console.log(postID);

  if (body) {
    const response = await fetch(`/wall/post/${postID}`, {
      method: "POST",
      body: JSON.stringify({ body: body, name_poster: username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/wall/post/${postID}`);
    } else {
      window.alert("There's a mistake, try again.");
    }
  } else {
    window.alert(
      "To create a new post, you must type the title and the content"
    );
  }
};

document
  .getElementById("add-comment")
  .addEventListener("submit", (event) => addComment(event));
