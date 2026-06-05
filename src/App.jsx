import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import heroImg from './assets/hero.jpeg';
import logoImg from './assets/logo.jpeg';

function App() {
  const navigate = useNavigate();
  const [showHireForm, setShowHireForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '2002') {
      setShowPasswordModal(false);
      setPassword('');
      navigate('/create-blog');
    } else {
      alert('❌ Incorrect password!');
      setPassword('');
    }
  };

  const projects = [
    {
      title: "Resort Management System",
      github: "https://github.com/Indu2002-se/Ocean-view-resort",
      description: "Developed a resort management system using Java Servlets and JSP to handle bookings, customer records, and administrative operations.",
      tools: ["Java 17", "Servlet", "MySQL", "Maven", "IntelliJ IDEA"]
    },
    {
      title: "Event Management System",
      github: "https://github.com/Indu2002-se/EventManagement-SpringBoot",
      description: "Built a full-featured event management platform with a modern admin dashboard supporting complete CRUD operations. Enabled event organizers to create, manage, and track events with real-time analytics and user management.",
      tools: ["Java 17", "Spring Boot 3.5.5", "MySQL", "React.js", "RESTful APIs", "Maven"]
    },
    {
      title: "AI Powered Fitness System",
      github: "https://github.com/Indu2002-se/Fitness-microservice-springboot",
      description: "AI-Powered Fitness is a Spring Boot–based microservice application designed to deliver intelligent fitness solutions. It leverages AI-driven insights to manage workouts, track user progress, and provide personalized recommendations.",
      tools: ["Spring Boot Microservices", "RabbitMQ", "Google Gemini API", "IntelliJ IDEA"]
    },
    {
      title: "Cycle Rental Shop Mobile Application",
      github: "#",
      description: "Designed and implemented a mobile app using Kotlin to streamline cycle rentals, featuring real-time availability, customer registration, and rental history management.",
      tools: ["Kotlin", "Room Database", "Android Studio"]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // EmailJS configuration
    const serviceId = 'service_wvl4rol';
    const templateId = 'template_skfae0d'; // ← PUT YOUR NEW TEMPLATE ID HERE
    const publicKey = 'kdbLgmYxD-Ja8RWC1';
    
    // Template parameters (form data)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };
    
    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('✅ Message sent successfully! I will get back to you soon.');
        // Reset form
        setShowHireForm(false);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        
        // If EmailJS fails, use mailto as fallback
        const subject = encodeURIComponent(`Message from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n\n` +
          `Message:\n${formData.message}\n\n` +
          `---\nSent from portfolio contact form`
        );
        
        const mailtoLink = `mailto:bwithanage327@gmail.com?subject=${subject}&body=${body}`;
        
        // Reset form before opening email client
        setShowHireForm(false);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show user-friendly message
        setTimeout(() => {
          alert('⚠️ EmailJS connection failed. Opening your email client instead.\n\nTo fix this: Reconnect Gmail in your EmailJS dashboard.');
        }, 100);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="app-container">
      <div className="container">
        
        {/* Header */}
        <header className="header">
          <div className="logo">
            <img src={logoImg} alt="Buddhi Vithanage" className="logo-image" />
            <span className="logo-text">Buddhi</span>
          </div>
          <nav className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="btn-primary" onClick={() => setShowHireForm(true)}>Hire Me</button>
        </header>

        <main>
          {/* Hero Section */}
          <section id="home" className="hero">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Software Engineer
              </div>
              <h1 className="hero-title">
                Building Innovative<br/>
                Software Solutions<br/>
                That Matter
              </h1>
              <p className="hero-description">
                Full-stack developer specializing in Java, Spring Boot, and modern web technologies. 
                I transform ideas into scalable, production-ready applications that users love.
              </p>
              <div className="hero-actions">
                <button className="btn-secondary" onClick={() => document.getElementById('projects').scrollIntoView({behavior: 'smooth'})}>View Projects</button>
              </div>
              <div className="hero-note">*Specialized in Java & Spring Boot</div>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Completed Projects</div>
                  <div className="stat-value">4+</div>
                  <div className="stat-icon">📁</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Code Quality</div>
                  <div className="stat-value">95%</div>
                  <div className="stat-divider"></div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Performance</div>
                  <div className="stat-value">98%</div>
                  <div className="stat-divider"></div>
                </div>
              </div>
            </div>
            
            {/* Hero Social Card */}
            <div className="hero-image-wrapper">
              <div className="hero-social-card">
                <div className="social-card-title">Connect With Me</div>
                <div className="social-links-vertical">
                  <a href="https://github.com/Indu2002-se" target="_blank" rel="noreferrer" className="social-link-item" title="GitHub">
                    <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="social-label">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/buddhi-vithanage-6302302a3/" target="_blank" rel="noreferrer" className="social-link-item" title="LinkedIn">
                    <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="social-label">LinkedIn</span>
                  </a>
                  <a href="mailto:bwithanage327@gmail.com" className="social-link-item" title="Email">
                    <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                    </svg>
                    <span className="social-label">Email</span>
                  </a>
                  <a href="tel:0702865781" className="social-link-item" title="Phone">
                    <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                    </svg>
                    <span className="social-label">Phone</span>
                  </a>
                </div>
              </div>

              {/* Blog Card */}
              <div className="hero-blog-card" onClick={() => navigate('/blog')}>
                <div className="blog-card-icon">📝</div>
                <div className="blog-card-text">
                  <div className="blog-card-label">Read My</div>
                  <div className="blog-card-title-text">Blog Posts</div>
                </div>
                <svg className="blog-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section id="about" className="mission">
            <div className="mission-badge">✦ About Me</div>
            <h2 className="mission-title">
              I <span className="text-red">design</span> and deploy <span className="text-red">robust solutions</span><br/>
              with people at the core, ensuring<br/>
              every <span className="text-red">system enhances</span> real user<br/>
              experiences.
            </h2>
          </section>

          {/* Projects Section */}
          <section id="projects" className="video-section">
            <div className="video-container">
              <div className="video-badge">✦ Featured Projects</div>
              <h3 className="video-title">Built with <span className="text-red">Passion & Precision</span></h3>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px'}}>
                Explore my latest work showcasing full-stack development, microservices, and mobile applications.
              </p>
            </div>

            <div className="testimonial-section">
              <div className="projects-count">
                <div className="count-stars">★★★★★</div>
                <div className="count-value">4+</div>
                <div className="count-label">Projects Completed</div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">
                  Passionate about creating efficient, scalable solutions that solve real-world problems.
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">Buddhi Vithanage</div>
                    <div className="author-role">Software Engineer</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="projects-grid-section">
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tools-list">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                    View Source Code →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="services">
            <div className="services-container">
              <div className="services-left">
                <div className="hero-badge">✦ Skills</div>
                <h2 className="services-title">
                  End-to-End<br/>
                  Development Services
                </h2>
                <p className="services-description">
                  I turn ambitious ideas into battle-tested features your 
                  users trust—combining backend strategy, web engineering, and mobile development.
                </p>
                <div className="services-buttons">
                  <button className="service-tag">Java & Spring Boot Development</button>
                  <button className="service-tag">Full-Stack Web Development</button>
                  <button className="service-tag">Mobile App Development (Kotlin)</button>
                </div>
              </div>
              
              <div className="services-right">
                <h3 className="services-subtitle">Technical<br/>Expertise</h3>
                <p className="services-text">
                  Specialized in building scalable backend systems, RESTful APIs, and modern web applications.
                </p>
                <div className="services-tags">
                  <button className="service-btn">Spring Boot Microservices</button>
                  <button className="service-btn">React.js & Modern Frontend</button>
                  <button className="service-btn">MySQL & Database Design</button>
                  <button className="service-btn">RESTful API Development</button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section id="contact" className="contact-section">
            <div className="contact-container">
              <div className="contact-header">
                <div className="hero-badge">✦ Get In Touch</div>
                <h2 className="contact-title">Let's Work Together</h2>
                <p className="contact-description">
                  Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input 
                      type="text" 
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input 
                      type="email" 
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && (
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="logo">
                <img src={logoImg} alt="Buddhi Vithanage" className="logo-image" />
                <span className="logo-text">Buddhi Vithanage</span>
              </div>
            </div>
            <div className="footer-links">
              <a href="mailto:bwithanage327@gmail.com" className="footer-link">bwithanage327@gmail.com</a>
              <a href="tel:0702865781" className="footer-link">070 286 5781</a>
              <a href="https://www.linkedin.com/in/buddhi-vithanage-6302302a3/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
              <a href="https://github.com/Indu2002-se" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <button className="footer-link admin-btn" onClick={() => setShowPasswordModal(true)}>
                🔒 Admin
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Buddhi Vithanage. All rights reserved.</p>
          </div>
        </footer>
        
      </div>

      {/* Hire Me Modal */}
      {showHireForm && (
        <div className="modal-overlay" onClick={() => setShowHireForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHireForm(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">Get In Touch</h2>
              <p className="modal-description">Send me a message and I'll get back to you within 24 hours.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? '⏳ Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content password-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <div style={{fontSize: '48px', marginBottom: '16px'}}>🔒</div>
              <h2 className="modal-title">Admin Access</h2>
              <p className="modal-description">Enter password to create blog posts</p>
            </div>

            <form className="modal-form" onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="modal-submit-btn">
                🔓 Access Blog Creator
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
