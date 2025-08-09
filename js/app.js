// This function runs automatically once the webpage's content is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // We call the main function to fetch and display the posts.
    loadPosts();
});

/**
 * Fetches post data from posts.json and displays them on the page.
 * Uses async/await for modern, clean asynchronous code.
 */
async function loadPosts() {
    // Get the container element from the HTML where we will place the posts.
    const postsContainer = document.getElementById('posts-container');

    // A try...catch block handles any errors during the fetch operation.
    try {
        // Fetch the JSON file. 'await' pauses the function until the file is retrieved.
        const response = await fetch('posts.json');

        // If the response is not 'ok' (e.g., a 404 Not Found error), throw an error.
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response into a JavaScript array.
        const posts = await response.json();

        // Clear any previous content (like a "Loading..." message).
        postsContainer.innerHTML = '';

        // Loop through each post object in the 'posts' array.
        posts.forEach(post => {
            // Create a new 'div' element for the card.
            const card = document.createElement('div');
            // Add the 'post-card' class for styling.
            card.classList.add('post-card');

            // Set the inner HTML of the card using a template literal for easy variable insertion.
            card.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                   <a href="post.html?id=${post.id}" class="read-more-btn">Read More</a>
                </div>
            `;

            // Append the newly created card to the main container.
            postsContainer.appendChild(card);
        });

    } catch (error) {
        // If any error occurred in the 'try' block, it's caught here.
        console.error('Failed to load posts:', error);
        // Display an error message to the user inside the container.
        postsContainer.innerHTML = '<p>Sorry, there was an error loading the blog posts.</p>';
    }
}