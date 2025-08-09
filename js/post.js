document.addEventListener('DOMContentLoaded', () => {
    // Get the post ID from the URL
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    // If there's an ID, fetch the specific post
    if (postId) {
        fetchPost(postId);
    }
});

async function fetchPost(id) {
    const postContainer = document.getElementById('single-post-container');

    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        
        // Find the post with the matching ID. Note: postId is a string.
        const post = posts.find(p => p.id == id);

        if (post) {
            // Update the page title to the post's title
            document.title = post.title;

            // Display the post content
            postContainer.innerHTML = `
                <h1 class="full-post-title">${post.title}</h1>
                <img src="${post.image}" alt="${post.title}" class="full-post-image">
                <div class="full-post-content">
                    ${post.content}
                </div>
            `;
        } else {
            postContainer.innerHTML = '<p>Post not found.</p>';
        }
    } catch (error) {
        console.error('Failed to fetch post:', error);
        postContainer.innerHTML = '<p>Error loading post.</p>';
    }
}