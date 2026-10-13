import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Particles from "./Particles.jsx";

const APP = "https://app.saleplay.co";

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="SalePlay">
      <img className="mark" src="/assets/logo.svg" alt="" />
      <img className="wordmark" src="/assets/wordmark.svg" alt="SalePlay" />
    </Link>
  );
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Particles />
      <header className={`nav${scrolled || location.pathname !== "/" ? " scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <Brand />
          <nav className="nav-links">
            <Link to="/#features">Features</Link>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <Link to="/#social-proof">Testimonials</Link>
            <a className="btn btn-nav" href={APP} target="_blank" rel="noopener noreferrer">Get Started →</a>
          </nav>
          <button className="menu-btn" type="button" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <Link to="/#features">Features</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/#social-proof">Testimonials</Link>
        <a href={APP} target="_blank" rel="noopener noreferrer">Get Started</a>
      </div>
      <Outlet />
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <Brand />
              <p style={{ marginTop: 16 }}>AI sales roleplay software and sales training platform from Nunmai Technologies Private Limited.</p>
            </div>
            <div>
              <h3>Product</h3>
              <ul>
                <li><Link to="/product">AI Sales Roleplay</Link></li>
                <li><Link to="/product#coaching">Live Coaching</Link></li>
                <li><Link to="/product#drills">Micro Drills</Link></li>
                <li><Link to="/product#assessments">Assessments</Link></li>
                <li><Link to="/product#journeys">Multi-Level Training</Link></li>
              </ul>
            </div>
            <div>
              <h3>Use Cases</h3>
              <ul>
                <li><Link to="/use-cases">Objection Handling</Link></li>
                <li><Link to="/use-cases#onboarding">Sales Onboarding</Link></li>
                <li><Link to="/use-cases#journeys">Multi-Level Training</Link></li>
                <li><Link to="/pilot">30-Day Pilot</Link></li>
              </ul>
            </div>
            <div>
              <h3>Comparisons</h3>
              <ul>
                <li><Link to="/compare">SalePlay vs Gong</Link></li>
                <li><Link to="/compare#second-nature">SalePlay vs Second Nature</Link></li>
                <li><Link to="/compare#hyperbound">SalePlay vs Hyperbound</Link></li>
              </ul>
            </div>
            <div>
              <h3>Resources</h3>
              <ul>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/blog">Sales Training</Link></li>
                <li><Link to="/blog">Objection Handling</Link></li>
                <li><Link to="/blog">Discovery Calls</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 SalePlay. Execution beats training.</span>
            <span>
              <Link to="/contact">Contact</Link> · <Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms & Conditions</Link> · <Link to="/shipping">Shipping Policy</Link> · <Link to="/refund">Cancellation & Refund</Link>
            </span>
          </div>
          <p className="legal">Built for discovery calls, objections, pricing pressure, negotiation, and sales onboarding.</p>
        </div>
      </footer>
    </>
  );
}
