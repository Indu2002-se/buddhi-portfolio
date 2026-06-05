import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  
  // States for Modals and Password
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedBlogs = localStorage.getItem('portfolioBlogs');
    if (savedBlogs) {
      const blogs = JSON.parse(savedBlogs);
      const foundBlog = blogs.find(b => b.id === id);
      setBlog(foundBlog);
    }
  }, [id]);

  const handleDelete = () => {
    const savedBlogs = localStorage.getItem('portfolioBlogs');
    if (savedBlogs) {
      const blogs = JSON.parse(savedBlogs);
      const updatedBlogs = blogs.filter(b => b.id !== id);
      localStorage.setItem('portfolioBlogs', JSON.stringify(updatedBlogs));
      alert('✅ Blog deleted successfully!');
      navigate('/blog');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle password submission before showing delete confirmation
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '2002') {
      setShowPasswordModal(false); // Close password modal
      setPassword('');
      setShowDeleteConfirm(true);  // Open delete confirmation modal
    } else {
      alert('❌ Incorrect password!');
      setPassword('');
    }
  };

  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = null;
    let currentListType = null;
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeLanguage = 'javascript';

    lines.forEach((line, index) => {
      // Code block
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim() || 'javascript';
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="code-block">
              <code className={`language-${codeLanguage}`}>
                {highlightCode(codeBlockContent.join('\n'), codeLanguage)}
              </code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Close list if needed
      if (currentList && !line.match(/^[\-\*]\s/) && !line.match(/^\d+\.\s/)) {
        elements.push(
          <ul key={`list-${elements.length}`} className={currentListType === 'bullet' ? 'bullet-list' : 'number-list'}>
            {currentList}
          </ul>
        );
        currentList = null;
        currentListType = null;
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="blog-h3">{line.substring(4)}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="blog-h2">{line.substring(3)}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="blog-h1">{line.substring(2)}</h1>);
      }
      // Quote
      else if (line.startsWith('> ')) {
        elements.push(<blockquote key={index} className="blog-quote">{parseInline(line.substring(2))}</blockquote>);
      }
      // Bullet list
      else if (line.match(/^[\-\*]\s/)) {
        const content = line.substring(2);
        if (!currentList) {
          currentList = [];
          currentListType = 'bullet';
        }
        currentList.push(<li key={`li-${index}`}>{parseInline(content)}</li>);
      }
      // Numbered list
      else if (line.match(/^\d+\.\s/)) {
        const content = line.replace(/^\d+\.\s/, '');
        if (!currentList) {
          currentList = [];
          currentListType = 'number';
        }
        currentList.push(<li key={`li-${index}`}>{parseInline(content)}</li>);
      }
      // Empty line
      else if (line.trim() === '') {
        elements.push(<br key={`br-${index}`} />);
      }
      // Regular paragraph
      else {
        elements.push(<p key={index} className="blog-paragraph">{parseInline(line)}</p>);
      }
    });

    // Close any remaining list
    if (currentList) {
      elements.push(
        currentListType === 'bullet' ? (
          <ul key={`list-${elements.length}`} className="bullet-list">{currentList}</ul>
        ) : (
          <ol key={`list-${elements.length}`} className="number-list">{currentList}</ol>
        )
      );
    }

    return elements;
  };

  const parseInline = (text) => {
    const parts = [];
    let currentText = text;
    let key = 0;

    // Links [text](url)
    currentText = currentText.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, text, url) => {
      return `<LINK>${text}|${url}</LINK>`;
    });

    // Bold **text**
    currentText = currentText.replace(/\*\*([^\*]+)\*\*/g, '<BOLD>$1</BOLD>');

    // Italic *text*
    currentText = currentText.replace(/\*([^\*]+)\*/g, '<ITALIC>$1</ITALIC>');

    // Inline code `code`
    currentText = currentText.replace(/`([^`]+)`/g, '<CODE>$1</CODE>');

    // Split and process
    const tokens = currentText.split(/(<BOLD>|<\/BOLD>|<ITALIC>|<\/ITALIC>|<CODE>|<\/CODE>|<LINK>|<\/LINK>)/);
    let inBold = false;
    let inItalic = false;
    let inCode = false;
    let inLink = false;

    tokens.forEach((token) => {
      if (token === '<BOLD>') {
        inBold = true;
      } else if (token === '</BOLD>') {
        inBold = false;
      } else if (token === '<ITALIC>') {
        inItalic = true;
      } else if (token === '</ITALIC>') {
        inItalic = false;
      } else if (token === '<CODE>') {
        inCode = true;
      } else if (token === '</CODE>') {
        inCode = false;
      } else if (token === '<LINK>') {
        inLink = true;
      } else if (token === '</LINK>') {
        inLink = false;
      } else if (token) {
        if (inLink) {
          const [text, url] = token.split('|');
          parts.push(<a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="blog-link">{text}</a>);
        } else if (inBold) {
          parts.push(<strong key={key++}>{token}</strong>);
        } else if (inItalic) {
          parts.push(<em key={key++}>{token}</em>);
        } else if (inCode) {
          parts.push(<code key={key++} className="inline-code">{token}</code>);
        } else {
          parts.push(token);
        }
      }
    });

    return parts;
  };

  const highlightCode = (code, language) => {
    const keywords = {
      javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'new', 'this'],
      python: ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'with', 'as', 'lambda', 'yield'],
      java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'return', 'if', 'else', 'for', 'while', 'new', 'this', 'static', 'void', 'int', 'String'],
    };

    const langKeywords = keywords[language] || keywords.javascript;
    const lines = code.split('\n');

    return lines.map((line, lineIndex) => {
      const parts = [];
      let currentLine = line;

      // Comments
      if (currentLine.trim().startsWith('//')) {
        return <div key={lineIndex} className="code-line"><span className="comment">{currentLine}</span></div>;
      }

      // Strings
      const stringRegex = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g;
      const strings = [];
      currentLine = currentLine.replace(stringRegex, (match) => {
        strings.push(match);
        return `__STRING_${strings.length - 1}__`;
      });

      // Keywords
      langKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        currentLine = currentLine.replace(regex, `__KEYWORD__${keyword}__KEYWORD__`);
      });

      // Numbers
      currentLine = currentLine.replace(/\b\d+\b/g, '__NUMBER__$&__NUMBER__');

      // Functions
      currentLine = currentLine.replace(/\b(\w+)(?=\()/g, '__FUNCTION__$1__FUNCTION__');

      // Restore strings
      strings.forEach((str, index) => {
        currentLine = currentLine.replace(`__STRING_${index}__`, `__STRING__${str}__STRING__`);
      });

      // Split and render
      const tokens = currentLine.split(/(__KEYWORD__|__NUMBER__|__FUNCTION__|__STRING__)/);
      let inKeyword = false;
      let inNumber = false;
      let inFunction = false;
      let inString = false;
      let key = 0;

      tokens.forEach(token => {
        if (token === '__KEYWORD__') inKeyword = !inKeyword;
        else if (token === '__NUMBER__') inNumber = !inNumber;
        else if (token === '__FUNCTION__') inFunction = !inFunction;
        else if (token === '__STRING__') inString = !inString;
        else if (token) {
          if (inKeyword) parts.push(<span key={key++} className="keyword">{token}</span>);
          else if (inNumber) parts.push(<span key={key++} className="number">{token}</span>);
          else if (inFunction) parts.push(<span key={key++} className="function">{token}</span>);
          else if (inString) parts.push(<span key={key++} className="string">{token}</span>);
          else parts.push(<span key={key++}>{token}</span>);
        }
      });

      return <div key={lineIndex} className="code-line">{parts}</div>;
    });
  };

  if (!blog) {
    return (
      <div className="blog-detail">
        <div className="blog-detail-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <div className="blog-detail-container">
        
        {/* Header */}
        <header className="detail-header">
          <div className="header-actions">
            <button className="back-btn" onClick={() => navigate('/blog')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Blogs
            </button>
          </div>
        </header>

        {/* Blog Content */}
        <article className="blog-content">
          <div className="blog-meta">
            <span className="blog-date">{formatDate(blog.date)}</span>
            <span className="blog-category">{blog.category || 'Article'}</span>
          </div>

          <h1 className="blog-title">{blog.title}</h1>

          {blog.image && (
            <div className="blog-featured-image">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}

          {blog.video && (
            <div className="blog-featured-video">
              <video src={blog.video} controls />
            </div>
          )}

          <div className="blog-text">
            {parseMarkdown(blog.content)}
          </div>
        </article>

        {/* Delete Button - Triggers Password Modal First */}
        <button className="delete-btn" onClick={() => setShowPasswordModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/>
          </svg>
          Delete
        </button>
      </div>

      {/* Step 1: Password Validation Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content password-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enter Admin Password</h2>
              <p>Please enter the password to unlock delete option.</p>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <input 
                type="password" 
                placeholder="Enter password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                autoFocus
                required
              />
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{fontSize: '48px', marginBottom: '16px'}}>⚠️</div>
              <h2 className="modal-title">Delete Blog Post?</h2>
              <p className="modal-description">
                This action cannot be undone. The blog post will be permanently deleted.
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel-delete" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDelete}>
                🗑️ Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;