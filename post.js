let posts = [];
let currentId = 1;

function getAllPosts() {
    return posts;
}

function addPost(title, content) {
    posts.push({ id: currentId++, title, content });
}

function getPostById(id) {
    return posts.find(post => post.id === parseInt(id));
}

function updatePost(id, title, content) {
    const post = posts.find(post => post.id === parseInt(id));
    if (post) {
        post.title = title;
        post.content = content;
    }
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== parseInt(id));
}

export default {
    getAllPosts,
    addPost,
    getPostById,
    updatePost,
    deletePost
};
