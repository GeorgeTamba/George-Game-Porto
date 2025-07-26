// Loading Animation
window.addEventListener("load", () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add("fade-out");
      setTimeout(() => {
        loadingOverlay.remove();
      }, 500);
    }, 1000);
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Enhanced navigation scroll effect
const nav = document.querySelector(".modern-nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Update active navigation links
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile nav when clicking on a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
});

// Typing animation for hero role
function createTypingEffect() {
  const roleAccent = document.querySelector(".hero-hex-role-accent");
  if (!roleAccent) return;

  const text = roleAccent.textContent;
  roleAccent.textContent = "";
  roleAccent.classList.add("typing-animation");

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      roleAccent.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      setTimeout(() => {
        roleAccent.classList.remove("typing-animation");
      }, 1000);
    }
  }, 100);
}

// Start typing effect after page loads
setTimeout(createTypingEffect, 2000);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe project cards and other animated elements
document.addEventListener("DOMContentLoaded", () => {
  // Observe project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe tools & skills sections
  const toolsSkillsBoxes = document.querySelectorAll(".tools-skills-box");
  toolsSkillsBoxes.forEach((box, index) => {
    box.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(box);
  });

  // Observe contact cards
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Add fade-in classes to elements
  const fadeElements = document.querySelectorAll(
    "section h2, .about-content, .contact-content, .contact-description"
  );
  fadeElements.forEach((element, index) => {
    element.classList.add("fade-in");
    if (index > 0) element.classList.add(`fade-in-delay-${Math.min(index, 3)}`);
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero-hex::before");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Apply ripple effect to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".hero-hex-btn, .project-link");
  buttons.forEach(addRippleEffect);
});

// Enhanced hover effects for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });

    // Add mouse move effect for tilt
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Add tilt effect to contact cards
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
});

// Smooth reveal animation for sections
const revealSections = () => {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionVisible = 150;

    if (sectionTop < window.innerHeight - sectionVisible) {
      section.classList.add("section-visible");
    }
  });
};

// Add magnetic effect to buttons
function addMagneticEffect(element) {
  element.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  element.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
}

// Apply magnetic effect to buttons and social icons
document.addEventListener("DOMContentLoaded", () => {
  const magneticElements = document.querySelectorAll(
    ".hero-hex-btn, .hero-hex-social, .contact-btn"
  );
  magneticElements.forEach(addMagneticEffect);
});

// Cursor trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener("mousemove", function (e) {
  mouseTrail.push({ x: e.clientX, y: e.clientY });

  if (mouseTrail.length > maxTrailLength) {
    mouseTrail.shift();
  }

  updateCursorTrail();
});

function updateCursorTrail() {
  const existingTrails = document.querySelectorAll(".cursor-trail");
  existingTrails.forEach((trail) => trail.remove());

  mouseTrail.forEach((point, index) => {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.cssText = `
      position: fixed;
      top: ${point.y}px;
      left: ${point.x}px;
      width: ${(index + 1) * 2}px;
      height: ${(index + 1) * 2}px;
      background: rgba(0, 234, 255, ${((index + 1) / maxTrailLength) * 0.5});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: opacity 0.5s ease;
    `;

    document.body.appendChild(trail);

    setTimeout(() => {
      trail.style.opacity = "0";
      setTimeout(() => trail.remove(), 500);
    }, 50);
  });
}

// Enhanced scroll animations with stagger effect
function staggerAnimation(elements, delay = 100) {
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${index * delay}ms`;
  });
}

// Apply stagger animations
document.addEventListener("DOMContentLoaded", () => {
  staggerAnimation(document.querySelectorAll(".project-card"), 150);
  staggerAnimation(document.querySelectorAll(".contact-card"), 200);
  staggerAnimation(document.querySelectorAll(".tool-item"), 100);
  staggerAnimation(document.querySelectorAll(".skills-list li"), 50);
});

window.addEventListener("scroll", revealSections);
document.addEventListener("DOMContentLoaded", revealSections);
