// ecommercePackage.js

function openECommerceWebsite() {
  const websiteContainer = document.createElement("div");
  websiteContainer.id = "fake-json-post-container";
  websiteContainer.innerHTML = `
      <style>
        body {
          margin: 0;
          font-family: 'Arial', sans-serif;
        }
  
        .modal {
          display: flex;
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
      </style>
      <div id="myModal" class="modal">
          <div class="modal-content">
              <span class="close" onclick="closePostSection()">&times;</span>
              <div id="loadingOverlay" class="loading-overlay" style="display:none;">
                  <div class="loading">Loading...</div>
              </div>
              <div id="modalPstDetails">
                  <!-- post or post details will be displayed here -->
              </div>
              <div id="apiData">
                  <!-- API data (comments) will be displayed here -->
              </div>
          </div>
      </div>
    `;

  document.body.appendChild(websiteContainer);

  // Fetch all posts when the page loads
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      const modalPstDetails = document.getElementById("modalPstDetails");

      // Display each post as a post
      posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "post";
        postCard.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button class="viewCommentsBtn" onclick="viewComments(${post.id})">View Comments</button>
          `;
        modalPstDetails.appendChild(postCard);
      });

      // Add close button for the post section
      modalPstDetails.innerHTML += `
          <span class="close" onclick="closePostSection()">&times;</span>
        `;
    })
    .catch((error) => console.error("Error fetching posts:", error));
}

function viewComments(postId) {
  // Display loading overlay
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "flex";

  // Display post details
  const modalPstDetails = document.getElementById("modalPstDetails");
  modalPstDetails.innerHTML = `
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
          modalPstDetails.innerHTML += `
              <h3>Comment</h3>
              <p>Name: ${comment.name}</p>
              <p>Email: ${comment.email}</p>
              <p>Body: ${comment.body}</p>
            `;
        });

        // Add go back and close buttons for the comments page
        modalPstDetails.innerHTML += `
            <span class="close" onclick="closePostSection()">&times;</span>
            <button class="viewCommentsBtn" onclick="goBackToPosts()">Go Back</button>
            <button class="viewCommentsBtn" onclick="closePostSection()">Close</button>
          `;
      } else {
        modalPstDetails.innerHTML +=
          "<p>No comments available for this post.</p>";
      }
    })
    .catch((error) => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";

      // Display an error message if fetching fails
      modalPstDetails.innerHTML +=
        '<div class="error">Error fetching comments</div>';
      console.error("Error fetching comments:", error);
    });
}

function goBackToPosts() {
  const modalPstDetails = document.getElementById("modalPstDetails");
  const apiData = document.getElementById("apiData");

  // Clear comments and buttons
  modalPstDetails.innerHTML = "";
  apiData.innerHTML = "";

  // Fetch all posts when going back
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      // Display each post as a post
      posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "post";
        postCard.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button class="viewCommentsBtn" onclick="viewComments(${post.id})">View Comments</button>
          `;
        modalPstDetails.appendChild(postCard);
      });

      // Add close button for the post section
      modalPstDetails.innerHTML += `
          <span class="close" onclick="closePostSection()">&times;</span>
        `;
    })
    .catch((error) => console.error("Error fetching posts:", error));
}

function closePostSection() {
  const websiteContainer = document.getElementById("fake-json-post-container");
  if (websiteContainer) {
    websiteContainer.remove();
  }
}
module.export = {
  openECommerceWebsite,
  viewComments,
  goBackToPosts,
  closePostSection,
};
