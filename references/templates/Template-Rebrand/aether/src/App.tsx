import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  // 4 cards in the stack
  const cards = [
    { id: 1, image: "/assets/aether/hero-stack-mockup.png", alt: "Aether Studio central mockup" },
    { id: 2, image: "/assets/aether/aperture-house.png", alt: "Aperture House project" },
    { id: 3, image: "/assets/aether/lumen-field.png", alt: "Lumen Field project" },
    { id: 4, image: "/assets/aether/nocturne-index.png", alt: "Nocturne Index project" },
  ];

  // Card stack animation states (matching the Vanta / Launchfolio layout stack)
  const cardVariants = {
    card1: {
      rest: { rotate: 7, x: 35, y: 10, scale: 1, zIndex: 4 },
      hover: { rotate: 9, x: 80, y: -30, scale: 1.05, zIndex: 4 },
    },
    card2: {
      rest: { rotate: 3, x: 50, y: 55, scale: 1, zIndex: 3 },
      hover: { rotate: -8, x: -80, y: 40, scale: 1.02, zIndex: 3 },
    },
    card3: {
      rest: { rotate: -5, x: 0, y: 15, scale: 1, zIndex: 2 },
      hover: { rotate: -15, x: -140, y: -40, scale: 1, zIndex: 2 },
    },
    card4: {
      rest: { rotate: 5, x: 80, y: 0, scale: 1, zIndex: 1 },
      hover: { rotate: 15, x: 140, y: 60, scale: 1, zIndex: 1 },
    },
  };

  const getVariant = (id: number) => {
    switch (id) {
      case 1: return cardVariants.card1;
      case 2: return cardVariants.card2;
      case 3: return cardVariants.card3;
      case 4: return cardVariants.card4;
      default: return {};
    }
  };

  return (
    <div className="app-container">
      {/* Floating Navbar Pill */}
      <header className="navbar-wrapper">
        <nav className="navbar-capsule">
          <a href="#" className="nav-brand">
            <img src="/assets/aether/elias-hart.png" alt="Elias Hart Creative Director" />
            <span>Joseph Alexander</span>
          </a>
          <div className="nav-links">
            <a href="#work" className="nav-link">Work</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-cta">Contact</a>
          </div>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="hero-section">
        {/* Left text column */}
        <div className="hero-left">
          <div className="availability-badge">
            <span className="pulse-dot"></span>
            <span>Available for August'25</span>
          </div>

          <h1 className="hero-title">
            <span className="light-text">Design that</span>
            <br />
            delivers results.
          </h1>

          <p className="hero-description">
            <strong>Strategic design that drives growth, not just looks good.</strong>{' '}
            I create everything your brand needs to attract customers and turn them into sales.
          </p>

          <a href="#contact" className="hero-cta-btn">
            <img src="/assets/aether/elias-hart.png" alt="Creative Director" />
            <span>Book a call with me</span>
          </a>
        </div>

        {/* Right card deck column */}
        <div 
          className="hero-right"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="card-deck-container">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className="deck-card"
                variants={getVariant(card.id)}
                animate={isHovered ? "hover" : "rest"}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              >
                <img src={card.image} alt={card.alt} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Social Proof testimonial section */}
      <section className="social-proof-bar">
        <div className="avatar-stack">
          <img className="stack-avatar" src="https://framerusercontent.com/images/ARmQOa71EvidN3oYWq9jWzn9OE.jpg?width=76" alt="Client 1" />
          <img className="stack-avatar" src="https://framerusercontent.com/images/W7oQ4BScxWhGC5oVOzKGxVGAD4.jpg?width=76" alt="Client 2" />
          <img className="stack-avatar" src="https://framerusercontent.com/images/UqrSyX3j0KDY0YY2JZCQuc7Wzzg.jpg?width=76" alt="Client 3" />
          <img className="stack-avatar" src="https://framerusercontent.com/images/wFJgmAuVHn37SCJR5MDBtfbFdY.jpg?width=76" alt="Client 4" />
          <img className="stack-avatar" src="https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?width=76" alt="Client 5" />
        </div>
        
        <div className="rating-info">
          <div className="stars-row">★★★★★</div>
          <div className="rating-text">99+ Happy clients</div>
        </div>
      </section>

      {/* Under-hero Heading (as shown cut-off in the reference) */}
      <section className="section-headline">
        <h2>Latest Projects</h2>
      </section>
    </div>
  );
}
