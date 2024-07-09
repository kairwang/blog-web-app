import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import posts from './post.js';  // Adjusted relative path

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { posts: posts.getAllPosts() });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const { title, content } = req.body;
    posts.addPost(title, content);
    res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
    const post = posts.getPostById(req.params.id);
    res.render('edit-post', { post });
});

app.post('/edit-post/:id', (req, res) => {
    const { title, content } = req.body;
    posts.updatePost(req.params.id, title, content);
    res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
    posts.deletePost(req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
