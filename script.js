// Initialize AOS Animation Library
AOS.init({
  duration: 800,
  once: true,
  offset: 120,
  easing: 'ease-out-quad'
});

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1800);
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 22}px, ${e.clientY - 22}px)`;
  });

  // Hover effect on interactive elements
  const hoverElements = document.querySelectorAll('a, button, .product-card, .service-item, .gallery-item, .insta-post');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = `scale(1.8)`;
      cursorFollower.style.transform = `scale(1.4)`;
      cursorFollower.style.borderColor = 'rgba(230, 180, 34, 0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = `scale(1)`;
      cursorFollower.style.transform = `scale(1)`;
      cursorFollower.style.borderColor = 'rgba(230, 180, 34, 0.5)';
    });
  });
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
  
  // Parallax effect on hero image
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    const scrolled = window.pageYOffset;
    heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
  }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth scrolling + close mobile menu
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Active navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Booking form handler
const bookingForm = document.getElementById('bookingForm');
const bookingMsg = document.getElementById('bookingMsg');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingMsg.innerHTML = '✨ Thank you, beautiful bride! We will contact you within 24 hours. ✨';
    bookingMsg.style.color = '#e6b422';
    bookingMsg.style.marginTop = '20px';
    bookingMsg.style.fontSize = '1rem';
    bookingMsg.style.fontWeight = '500';
    bookingForm.reset();
    setTimeout(() => { 
      bookingMsg.innerHTML = ''; 
    }, 5000);
  });
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Create premium toast notification
    const toast = document.createElement('div');
    toast.innerHTML = '✨ Message sent! Our team will reply within 24 hours. ✨';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#e6b422';
    toast.style.color = '#0a0806';
    toast.style.padding = '15px 30px';
    toast.style.borderRadius = '50px';
    toast.style.fontWeight = '700';
    toast.style.fontSize = '0.95rem';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    toast.style.animation = 'slideInRight 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
    contactForm.reset();
  });
}

// Add to Cart with premium animation
const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const productCard = btn.closest('.product-card');
    const productName = productCard?.querySelector('h3')?.innerText || 'Item';
    const productPrice = productCard?.querySelector('.price')?.innerText || '';
    
    // Create floating cart animation
    const toast = document.createElement('div');
    toast.innerHTML = `<i class="fas fa-shopping-cart" style="margin-right: 10px;"></i> ${productName} added to cart ${productPrice ? `- ${productPrice}` : ''}`;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#1a1a1a';
    toast.style.color = '#e6b422';
    toast.style.border = '1px solid #e6b422';
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '50px';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.95rem';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.animation = 'slideInRight 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    
    // Button animation
    btn.innerHTML = 'Added! <i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = 'Add to Cart <i class="fas fa-shopping-cart"></i>';
    }, 1500);
  });
});

// Gallery image click (Lightbox)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img')?.src;
    if (imgSrc) {
      const lightbox = document.createElement('div');
      lightbox.style.position = 'fixed';
      lightbox.style.top = '0';
      lightbox.style.left = '0';
      lightbox.style.width = '100%';
      lightbox.style.height = '100%';
      lightbox.style.backgroundColor = 'rgba(0,0,0,0.95)';
      lightbox.style.zIndex = '10001';
      lightbox.style.display = 'flex';
      lightbox.style.justifyContent = 'center';
      lightbox.style.alignItems = 'center';
      lightbox.style.cursor = 'pointer';
      lightbox.style.backdropFilter = 'blur(5px)';
      lightbox.innerHTML = `
        <div style="position: relative;">
          <img src="${imgSrc}" style="max-width: 90vw; max-height: 85vh; border-radius: 25px; border: 3px solid #e6b422; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          <div style="position: absolute; top: -40px; right: -40px; color: #e6b422; font-size: 2rem; cursor: pointer; background: rgba(0,0,0,0.5); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">&times;</div>
        </div>
      `;
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('div')?.querySelector('div') === e.target) {
          lightbox.remove();
        }
      });
      document.body.appendChild(lightbox);
    }
  });
});

// Add animation keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .product-card:hover .add-to-cart {
    animation: pulse 0.5s ease;
  }
`;
document.head.appendChild(styleSheet);

// Smooth reveal for stats numbers (counter animation)
const statNumbers = document.querySelectorAll('.stat-number');
const animateNumbers = () => {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.innerText);
    if (target && !stat.hasAttribute('data-animated')) {
      let current = 0;
      const increment = target / 50;
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          stat.innerText = Math.floor(current) + (stat.innerText.includes('+') ? '+' : '');
          requestAnimationFrame(updateNumber);
        } else {
          stat.innerText = target + (stat.innerText.includes('+') ? '+' : '');
          stat.setAttribute('data-animated', 'true');
        }
      };
      updateNumber();
    }
  });
};

// Trigger counter when stats come into view
const observerOptions = { threshold: 0.5, rootMargin: '0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumbers();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) observer.observe(statsGrid);

// Instagram feed hover effect
const instaPosts = document.querySelectorAll('.insta-post');
instaPosts.forEach(post => {
  post.addEventListener('click', () => {
    window.open('https://instagram.com/nafeehennarts', '_blank');
  });
});

// WhatsApp button click tracking
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    console.log('WhatsApp chat initiated');
  });
}