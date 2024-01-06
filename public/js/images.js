document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', searchBlogs);
});

const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
  blogs.forEach(blog => {
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
      createBlog(blog);
    }
  })
})

const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
  <div class="blog-card" data-category="${data.category}">
    <img src="${data.bannerImage}" class="blog-image" alt="">
    <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
    
    <a href ="/${blog.id}" class="btn dark">View</a>
  </div>
  `;
}

const filterItems = document.querySelectorAll('.filter-item');

filterItems.forEach(item => {
  item.addEventListener('click', () => {
    const filterCategory = item.dataset.filter;

    // Add/remove 'active' class for styling
    filterItems.forEach(filter => filter.classList.remove('active-filter'));
    item.classList.add('active-filter');

    // Filter blogs based on the category
    filterBlogs(filterCategory);
  });
});

const filterBlogs = (category) => {
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    const cardCategory = card.dataset.category;
    if (category === 'all' || category === cardCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};



function searchBlogs() {
   const searchInput = document.getElementById('blog-search').value.toLowerCase();

   // Get blogs that match the search criteria
   db.collection('blogs')
      .get()
      .then((querySnapshot) => {
         // Clear existing blogs
         blogSection.innerHTML = '';

         // Display the search results
         querySnapshot.forEach((blog) => {
            const data = blog.data();
            const storedTitle = data.title.toLowerCase(); // Convert stored title to lowercase

            if (storedTitle.includes(searchInput)) {
               createBlog(blog);
            }
         });
      })
      .catch((error) => {
         console.error('Error searching blogs:', error);
      });
}
