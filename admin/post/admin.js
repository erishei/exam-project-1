export const apiUrl = "https://v2.api.noroff.dev";

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
    setupLogoutButton();
});

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
    if (!postsContainer) {
        console.error('Posts container not found.');
        return;
    }
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add("inner-post-div");
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <img src="${post.media.url}" alt="${post.media.alt}" class="post-img"> 
            <p class="post-p">${post.body}</p>
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-delete-btn');
        editButton.addEventListener('click', () => {
            const postId = post.id;
            window.location.href = `edit.html?id=${postId}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('edit-delete-btn');
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm("Are you sure you want to delete this post?");
            if (confirmation) {
                deletePost(post.id);
            }
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        postElement.appendChild(buttonContainer);

        postsContainer.appendChild(postElement);
    });
}

async function deletePost(postId) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('No token found in localStorage.');
            return;
        }

        console.log(`Attempting to delete post with ID: ${postId}`);
        const response = await fetch(`${apiUrl}/blog/posts/ericasheidai/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Network response was not ok.');
            return;
        }

        console.log('Post deleted successfully, refreshing posts...');
        fetchPosts();
    } catch (error) {
        console.error('Error deleting post:', error.message);
    }
}

function setupLogoutButton() {
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            const confirmation = confirm("Are you sure you want to log out?");
            if (confirmation) {
                localStorage.clear();
                window.location.href = '/admin/account/login.html';
            }
        });
    } else {
        console.error('Logout button not found.');
    }
}
