const apiUrl = "https://v2.api.noroff.dev";

fetchPosts();

async function fetchPosts() {
    try {
        const response = await fetch(`${apiUrl}/blog/posts/ericasheidai`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const posts = await response.json();
        displayPosts(posts.data);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-p">${post.body}</p>
            <button type="button" class="read-more-btn" data-post-id="${post.id}">Read More</button>
        `;
        postsContainer.appendChild(postElement);
    });

    // Attach event listener to all "read more" buttons
    const readMoreButtons = document.querySelectorAll(".read-more-btn");
    readMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            const postId = button.dataset.postId;

            // Add a class to trigger the underline effect
            button.classList.add("clicked");

            // Delay the navigation after 1 second
            setTimeout(function() {
                window.location.href = `post.html?id=${postId}`;
            }, 1000);
        });
    });

    // Listen for popstate event (navigating back)
    window.addEventListener("popstate", function() {
        // Remove the "clicked" class from all buttons
        readMoreButtons.forEach(button => {
            button.classList.remove("clicked");
        });
    });
}
