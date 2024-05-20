const callUrl = "https://v2.api.noroff.dev/blog/posts/ericasheidai/";
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const combinedURL = callUrl + postId;
console.log(combinedURL);

async function generateData() {
    try {
        const response = await fetch(combinedURL, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const postData = await response.json();
        console.log(postData)
        populateEditForm(postData);
    } catch (error) {
        console.error('Error fetching post data:', error.message);
    }
}

function populateEditForm(post) {

    const editContainer = document.getElementById('edit-container');
    if (!editContainer) {
        console.error('Edit container not found.');
        return;
    }

    const postData = post.data
    const title = postData.title || '';
    const body = postData.body || '';
    const tags = postData.tags ? postData.tags : [];
    const mediaUrl = postData.media && postData.media.url ? postData.media.url : '';
    const mediaAlt = postData.media && postData.media.alt ? postData.media.alt : '';
    console.log(post)

    editContainer.innerHTML = `
        <form id="edit-post-form">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="${title}" required>
            <label for="body">Body:</label>
            <textarea id="body" name="body" rows="5" cols="50">${body}</textarea>
            <label for="tags">Tags:</label>
            <input type="text" id="tags" name="tags" value="${tags.join(', ')}">
            <label for="media-url">Media URL:</label>
            <input type="text" id="media-url" name="media-url" value="${mediaUrl}">
            <label for="media-alt">Media Alt Text:</label>
            <input type="text" id="media-alt" name="media-alt" value="${mediaAlt}">
            <button type="submit">Save Changes</button>
        </form>
    `;
    console.log(mediaAlt)

    const editPostForm = document.getElementById('edit-post-form');
    editPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const confirmation = confirm("Save and submit changes?");
        if (confirmation) {
            updatePost(postId);
        }
    });
}

async function updatePost(postId) {
    try {
        const formData = new FormData(document.getElementById('edit-post-form'));
        const postBody = {
            title: formData.get('title'),
            body: formData.get('body'),
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            media: {
                url: formData.get('media-url'),
                alt: formData.get('media-alt'),
            }
        };

        const response = await fetch(combinedURL, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        });

        if (!response.ok) {
            throw new Error('Network response error.');
        }

        alert('Post updated successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error updating post.', error.message);
    }
}

generateData();