require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connection Successfull")
}).catch((err) => {
    console.log("MongoDB connection error:", err.message)
})

// Schemas
const blogSchema = new mongoose.Schema({
  newTitle: String,
  newContent: String,
  date: String,
  likes: Number,
  author: String,    // email of the person who wrote the blog
  category: String   // General, Technology, Travel, ...
});
const Blog = mongoose.model('Blog', blogSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Checks that the person is logged in
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.email) {
      return res.status(401).json({ message: 'Please logout and login again' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired login. Please login again' });
  }
}

// ---------- Blog routes ----------

// Get all blogs (open to everyone)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a blog (login needed)
app.post('/api/blogs', auth, async (req, res) => {
  const blog = new Blog({
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    date: req.body.date,
    likes: 0,
    author: req.user.email,
    category: req.body.category || 'General'
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Like a blog (login needed)
app.patch('/api/blogs/like/:id', auth, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a blog (only the author)
app.put('/api/blogs/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Old blogs have no author, so any logged-in user can change them
    if (blog.author && blog.author !== req.user.email) {
      return res.status(403).json({ message: 'You can only edit your own blogs' });
    }
    blog.newTitle = req.body.newTitle;
    blog.newContent = req.body.newContent;
    blog.category = req.body.category || blog.category || 'General';
    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a blog (only the author)
app.delete('/api/blogs/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.author && blog.author !== req.user.email) {
      return res.status(403).json({ message: 'You can only delete your own blogs' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------- User routes ----------

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));