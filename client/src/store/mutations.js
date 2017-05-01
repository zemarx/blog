
export const increment = state => {
    state.counter++
};

export const decrement = state => {
    state.counter--
};

// Fetching all the user's posts
export const fetchPosts = (state, posts) => {
    console.log('Fetching posts...');
    state.posts = posts;
};

// Adding new post
export const addPost = (state, post) => {
    console.log('Adding post...');
    // state.posts.push(post);
};

export const fetchPost = (state, postId) => {
    console.log('Fetching post...');
};

export const updatePost = (state, post) => {
    console.log('Updating post...');
};

export const deletePost = (state, postId) => {
    console.log('Deleting post...');
};
