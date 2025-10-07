import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  const heroImageUrl =
    'https://github.com/daemonexe/daemonexe/blob/main/home_image.jpg?raw=true';

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!wrapperRef.current) return;
      if (menuOpen && !wrapperRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-container" ref={wrapperRef}>
          <a href="#" className="brand" onClick={closeMenu}>
            <img
              src="https://github.com/daemonexe/daemonexe/blob/main/NGMLogo.png?raw=true"
              alt="NGM Logo"
              className="logo-img"
            />
            <div className="brand-text">
              <h1 className="brand-name">NGM Ltd</h1>
              <p className="brand-tagline">Specializing Hotel Renovations</p>
            </div>
          </a>

          {/* Links */}
          <nav
            id="primary-navigation"
            className={`nav-links ${menuOpen ? 'active' : ''}`}
            aria-hidden={!menuOpen}
          >
            <a href="#" onClick={closeMenu}>Home</a>
            <a href="#whatwedo" onClick={closeMenu}>Services</a>
            <a href="#partners" onClick={closeMenu}>Portfolio</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          {/* Burger */}
          <button
            className={`burger ${menuOpen ? 'toggle' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="line1" />
            <span className="line2" />
            <span className="line3" />
          </button>
        </div>
      </header>

      {/* Backdrop on mobile */}
      {menuOpen && <div className="backdrop" onClick={closeMenu} />}

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="hero-overlay">
          <h2>Transforming Spaces. Elevating Hospitality.</h2>
          <p>
            Luxury hotel renovation and interior expertise that reflects
            elegance and comfort.
          </p>
          <button className="cta-btn">View Projects</button>
        </div>
      </section>

      {/* Why Choose Us */}
      <main className="main-content">
        <h3>Why Choose Us?</h3>
        <p>
          At NGM Limited, we bring experience, precision, and care to every hotel renovation.
          From full-scale remodels to simple upgrades, our licensed and insured team handles
          every detail efficiently and safely. We focus on quality craftsmanship, honest pricing,
          and minimal disruption — ensuring your property looks exceptional, functions flawlessly,
          and leaves a lasting impression on every guest.
        </p>
      </main>

      <hr className="hr-slim" />

      {/* What We Do */}
      <section id="whatwedo" className="what-we-do">
        <h3>What We Do</h3>
        <h4>Design, build, and renew — end to end</h4>
        <div className="cards-container">
          {[
            { title: 'Design', desc: 'Guest-centric interiors that meet brand standards and boost RevPAR.' },
            { title: 'Construction', desc: 'Efficient phasing, tight quality control, and safe, clean worksites.' },
            { title: 'Custom Millwork', desc: 'Casegoods, vanities, and built-ins tailored to your property.' },
            { title: 'Renovations', desc: 'Room refreshes, corridors, lobbies, restaurants, fitness, and back-of-house.' },
            { title: 'Exterior', desc: 'Façade updates, entries, canopies, paving, and signage coordination.' },
            { title: 'Outdoor', desc: 'Patios, pools, and landscape features that extend the guest experience.' },
            { title: 'MEP & Lighting', desc: 'Electrical, plumbing, and lighting upgrades for efficiency and comfort.' },
            { title: 'Supplementary', desc: 'FF&E installation, painting programs, and brand standard compliance.' }
          ].map((item, index) => (
            <div className="card" key={index}>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-slim" />

      {/* Partners */}
      <section id="partners" className="partners">
        <div className="partners-inner">
          <h3>Our Partners</h3>
          <div className="partner-logos">
            <a><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST9XNQRosaxIwySlkdKsOGBFOt0WHTMvhIfw&s" alt="Partner 1" /></a>
            <a><img src="https://purepng.com/public/uploads/large/purepng.com-marriott-logologobrand-logoiconslogos-251519940649oyste.png" alt="Partner 2" /></a>
            <a><img src="https://stories.hilton.com/uploads/2022/04/HGI-Logo-Color_HR-1.png" alt="Partner 3" /></a>
            <a><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Hampton_by_Hilton_logo.svg/2560px-Hampton_by_Hilton_logo.svg.png" alt="Partner 4" /></a>
            <a><img src="https://wp.logos-download.com/wp-content/uploads/2016/05/Holiday_Inn_logo_horizontal.png?dl" alt="Partner 5" /></a>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2 className="footer-title">NGM Limited</h2>
            <p>101 Toro Rd. Unit 6<br />Toronto, ON M3J 2Z1</p>
            <p><strong>Hours:</strong> Mon–Fri, 9am–6pm</p>
            <p><strong>Service Area:</strong> Canada</p>
          </div>

          <div className="footer-center">
            <p><strong>Phone:</strong> <a href="tel:4166335900">416-633-5900</a></p>
            <p><strong>Email:</strong> <a href="mailto:Admin@naturalgranite.ca">Admin@naturalgranite.ca</a></p>
            <div className="footer-actions">
              <a href="tel:4166335900" className="footer-btn call">Call Us</a>
              <a href="mailto:Admin@naturalgranite.ca" className="footer-btn email">Email Us</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NGM Limited — All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
