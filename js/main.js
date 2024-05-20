// const apiUrl = "https://v2.api.noroff.dev";
//
// fetchPosts();
//
// async function fetchPosts() {
//     try {
//         const response = await fetch(`${apiUrl}/blog/posts/ericasheidai`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }
//         const posts = await response.json();
//         displayPosts(posts.data);
//     } catch (error) {
//         console.error('Error fetching posts:', error.message);
//     }
// }
//
// // Function to fetch the latest three posts
// async function fetchLatestPosts() {
//     try {
//         const response = await fetch(`${apiUrl}/blog/posts/ericasheidai?_sort=created:desc&_limit=3`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }
//         const posts = await response.json();
//         return posts.data.slice(0, 3); // Limit to the first three posts
//     } catch (error) {
//         console.error('Error fetching latest posts:', error.message);
//         return [];
//     }
// }
//
//
//
// // Function to create HTML for a single post
// function createPostHTML(post) {
//     return `
//         <div class="carousel-item">
//             <h2>${post.title}</h2>
//             <img src="${post.media.url}" alt="${post.media.alt}" class="post-img">
//             <p>${post.body}</p>
//         </div>
//     `;
// }
//
// // Function to render the posts in a carousel
// async function renderCarousel() {
//     const carouselContainer = document.getElementById('carousel-container');
//     const prevButton = document.getElementById('prev-btn');
//     const nextButton = document.getElementById('next-btn');
//
//     if (!carouselContainer || !prevButton || !nextButton) {
//         console.error('Carousel elements not found.');
//         return;
//     }
//
//     const latestPosts = await fetchLatestPosts();
//     if (latestPosts.length === 0) {
//         console.error('No posts found.');
//         return;
//     }
//
//     carouselContainer.innerHTML = latestPosts.map(post => createPostHTML(post)).join('');
//     const carouselItems = document.querySelectorAll('.carousel-item');
//     let currentSlide = 0;
//
//     showSlide(currentSlide);
//
//     prevButton.addEventListener('click', () => {
//         currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
//         showSlide(currentSlide);
//     });
//
//     nextButton.addEventListener('click', () => {
//         currentSlide = (currentSlide + 1) % carouselItems.length;
//         showSlide(currentSlide);
//     });
//
//     function showSlide(index) {
//         carouselItems.forEach((item, i) => {
//             if (i === index) {
//                 item.classList.add('active');
//             } else {
//                 item.classList.remove('active');
//             }
//         });
//     }
// }
//
// renderCarousel();
//
// function displayPosts(posts) {
//     const postsContainer = document.getElementById('posts');
//     postsContainer.innerHTML = '';
//
//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.innerHTML = `
//             <h2 class="post-title">${post.title}</h2>
//             <p class="post-p">${post.body}</p>
//             <button type="button" class="read-more-btn" data-post-id="${post.id}">Read More</button>
//         `;
//         postsContainer.appendChild(postElement);
//     });
//
//     const readMoreButtons = document.querySelectorAll(".read-more-btn");
//     readMoreButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             const postId = button.dataset.postId;
//
//             button.classList.add("clicked");
//
//             setTimeout(function() {
//                 window.location.href = `post.html?id=${postId}`;
//             }, 1000);
//         });
//     });
//
//
//     window.addEventListener("popstate", function() {
//         readMoreButtons.forEach(button => {
//             button.classList.remove("clicked");
//         });
//     });
// }
document.addEventListener('DOMContentLoaded', async function() {
    await fetchAndDisplayPosts();
    await renderCarousel();
});

const apiUrl = "https://v2.api.noroff.dev";

async function fetchAndDisplayPosts() {
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
            <img class="post-img" src="${post.media.url}" alt="${post.media.alt}">
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

async function renderCarousel() {
    const carouselContainer = document.getElementById('carousel-container');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    if (!carouselContainer || !prevButton || !nextButton) {
        console.error('Carousel elements not found.');
        return;
    }

    const latestPosts = await fetchLatestPosts();
    if (latestPosts.length === 0) {
        console.error('No posts found.');
        return;
    }

    carouselContainer.innerHTML = latestPosts.map(post => createPostHTML(post)).join('');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentSlide = 0;

    showSlide(currentSlide);

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    });

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
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
}

async function fetchLatestPosts() {
    try {
        const response = await fetch(`${apiUrl}/blog/posts/ericasheidai?_sort=created:desc&_limit=3`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const posts = await response.json();
        return posts.data.slice(0, 3); // Slice the array to get only the first three posts
    } catch (error) {
        console.error('Error fetching latest posts:', error.message);
        return [];
    }
}

function createPostHTML(post) {
    return `
        <div class="carousel-item">
            <h2 class="post-title">${post.title}</h2>
            <img class="post-img" src="${post.media.url}" alt="${post.media.alt}">
            <p class="post-p">${post.body}</p>
            <button type="button" class="read-more-btn" data-post-id="${post.id}">Read More</button>
        </div>
    `;
}
