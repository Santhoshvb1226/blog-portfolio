
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './common/Footer';
import API_URL from '../config/api';

const CATEGORIES = [
  'General',
  'Technology',
  'Travel',
  'Lifestyle',
  'Education'
];

const CATEGORY_STYLES = {
  General: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  Technology: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Travel: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Lifestyle: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  Education: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
};

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('General');

  const [publishing, setPublishing] = useState(false);

  const token = localStorage.getItem('token');
  const myEmail = localStorage.getItem('email');

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const showError = (error) => {
    alert(error.response?.data?.message || 'Something went wrong. Please try again.');
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (error) {
      console.log('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();

    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please enter a title and blog content.');
      return;
    }

    const today = new Date();
    const date = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setPublishing(true);

    try {
      await axios.post(
        `${API_URL}/api/blogs`,
        {
          newTitle: newTitle.trim(),
          date,
          newContent: newContent.trim(),
          category: newCategory
        },
        authConfig
      );

      setNewTitle('');
      setNewContent('');
      setNewCategory('General');

      await fetchBlogs();
      alert('Your blog has been published!');
    } catch (error) {
      showError(error);
    } finally {
      setPublishing(false);
    }
  };

  const handleLike = async (blogId) => {
    try {
      await axios.patch(
        `${API_URL}/api/blogs/like/${blogId}`,
        {},
        authConfig
      );
      fetchBlogs();
    } catch (error) {
      showError(error);
    }
  };

  const handleDelete = async (blogId) => {
    const sure = window.confirm('Are you sure you want to delete this blog?');

    if (!sure) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${blogId}`, authConfig);
      fetchBlogs();
    } catch (error) {
      showError(error);
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setEditTitle(blog.newTitle);
    setEditContent(blog.newContent);
    setEditCategory(blog.category || 'General');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
    setEditCategory('General');
  };

  const handleSaveEdit = async (blogId) => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/blogs/${blogId}`,
        {
          newTitle: editTitle.trim(),
          newContent: editContent.trim(),
          category: editCategory
        },
        authConfig
      );

      cancelEdit();
      fetchBlogs();
    } catch (error) {
      showError(error);
    }
  };

  const visibleBlogs = [...blogs].reverse().filter((blog) => {
    const category = blog.category || 'General';

    const matchesCategory =
      activeCategory === 'All' || category === activeCategory;

    const text = `${blog.newTitle} ${blog.newContent}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const inputClass =
    'w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-orange-950 px-5 py-20 text-white">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"></div>
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl text-center">
          <span className="mb-5 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300">
            ✨ YOUR STORIES MATTER
          </span>

          <h1 className="mb-5 text-4xl font-extrabold leading-tight sm:text-6xl">
            Ideas worth <span className="text-orange-400">sharing.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Discover fresh perspectives, share your experiences and inspire
            people through the power of writing.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#write-blog"
              className="rounded-xl bg-orange-500 px-7 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              ✍️ Write a story
            </a>

            <a
              href="#explore-blogs"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Explore blogs ↓
            </a>
          </div>

          <div className="mt-12 flex justify-center gap-12">
            <div>
              <p className="text-3xl font-extrabold text-orange-400">
                {blogs.length}
              </p>
              <p className="mt-1 text-sm text-gray-400">Stories</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-orange-400">
                {CATEGORIES.length}
              </p>
              <p className="mt-1 text-sm text-gray-400">Categories</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-orange-400">
                {blogs.reduce((total, blog) => total + (blog.likes || 0), 0)}
              </p>
              <p className="mt-1 text-sm text-gray-400">Total likes</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-14">

        {/* Create blog */}
        <section
          id="write-blog"
          className="mb-16 scroll-mt-24"
        >
          <div className="mb-7 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Share your thoughts
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              Create something amazing
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your next great story starts here.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 sm:p-9">
            <form onSubmit={handleNewBlogSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Blog title
                </label>
                <input
                  type="text"
                  placeholder="Give your story an interesting title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Choose a category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={inputClass}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Your story
                </label>
                <textarea
                  placeholder="Start writing your thoughts here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className={`${inputClass} resize-y`}
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={publishing}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {publishing ? 'Publishing...' : '🚀 Publish your blog'}
              </button>
            </form>
          </div>
        </section>

        {/* Blog explorer */}
        <section id="explore-blogs" className="scroll-mt-24">

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
                Discover & read
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                Explore stories
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Find something interesting to read today.
              </p>
            </div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
              {visibleBlogs.length} stories found
            </span>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative mx-auto max-w-2xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search by title or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {['All', ...CATEGORIES].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog list */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading amazing stories...
              </p>
            </div>
          ) : visibleBlogs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 px-5 py-20 text-center dark:border-gray-700">
              <div className="mb-4 text-6xl">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {blogs.length === 0 ? 'No stories yet!' : 'No stories found'}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {blogs.length === 0
                  ? 'Be the first person to publish a blog.'
                  : 'Try another search or category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visibleBlogs.map((blog) => {
                const category = blog.category || 'General';
                const canModify = !blog.author || blog.author === myEmail;
                const authorName = blog.author || 'Unknown';

                return (
                  <article
                    key={blog._id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-gray-800 dark:bg-gray-900"
                  >
                    {editingId === blog._id ? (
                      <div className="flex flex-1 flex-col gap-4 p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          ✏️ Edit your story
                        </h3>

                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={inputClass}
                          placeholder="Blog title"
                        />

                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className={inputClass}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>

                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className={inputClass}
                          rows="6"
                          placeholder="Blog content"
                        />

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleSaveEdit(blog._id)}
                            className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                          >
                            Save changes
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="rounded-xl bg-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Card decoration */}
                        <div className="relative h-2 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600"></div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-5 flex items-center justify-between">
                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                                CATEGORY_STYLES[category] || CATEGORY_STYLES.General
                              }`}
                            >
                              {category}
                            </span>

                            <span className="text-xs text-gray-400">
                              📅 {blog.date}
                            </span>
                          </div>

                          <h3 className="mb-3 text-2xl font-extrabold leading-snug text-gray-900 transition group-hover:text-orange-500 dark:text-white">
                            {blog.newTitle}
                          </h3>

                          <p className="mb-7 flex-1 whitespace-pre-line break-words leading-7 text-gray-600 dark:text-gray-400">
                            {blog.newContent}
                          </p>

                          {/* Author */}
                          <div className="mb-5 flex items-center gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-lg font-extrabold text-white shadow-md">
                              {authorName.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-gray-800 dark:text-white">
                                {authorName}
                              </p>
                              <p className="text-xs text-gray-400">
                                Blog author
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between gap-2">
                            <button
                              onClick={() => handleLike(blog._id)}
                              className="rounded-xl bg-red-50 px-4 py-2.5 font-semibold text-red-500 transition hover:scale-105 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20"
                            >
                              ❤️ {blog.likes || 0}
                            </button>

                            {canModify && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEdit(blog)}
                                  className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300"
                                >
                                  ✏️ Edit
                                </button>

                                <button
                                  onClick={() => handleDelete(blog._id)}
                                  className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300"
                                >
                                  🗑 Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Blogs;
