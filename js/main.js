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

    const readMoreButtons = document.querySelectorAll(".read-more-btn");
    readMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            const postId = button.dataset.postId;

            button.classList.add("clicked");

            setTimeout(function() {
                window.location.href = `post.html?id=${postId}`;
            }, 1000);
        });
    });


    window.addEventListener("popstate", function() {
        readMoreButtons.forEach(button => {
            button.classList.remove("clicked");
        });
    });
}
