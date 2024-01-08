// ecommercePackage.js

class ECommercePackage {
  constructor() {
    // Create a container for the modal
    this.container = document.createElement("div");
    this.container.id = "fake-json-post-container";
    document.body.appendChild(this.container);

    // Fetch all posts when the instance is created
    this.fetchPosts();

    // Add styles
    this.addStyles();
  }

  openECommerceWebsite() {
    this.container.style.display = "flex";
  }

  closePostSection() {
    this.container.style.display = "none";
  }

  fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => this.displayPosts(posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }

  displayPosts(posts) {
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Display each post as a post
    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.className = "post";
      postCard.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <button class="viewCommentsBtn" data-post-id="${post.id}">View Comments</button>
        `;
      modalContent.appendChild(postCard);
    });

    // Add close button for the post section
    modalContent.innerHTML += `<span class="close" onclick="${this.closePostSection.bind(this)}">&times;</span>`;

    this.container.innerHTML = "";
    this.container.appendChild(modalContent);

    // Add event listeners for dynamically added buttons
    this.container.querySelectorAll(".viewCommentsBtn").forEach((button) => {
      button.addEventListener("click", () => this.viewComments(button.dataset.postId));
    });
  }

  viewComments(postId) {
    // Display loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.style.display = "flex";
    loadingOverlay.innerHTML = '<div class="loading">Loading...</div>';
    this.container.appendChild(loadingOverlay);

    // Display post details
    const modalContent = this.container.querySelector(".modal-content");
    modalContent.innerHTML = `
      <h2>Post Details</h2>
      <p>Post ID: ${postId}</p>
    `;

    // Fetch comments for the specific post
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((comments) => {
        // Hide loading overlay
        loadingOverlay.style.display = "none";

        // Display each comment
        if (comments.length > 0) {
          comments.forEach((comment) => {
            modalContent.innerHTML += `
                <h3>Comment</h3>
                <p>Name: ${comment.name}</p>
                <p>Email: ${comment.email}</p>
                <p>Body: ${comment.body}</p>
              `;
          });

          // Add go back and close buttons for the comments page
          modalContent.innerHTML += `
              <span class="close" onclick="${this.closePostSection.bind(this)}">&times;</span>
              <button class="viewCommentsBtn" onclick="${this.goBackToPosts.bind(this)}">Go Back</button>
              <button class="viewCommentsBtn" onclick="${this.closePostSection.bind(this)}">Close</button>
            `;
        } else {
          modalContent.innerHTML +=
            "<p>No comments available for this post.</p>";
        }
      })
      .catch((error) => {
        // Hide loading overlay
        loadingOverlay.style.display = "none";

        // Display an error message if fetching fails
        modalContent.innerHTML +=
          '<div class="error">Error fetching comments</div>';
        console.error("Error fetching comments:", error);
      });
  }

  goBackToPosts() {
    const modalContent = this.container.querySelector(".modal-content");

    // Clear comments and buttons
    modalContent.innerHTML = "";

    // Fetch all posts when going back
    this.fetchPosts();
  }

  addStyles() {
    const styles = `
      body {
        margin: 0;
        font-family: 'Arial', sans-serif;
      }

      .modal {
        display: none;
        align-items: flex-start;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        overflow-y: auto;
      }

      .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        width: 100%;
        min-height: 100vh;
        box-sizing: border-box;
      }

      .close {
        font-size: 20px;
        cursor: pointer;
        color: #555;
        position: absolute;
        top: 10px;
        right: 20px;
      }

      .post {
        margin-bottom: 20px;
      }

      .viewCommentsBtn {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      }

      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
      }

      .loading {
        text-align: center;
        font-style: italic;
        font-size: 50px;
        color: #feeffe;
      }

      .error {
        text-align: center;
        color: #ff0000;
      }

      /* Add other styles as needed */

    `;

    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
  }
}

// Export the class instance
const ecommercePackageInstance = new ECommercePackage();
export default ecommercePackageInstance;
