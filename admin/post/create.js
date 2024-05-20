import { apiUrl } from "./admin.js";

const newPostForm = document.getElementById('new-post-form');
const previewOverlay = document.getElementById('preview-overlay');
const previewContent = document.getElementById('preview-content');

function displayPreview() {
    const formData = new FormData(newPostForm);
    const previewHTML = `
        <h2>${formData.get('title')}</h2>
        <p>${formData.get('body')}</p>
        <p>Tags: ${formData.get('tags')}</p> 
        <img src="${formData.get('media-url')}" alt="${formData.get('media-alt')}">
    `;

    previewContent.innerHTML = previewHTML;
    previewOverlay.style.display = 'block';
}

newPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    displayPreview();
});

document.getElementById('close-preview').addEventListener('click', () => {
    previewOverlay.style.display = 'none';
});

document.getElementById('confirm-post').addEventListener('click', async () => {
    const confirmation = confirm("Do you want to submit this post?");
    if (confirmation) {
        try {
            const formData = new FormData(newPostForm);
            const postBody = {
                title: formData.get('title'),
                body: formData.get('body'),
                tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
                media: {
                    url: formData.get('media-url'),
                    alt: formData.get('media-alt'),
                }
            };

            const response = await fetch(apiUrl + "/blog/posts/ericasheidai", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody)
            });

            if (!response.ok) {
                throw new Error('Network response error.');
            }
            alert('New post submitted successfully!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error creating new post.', error.message);
        }
    }
    previewOverlay.style.display = 'none';
});
