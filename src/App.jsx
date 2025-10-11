import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  Navigate
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

/* ---------------- Shared Data ---------------- */
const projectsData = [
  {
    slug: 'hilton-garden-inn',
    name: 'Hilton Garden Inn',
    brandLogo:
      'https://stories.hilton.com/uploads/2022/04/HGI-Logo-Color_HR-1.png',
    cover:
      'https://github.com/daemonexe/daemonexe/blob/main/gal/6.jpg?raw=true',
    short:
      'Lobby reconfiguration, guestroom refresh, corridor lighting, and custom millwork per brand standards.',
    images: [
      { src: 'https://github.com/daemonexe/daemonexe/blob/main/gal/1.jpg?raw=true',},
      { src: 'https://github.com/daemonexe/daemonexe/blob/main/gal/2.jpg?raw=true', },
      { src: 'https://github.com/daemonexe/daemonexe/blob/main/gal/3.jpg?raw=true', },
      { src: 'https://github.com/daemonexe/daemonexe/blob/main/gal/4.jpg?raw=true', },
      { src: 'https://github.com/daemonexe/daemonexe/blob/main/gal/5.jpg?raw=true', },
      { src: 'https://github.com/daemonexe/daemonexe/blob/main/gal/7.jpg?raw=true', },

    ],
  },
  {
    slug: 'marriott',
    name: 'Marriott',
    brandLogo:
      'https://purepng.com/public/uploads/large/purepng.com-marriott-logologobrand-logoiconslogos-251519940649oyste.png',
    cover: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1600',
    short: 'FF&E installation, lobby millwork, and corridor refurbishment.',
    comingSoon: true,
  },
  {
    slug: 'hampton-by-hilton',
    name: 'Hampton by Hilton',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Hampton_by_Hilton_logo.svg/2560px-Hampton_by_Hilton_logo.svg.png',
    cover: 'https://images.unsplash.com/photo-1522706604294-57b121d3b36f?q=80&w=1600',
    short: 'Guestroom refresh program with lighting and finishes.',
    comingSoon: true,
  },
  {
    slug: 'holiday-inn',
    name: 'Holiday Inn',
    brandLogo:
      'https://wp.logos-download.com/wp-content/uploads/2016/05/Holiday_Inn_logo_horizontal.png?dl',
    cover: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600',
    short: 'Public spaces upgrade: lobby, restaurant, and reception.',
    comingSoon: true,
  },
];

/* ---------------- Navbar (shared) ---------------- */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  // Close menu on Esc
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!wrapperRef.current) return;
      if (menuOpen && !wrapperRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  // Restore scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Auto close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Smooth fade-in for navbar
  return (
    <motion.header
      className="navbar"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="nav-container" ref={wrapperRef}>
        <Link to="/" className="brand">
          <img
            src="https://github.com/daemonexe/daemonexe/blob/main/NGMLogo.png?raw=true"
            alt="NGM Logo"
            className="logo-img"
          />
          <div className="brand-text">
            <h1 className="brand-name">NGM Ltd</h1>
            <p className="brand-tagline">Specializing in Hotel Renovations</p>
          </div>
        </Link>

        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? 'active' : ''}`}
          aria-hidden={!menuOpen}
        >
          <NavLink to="/" end>Home</NavLink>
          <a href="/#whatwedo">Services</a>
          <NavLink to="/projects">Portfolio</NavLink>
          <a href="/#contact">Contact</a>
        </nav>

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

      {/* Backdrop on mobile */}
      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} />}
    </motion.header>
  );
}

/* ---------------- Layout with route transitions ---------------- */
function PageContainer({ children, keyId }) {
  // Global route fade/slide
  return (
    <motion.main
      key={keyId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}

function Layout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <PageContainer keyId={location.pathname} key={location.pathname}>
          <Outlet />
        </PageContainer>
      </AnimatePresence>
    </>
  );
}

/* ---------------- Home ---------------- */
function Home() {
  const navigate = useNavigate();
  const heroImageUrl =
    'https://github.com/daemonexe/daemonexe/blob/main/home_image.jpg?raw=true';

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <motion.div
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <motion.h2
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.35 }}
          >
            Transforming Spaces. Elevating Hospitality.
          </motion.h2>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.35 }}
          >
            Luxury hotel renovation and interior expertise that reflects
            elegance and comfort.
          </motion.p>

          <motion.button
            className="cta-btn"
            onClick={() => navigate('/projects')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            View Projects
          </motion.button>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="main-content">
        <h3>Why Choose Us?</h3>
        <p>
          At NGM Limited, we bring experience, precision, and care to every hotel renovation.
          From full-scale remodels to simple upgrades, our licensed and insured team handles
          every detail efficiently and safely. We focus on quality craftsmanship, honest pricing,
          and minimal disruption — ensuring your property looks exceptional, functions flawlessly,
          and leaves a lasting impression on every guest.
        </p>
      </section>

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
            <motion.div
              className="card"
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </motion.div>
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

/* ---------------- Projects Index ---------------- */
function ProjectsIndex() {
  return (
    <div className="projects-wrapper">
      <header className="projects-hero">
        <div className="projects-hero-inner">
          <motion.h2 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .3 }}>
            Projects
          </motion.h2>
          <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .05, duration: .3 }}>
            Selected hotel renovations across brands. Click a property to see more.
          </motion.p>
        </div>
      </header>

      <section className="hotel-grid">
        {projectsData.map((p, i) => (
          <motion.article
            key={p.slug}
            className="hotel-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, ease: 'easeOut', delay: i * 0.05 }}
          >
            <Link to={`/projects/${p.slug}`} aria-label={`Open ${p.name}`}>
              <div className="hotel-card-media">
                <img src={p.cover} alt={`${p.name} cover`} loading="lazy" />
                <div className="hotel-card-sheen" />
              </div>
              <div className="hotel-card-body">
                <img className="hotel-brand" src={p.brandLogo} alt={`${p.name} logo`} />
                <h3>{p.name}</h3>
                <p>{p.short}</p>
                {p.comingSoon && <span className="coming-badge">More coming soon</span>}
              </div>
            </Link>
          </motion.article>
        ))}
      </section>


     <footer id="contact" className="footer">
        <div className="footers-container">
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


    </div>

  
  );
}

/* ---------------- Project Detail ---------------- */
function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="projects-wrapper">
      <header className="projects-hero">
        <div className="projects-hero-inner">
          {project.brandLogo && (
            <motion.img
              className="brand-badge"
              src={project.brandLogo}
              alt={project.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          )}
          <motion.h2 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .3 }}>
            {project.name} — Selected Renovations
          </motion.h2>
          <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .05, duration: .3 }}>
            {project.short}
          </motion.p>

          <div className="breadcrumbs">
            <NavLink to="/" className="crumb">Home</NavLink>
            <span className="crumb-sep">/</span>
            <NavLink to="/projects" className="crumb">Projects</NavLink>
            <span className="crumb-sep">/</span>
            <span className="crumb current">{project.name}</span>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section className="gallery-grid">
        {project.images?.map((img, i) => (
          <motion.figure
            key={i}
            className="gallery-card"
            onClick={() => setLightbox({ open: true, src: img.src, alt: img.alt })}
            title="Click to enlarge"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25, ease: 'easeOut', delay: i * 0.03 }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <figcaption>
              <span className="tag">{img.tag}</span>
              <span className="caption">{img.alt}</span>
            </figcaption>
          </motion.figure>
        ))}
      </section>

      {/* Lightbox */}
      {lightbox.open && (
        <motion.div
          className="lightbox"
          onClick={() => setLightbox({ open: false, src: '', alt: '' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close"
            className="lightbox-close"
            onClick={() => setLightbox({ open: false, src: '', alt: '' })}
          >
            ×
          </button>
          <motion.img
            className="lightbox-img"
            src={lightbox.src}
            alt={lightbox.alt}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      <div className="projects-footer-nav">
        <NavLink to="/projects" className="footer-link">← Back to Projects</NavLink>
      </div>
    </div>
  );
}

/* ---------------- App Router with Layout ---------------- */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<ProjectsIndex />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
      </Route>
    </Routes>
  );
}
