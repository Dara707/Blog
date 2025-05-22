// Import necessary modules
import express from "express";
import bodyParser from "body-parser"; 
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current directory path (ES module style)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app and set port
const app = express();
const port = 3000;

// Temporary in-memory storage for blog posts
let posts = [];

// Set EJS as the view engine for rendering templates
app.set('view engine', 'ejs');
// Set the folder where EJS files (views) are located
app.set('views', path.join(__dirname, 'views'));
// Serve static files (like CSS) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route: Home page - show list of all posts
app.get("/", (req, res) => {
    res.render("index.ejs", { posts }); // Pass the posts array to the template
});

// Route: Show form to create a new post
app.get('/new', (req, res) => {
    res.render('new.ejs'); // Render the form for a new blog post
});

// Route: Handle submission of a new blog post
app.post('/new', (req, res) => {
  console.log('Form submitted:', req.body); // Log submitted form data for debugging
  const { title, content } = req.body; // Get title and content from form
  posts.push({ title, content }); // Add new post to the posts array
  res.redirect('/'); // Redirect to home to show the updated list
});

// Route: Show a single blog post based on its ID (index in the array)
app.get('/post/:id', (req, res) => {
  const post = posts[req.params.id]; // Get the post by index
  if (post) {
    res.render('post.ejs', { post }); // Render post if found
  } else {
    res.status(404).send('Post not found'); // Send error if index is invalid
  }
});

// Route: Delete a blog post by ID
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id); // Convert ID from URL to a number
  if (!isNaN(id) && id >= 0 && id < posts.length) {
    posts.splice(id, 1); // Remove the post from the array
  }
  res.redirect('/'); // Redirect to home page
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
