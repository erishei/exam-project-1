const apiUrl = "https://v2.api.noroff.dev";
async function fetchPosts() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        console.error('No token found in localStorage.');
        return;
    }

    try {
        const response = await fetch(apiUrl + "/blog/posts/ericasheidai", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

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
    console.log(posts);
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <img src="${post.media}">
            <p class="post-p">${post.body}</p>
            <button class="read-more-btn">Read More</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

fetchPosts();
displayPosts();