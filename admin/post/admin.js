// const apiUrl = "https://v2.api.noroff.dev";
//
// fetchPosts();
//
// async function fetchPosts() {
//     const token = localStorage.getItem('accessToken');
//
//     if (!token) {
//         console.error('No token found in localStorage.');
//         return;
//     }
//
//     try {
//         const response = await fetch(apiUrl + "/blog/posts/ericasheidai", {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//
//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }
//
//         const posts = await response.json();
//
//         displayPosts(posts.data);
//     } catch (error) {
//         console.error('Error fetching posts:', error.message);
//     }
// }
//
// function displayPosts(posts) {
//     const postsContainer = document.getElementById('posts');
//     postsContainer.innerHTML = '';
//     console.log(posts);
//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.innerHTML = `
//             <h2 class="post-title">${post.title}</h2>
//             <img class="post-img" src="${post.media.url}">
//             <p class="post-p">${post.body}</p>
//         `;
//         postsContainer.appendChild(postElement);
//     });
// }
const apiUrl = "https://v2.api.noroff.dev";

fetchPosts();
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

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <img src="${post.media.url}" alt="${post.media.alt}" class="post-img"> 
            <p class="post-p">${post.body}</p>
        `;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const postId = post.id;
            window.location.href = `edit.html?id=${postId}`;
        });
        postElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm("Are you sure you want to delete this post?");
            if (confirmation) {
                deletePost(post.id);
            }
        });
        postElement.appendChild(deleteButton);

        postsContainer.appendChild(postElement);
    });
}

async function deletePost(postId) {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(apiUrl + `/blog/posts/ericasheidai/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        // Reload posts after successful deletion
        fetchPosts();
    } catch (error) {
        console.error('Error deleting post:', error.message);
    }
}
