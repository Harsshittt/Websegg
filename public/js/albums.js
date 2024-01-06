document.addEventListener('DOMContentLoaded', function () {
    // Call a function to fetch and display blog albums
    fetchBlogAlbums();
});

const blogAlbumsSection = document.getElementById('blogAlbumsSection');

// Function to fetch and display blog albums
const fetchBlogAlbums = () => {
    // Assuming you have a 'blogs' collection in Firestore
    db.collection('blogs').get().then((blogs) => {
        blogs.forEach((blog) => {
            // Extract blog data
            const data = blog.data();

            // Create a container for each blog album
            const albumContainer = document.createElement('div');
            albumContainer.classList.add('blog-album');

            // Display blog banner image and title
            albumContainer.innerHTML = `
                <img src="${data.bannerImage}" class="blog-album-image" alt="">
                <h1 class="blog-album-title">${data.title}</h1>
            `;

            // Add click event to view blog and its images
            albumContainer.addEventListener('click', () => {
                // Use sessionStorage to store the blogId temporarily
                sessionStorage.setItem('selectedBlogId', blog.id);
                // Trigger a click on the hidden link to navigate to the new gallery page
                document.getElementById('galleryLink').click();
            });

            // Append the blog album to the section
            blogAlbumsSection.appendChild(albumContainer);
        });
    });
};