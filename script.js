// Initialize AOS Animation Library
AOS.init({
  duration: 600,
  once: true,
  offset: 80,
  easing: 'ease-out-quad',
  disable: window.innerWidth < 768 ? 'phone' : false
});

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1500);
});

// Custom Cursor - Only on desktop
if (window.innerWidth > 768) {
  const cursor = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      cursorFollower.style.transform = `translate(${e.clientX - 22}px, ${e.clientY - 22}px)`;
    });

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
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
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
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
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
    const sectionTop = section.offsetTop - 150;
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
    bookingMsg.style.fontSize = '0.9rem';
    bookingMsg.style.fontWeight = '500';
    bookingMsg.style.textAlign = 'center';
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
    showToast('✨ Message sent! Our team will reply within 24 hours. ✨');
    contactForm.reset();
  });
}

// Toast notification function
function showToast(message) {
  const toast = document.createElement('div');
  toast.innerHTML = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#e6b422';
  toast.style.color = '#0a0806';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '50px';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.85rem';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  toast.style.whiteSpace = 'nowrap';
  toast.style.maxWidth = '90%';
  toast.style.whiteSpace = 'normal';
  toast.style.textAlign = 'center';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Add to Cart
const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const productCard = btn.closest('.product-card');
    const productName = productCard?.querySelector('h3')?.innerText || 'Item';
    showToast(`✨ ${productName} added to cart ✨`);
    
    // Button animation
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Added! <i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1500);
  });
});

// Gallery lightbox
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
      lightbox.style.padding = '20px';
      lightbox.innerHTML = `
        <div style="position: relative; max-width: 95%; max-height: 95%;">
          <img src="${imgSrc}" style="width: 100%; height: auto; max-height: 85vh; object-fit: contain; border-radius: 15px; border: 2px solid #e6b422;">
          <div style="position: absolute; top: -40px; right: -10px; color: #e6b422; font-size: 2rem; cursor: pointer; background: rgba(0,0,0,0.5); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">&times;</div>
        </div>
      `;
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('div')?.innerText === '×') {
          lightbox.remove();
        }
      });
      document.body.appendChild(lightbox);
    }
  });
});

// Instagram feed click
const instaPosts = document.querySelectorAll('.insta-post');
instaPosts.forEach(post => {
  post.addEventListener('click', () => {
    window.open('https://instagram.com/nafeehennarts', '_blank');
  });
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateNumbers = () => {
  if (animated) return;
  statNumbers.forEach(stat => {
    const targetText = stat.innerText;
    const target = parseInt(targetText);
    if (target && !isNaN(target)) {
      let current = 0;
      const increment = target / 40;
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          stat.innerText = Math.floor(current) + (targetText.includes('+') ? '+' : '');
          requestAnimationFrame(updateNumber);
        } else {
          stat.innerText = target + (targetText.includes('+') ? '+' : '');
        }
      };
      updateNumber();
    }
  });
  animated = true;
};

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsGrid);
}