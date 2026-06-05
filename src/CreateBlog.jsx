import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Article',
    content: '',
    image: '',
    video: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let newText = '';

    switch(format) {
      case 'h1':
        newText = formData.content.substring(0, start) + `\n# ${selectedText || 'Heading 1'}\n` + formData.content.substring(end);
        break;
      case 'h2':
        newText = formData.content.substring(0, start) + `\n## ${selectedText || 'Heading 2'}\n` + formData.content.substring(end);
        break;
      case 'h3':
        newText = formData.content.substring(0, start) + `\n### ${selectedText || 'Heading 3'}\n` + formData.content.substring(end);
        break;
      case 'bold':
        newText = formData.content.substring(0, start) + `**${selectedText || 'bold text'}**` + formData.content.substring(end);
        break;
      case 'italic':
        newText = formData.content.substring(0, start) + `*${selectedText || 'italic text'}*` + formData.content.substring(end);
        break;
      case 'bullet':
        newText = formData.content.substring(0, start) + `\n- ${selectedText || 'List item'}\n` + formData.content.substring(end);
        break;
      case 'number':
        newText = formData.content.substring(0, start) + `\n1. ${selectedText || 'List item'}\n` + formData.content.substring(end);
        break;
      case 'code':
        newText = formData.content.substring(0, start) + `\`${selectedText || 'code'}\`` + formData.content.substring(end);
        break;
      case 'codeblock':
        newText = formData.content.substring(0, start) + `\n\`\`\`javascript\n${selectedText || '// Your code here'}\n\`\`\`\n` + formData.content.substring(end);
        break;
      case 'quote':
        newText = formData.content.substring(0, start) + `\n> ${selectedText || 'Quote'}\n` + formData.content.substring(end);
        break;
      case 'link':
        newText = formData.content.substring(0, start) + `[${selectedText || 'link text'}](url)` + formData.content.substring(end);
        break;
      default:
        return;
    }

    setFormData(prev => ({
      ...prev,
      content: newText
    }));
    textarea.focus();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          video: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBlog = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString()
    };

    // Save to localStorage
    const savedBlogs = localStorage.getItem('portfolioBlogs');
    const blogs = savedBlogs ? JSON.parse(savedBlogs) : [];
    blogs.unshift(newBlog);
    localStorage.setItem('portfolioBlogs', JSON.stringify(blogs));

    alert('✅ Blog published successfully!');
    navigate('/blog');
  };

  return (
    <div className="create-blog">
      <div className="create-blog-container">
        
        <header className="create-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
          <h1 className="create-title">Create New Blog Post</h1>
        </header>

        <form className="create-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="title">Blog Title *</label>
            <input 
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Article">Article</option>
              <option value="Tutorial">Tutorial</option>
              <option value="News">News</option>
              <option value="Project">Project</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            
            {/* Formatting Toolbar */}
            <div className="formatting-toolbar">
              <div className="toolbar-group">
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('h1')} title="Heading 1">
                  <strong>H1</strong>
                </button>
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('h2')} title="Heading 2">
                  <strong>H2</strong>
                </button>
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('h3')} title="Heading 3">
                  <strong>H3</strong>
                </button>
              </div>
              
              <div className="toolbar-divider"></div>
              
              <div className="toolbar-group">
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('bold')} title="Bold">
                  <strong>B</strong>
                </button>
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('italic')} title="Italic">
                  <em>I</em>
                </button>
              </div>
              
              <div className="toolbar-divider"></div>
              
              <div className="toolbar-group">
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('bullet')} title="Bullet List">
                  •
                </button>
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('number')} title="Numbered List">
                  1.
                </button>
              </div>
              
              <div className="toolbar-divider"></div>
              
              <div className="toolbar-group">
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('code')} title="Inline Code">
                  {'</>'}
                </button>
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('codeblock')} title="Code Block">
                  {'{ }'}
                </button>
              </div>
              
              <div className="toolbar-divider"></div>
              
              <div className="toolbar-group">
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('quote')} title="Quote">
                  "
                </button>
                <button type="button" className="toolbar-btn" onClick={() => insertFormatting('link')} title="Link">
                  🔗
                </button>
              </div>
            </div>

            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here... Use the toolbar above for formatting."
              rows="20"
              required
            ></textarea>
            
            <div className="formatting-hint">
              <strong>Formatting Guide:</strong> H1/H2/H3 for headings, **bold**, *italic*, - bullets, 1. numbers, `code`, ```code blocks```,  quotes
            </div>
          </div>

          <div className="media-uploads">
            <div className="form-group">
              <label htmlFor="image">Upload Image (Optional)</label>
              <input 
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div className="media-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="video">Upload Video (Optional)</label>
              <input 
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoUpload}
              />
              {videoPreview && (
                <div className="media-preview">
                  <video src={videoPreview} controls />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn-publish">
              📝 Publish Blog
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default CreateBlog;
