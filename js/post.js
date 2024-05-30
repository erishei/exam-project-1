const apiUrl = "https://v2.api.noroff.dev";

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetchPost(postId)
            .then(post => {
                displayPost(post);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    } else {
        console.error('Post ID not found in URL parameters.');
    }
});

async function fetchPost(postId) {
    try {
        const response = await fetch(`${apiUrl}/blog/posts/ericasheidai/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post.');
        }
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

function displayPost(post) {
    const postData = post.data;

    const postContainer = document.getElementById('post-container');
    const slicedData = (postData.created).slice(0, 10)
    if (postData && postData.author && postData.author.name) {
        postContainer.innerHTML = `
            <h2 class="single-post-title">${postData.title}</h2>
            <div class="desktop-outer-div">
            <img src="${postData.media.url}" alt="${postData.media.alt}" class="single-post-img"> 
            <section class="desktop-section">
            <p class="single-post-author">Author: ${postData.author.name}</p>
            <p class="single-post-author">Created: ${slicedData}</p>
            <p class="single-post-p">${postData.body}</p>
            </section>
            </div>
        `;
    } else {
        postContainer.innerHTML = `
            <h2 class="post-title">${postData.title}</h2>
            <p class="post-p">${postData.body}</p>
            <img src="${postData.media.url}" alt="${postData.media.alt}" class="post-img"> 
            <p class="post-author">Author: Unknown</p>
        `;
    }
}
