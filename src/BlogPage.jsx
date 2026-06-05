import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load blogs from localStorage
    const savedBlogs = localStorage.getItem('portfolioBlogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-page">
      <div className="blog-container">
        
        {/* Header */}
        <header className="blog-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
          <h1 className="blog-page-title">Blog</h1>
          <p className="blog-page-subtitle">Thoughts, tutorials, and insights</p>
        </header>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <div className="no-blogs-icon">📝</div>
            <h2>No blogs yet</h2>
            <p>Check back later for new content!</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-card" onClick={() => handleBlogClick(blog.id)}>
                {blog.image && (
                  <div className="blog-card-image">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                )}
                {blog.video && (
                  <div className="blog-card-video">
                    <video src={blog.video} controls={false} />
                    <div className="video-overlay">▶</div>
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-date">{formatDate(blog.date)}</span>
                    <span className="blog-category">{blog.category || 'Article'}</span>
                  </div>
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <p className="blog-card-excerpt">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="blog-card-footer">
                    <span className="read-more">Read More →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
