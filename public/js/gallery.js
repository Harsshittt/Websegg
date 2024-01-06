document.addEventListener('DOMContentLoaded', function () {
    // Call a function to fetch and display blog images
    fetchBlogImages();
});

const blogImagesSection = document.getElementById('blogImagesSection');

// Function to fetch and display blog images
const fetchBlogImages = () => {
    // Get the selected blogId from sessionStorage
    const selectedBlogId = sessionStorage.getItem('selectedBlogId');

    // Assuming you have a 'blogs' collection in Firestore
    db.collection('blogs').doc(selectedBlogId).get().then((blog) => {
        // Extract blog data
        const data = blog.data();

        // Extract image URLs from the article text
        const imageUrls = extractImageUrls(data.article);

        // Create HTML elements for each image
        imageUrls.forEach((imageUrl) => {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = 'Blog Image';
            imageElement.classList.add('blog-image');

            // Append the image to the section
            blogImagesSection.appendChild(imageElement);
        });
    });
};

// Function to extract image URLs from the article text
const extractImageUrls = (article) => {
    const imageUrlRegex = /!\[.*?\]\((.*?)\)/g;
    const matches = [];
    let match;

    while ((match = imageUrlRegex.exec(article)) !== null) {
        matches.push(match[1]);
    }

    return matches;
};