const dummy = (blogs) => {
  return 1
}

const totalLikes = (blog) => {
  return blog.length === 1 ? blog[0].likes : blog.reduce((prev, cur) => prev + cur.likes, 0)
}

const favouriteBlog = (blogs) => {
   const mostLikedPost = blogs.reduce((max, post) => {
     return post.likes > max.likes ? post : max;
   }, blogs[0]);

   return {
      title : mostLikedPost.title,
      author: mostLikedPost.author,
      likes: mostLikedPost.likes
   }
}

const mostBlogs = (blogs) => {
  const authorBlogCount = blogs.reduce((countMap, blog) => {
    countMap[blog.author] = (countMap[blog.author] || 0) + 1;
    return countMap;
  }, {});

  let maxBlogs = 0;
  let mostProlificAuthor = null;

   for (const author in authorBlogCount) {
     if (authorBlogCount[author] > maxBlogs) {
       maxBlogs = authorBlogCount[author];
       mostProlificAuthor = { author: author, blogs: maxBlogs };
     }
   }

  return mostProlificAuthor;
}

const mostLikes = (blogs) => {
  const authorBlogCount = blogs.reduce((countMap, blog) => {
    countMap[blog.author] = (countMap[blog.author] || 0) + blog.likes;
    return countMap;
  }, {});

  let maxLikes = 0;
  let authorWithMostLikes = null;

  for (const author in authorBlogCount) {
    if (authorBlogCount[author] > maxLikes) {
      maxLikes = authorBlogCount[author];
      authorWithMostLikes = { author: author, likes: maxLikes };
    }
  }

  return authorWithMostLikes;
};


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};

